import express from "express";
import passport from "passport";
import session from "express-session"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as FacebookStrategy } from "passport-facebook"
import { Strategy as LocalStrategy } from "passport-local"
import mongoose from "mongoose";
import keys from "./config/keys";
import bodyParser from "body-parser";
import path from "path";
import bcrypt from "bcrypt";
import crypto from "crypto"
import sgMail from "@sendgrid/mail"

import User from "./models/User"
import Topic from "./models/Topic"
import Post from "./models/Post"
import Draft from "./models/Draft"
import Token from "./models/Token";
import Image from "./models/Image"

import draft from "./routes/draft"

mongoose.connect(keys.mongoURI, err => {
    if (err){
        console.error(err)
    } else {
        console.log("DB CONNECTED!")
    }
}).catch(err => {
    console.error(err)
})

const app = express();

app.use(session({
    secret: [keys.cookieKey],
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({limit: '50mb', extended: true})) //これは将来的に危険。もしユーザーがめっちゃ写真を載せたらおしまい
app.use(bodyParser.json({limit: '50mb'}))

sgMail.setApiKey(keys.SENDGRID_API_KEY)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

// 参考: https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password", 
    passReqToCallback : true,  
}, (req, email, password, done) => {
    User.findOne({email: email})
        .then(user => {
            if(user){

                bcrypt.compare(password, user.password)
                    .then(res => {
                        if(res === false) {
                            console.log("Password did not match.")
                            return done(null, false)
                        } else {
                            if(!user.isVerified) {
                                console.log("User is not verified yet")
                                return done(null, false)
                            }
                            return done(null, user)
                        }
                    })

            } else {

                // signUpとloginをここで分けている。果たしてこれが適切かは疑問
                if(!req.body.username) {
                    return done(null, false)
                }
                
                bcrypt.genSalt(10)
                    .then(salt => {
                        bcrypt.hash(password, salt)
                        .then(hash => {
                            const hashedPassword = hash

                            const value = {
                                userName: req.body.username,
                                email: email,
                                password: hashedPassword,
                            }

                            new User(value).save()
                                .then(user => {
                                    var token = new Token({
                                        _userId: user._id,
                                         token: crypto.randomBytes(16).toString("hex")
                                    })

                                    token.save()
                                    .then(() => {

                                        var msg = {
                                            from: 'info@indii.jp',
                                            to: user.email,
                                            subject: '【Indii】Indiiにようこそ！',
                                            text: `${req.body.username}さん、Indiiへようこそ！\n\n` + "以下のリンクをクリックして、ご登録いただいたメールアドレスを認証してください。\n\n" + `http://indii.jp/api/confirmation/${token.token}` + "\n" 
                                        }

                                        sgMail.send(msg)
                                        .then(() => {
                                            console.log("Email has been sent")
                                            done(null, user)
                                        })                                        
                                    })
                                })            
                        })
                    })
            }
        })
        .catch(err => {
            return done(err)
        })  
}))

// facebookの場合は正式名がない
passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK_CLIENT_ID,
    clientSecret: keys.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    proxy: true,
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id})
        .then(user => {
            if(user){
                done(null, user)
            } else {

                const { id, displayName, familyName, givenName, emails, photos } = profile

                const value = {
                    facebookId: id,
                    userName: displayName,
                    name: {
                        familyName: familyName,
                        givenName: givenName
                    },
                    email: emails[0].value,
                    photo: photos[0].value,
                    isVerified: true,
                }

                new User(value)
                    .save()
                    .then(user => {
                        done(null,user)
                    })
            }
        })
        .catch(err => {
            return done(err)
        })  
    }
))

// googleの場合はusernameがない
passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id})
        .then(user => {
            if(user){
                done(null, user)
            } else {

                const {id, displayName, name, emails, photos} = profile

                const value = {
                    googleId: id || "",
                    userName: displayName,
                    name: {
                        familyName: name.familyName || "",
                        givenName: name.givenName || ""
                    },
                    email: emails[0].value,
                    photo: photos[0].value || "",
                    isVerified: true,
                }
                new User(value)
                    .save()
                    .then(user => {
                        done(null,user)
                    })
            }
        })
        .catch(err => {
            done(err)
        })
    }
));

app.use("/api", draft)

app.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}))
app.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: "/"}), 
    (req, res) => {
        res.redirect("/")
    }
)

app.get("/auth/facebook", passport.authenticate("facebook"))
app.get("/auth/facebook/callback", passport.authenticate("facebook", {failureRedirect: "/"}),
    (req, res) => {
        res.redirect("/")
    }
)

app.post("/api/login", passport.authenticate("local", {failureRedirect: "/"}), 
    (req, res) => {
        if(req.body.remember) {
            req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000; 
        } else {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        }
        res.send(req.user)
    }
)

app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/")
})

app.get("/api/current_user", (req, res) => {
    res.send(req.user)
})

app.get("/api/email/:id", (req, res) => {
    User.findOne({email: req.params.id})
        .then(result => {
            res.send(result === null)
        })
        .catch(err => {
            console.error(err)
        })
})

// 本来はここでもう一段階emailを入力してもらうステップを置いて、POSTで確認するのが理想（tokenIdを取得すれば誰でもできちゃうから）
app.get("/api/confirmation/:tokenId", (req, res) => {
    Token.findOne({token: req.params.tokenId})
    .then(token => {
        User.findById({_id: token._userId}) 
        .then(user => {
            if(!user) { console.log("User not found"); return; }
            if(user.isVerified) { console.log("User is already verified"); return; }
            user.isVerified = true;
            user.save()
            .then(user => {
                console.log("User is now verified")
                res.redirect("/")
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect("/")
    })
})

app.post("/api/password/reset/:tokenId", (req, res) => {
    const { newPassword, confirmPassword } = req.body

    if (newPassword !== confirmPassword) { console.log("Password did not match"); return }

    Token.findOne({token: req.params.tokenId})
    .then(token => {
        User.findById({_id: token._userId}) 
        .then(user => {
            if(!user) { console.log("User not found"); return; }

            bcrypt.genSalt(10)
            .then(salt => {
                bcrypt.hash(newPassword, salt)
                .then(hash => {
                    user.password = hash
                    user.save()
                    .then(user => {
                        console.log("A password has been set")
                        res.send("SUCCESS")
                    })
                })
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.send("FAIL")
    })
})

app.post("/api/password/reset/email", (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) { 
            console.log("User not found");
            res.send("FAIL")
            return; 
        }

        var token = new Token({
            _userId: user._id,
            token: crypto.randomBytes(16).toString("hex")
        })

        token.save()
        .then(token => {
            
            var msg = {
                from: 'info@indii.jp',
                to: user.email,
                subject: '【Indii】 パスワードの再設定',
                text: `${user.userName}さん\n\n` + "以下のリンクをクリックすると、パスワードの再設定を行うことができます。\n\n" + `http://indii.jp/api/password/reset/${token.token}` + "\n" 
            }

            sgMail.send(msg)
            .then(() => {
                console.log("A password reset mail has been sent")
                res.send("SUCCESS")
            })  

            return;
        })


    })
})

// ログインしなくてもパスワードが再設定できるが大丈夫なのか？
app.get("/api/password/reset/:tokenId", (req, res) => {
    Token.findOne({token: req.params.tokenId})
    .then(token => {
        User.findById({_id: token._userId}) 
        .then(user => {
            if(!user) { 
                console.log("User not found"); 
                return; 
            }
            res.redirect(`/verification/password/${req.params.tokenId}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect("/")
    })
})



app.post("/api/resend", (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) { 
            console.log("User not found");
            res.send("FAIL")
            return; 
        }
        if(user.isVerified) { 
            console.log("User is already verified");
            res.send("ALREADY")
            return; 
        }

        var token = new Token({
            _userId: user._id,
             token: crypto.randomBytes(16).toString("hex")
        })

        token.save()
        .then(token => {
            
            var msg = {
                from: 'info@indii.jp',
                to: user.email,
                subject: '【Indii】 確認メールの再送',
                text: `${req.body.username}さん\n\n` + "以下のリンクをクリックして、ご登録いただいたメールアドレスを認証してください。\n\n" + `http://indii.jp/api/confirmation/${token.token}` + "\n" 
            }

            sgMail.send(msg)
            .then(() => {
                console.log("A verfication mail has been resent")
                res.send("SUCCESS")
            })  

            return;
        })
    })
})

app.get("/api/feed", (req, res) => {
    // Post.find({contribution: { $exists: true, $ne: [] }}).sort({contribution: 1}).limit(10)
    Post.find({lastEdited: { $exists: true }}).sort({lastEdited: -1}).limit(10)
    .populate("creator")
    .then(posts => {
        res.send(posts)
    })
    .catch(err => {
        console.log(err)
    })
})

app.get("/api/profile/:userId", (req, res) => {
    User.findById(req.params.userId)
    .populate("post")
    .populate("followers.user")
    .populate("follows.user")
    .populate({path: "likedPost.post", populate: {path: "postImg"}})
    .populate({path: "likedTopic.topic", populate: {path: "squareImg"}})
    .exec()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        console.log(err)
    })
})

app.post("/api/profile/:userId/photo", (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        user.photo = req.body.photo
        user.save()
        res.send("Success")
    })
    .catch(err => {
        console.log(err)
    })
})

app.post("/api/profile/:userId/name", (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        user.userName= req.body.userName
        user.save()
        res.send("Success")
    })
    .catch(err => {
        console.log(err)
    })
})

app.post("/api/profile/:userId/comment", (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        user.comment = req.body.comment
        user.save()
        res.send("Success")
    })
    .catch(err => {
        console.log(err)
    })
})

app.post("/api/profile/:userId/intro", (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        user.intro= req.body.intro
        user.save()
        res.send("Success")
    })
    .catch(err => {
        console.log(err)
    })
})

app.post("/api/profile/:userId/follow", (req, res) => {
    User.findById(req.params.userId)
    .then(target => {
        if(req.body.follow) {
            target.followers.push({ timeStamp: Date.now(), user: req.user.id})
        } else {
            target.followers.map((user, index) => {
                if(String(user.user) === String(req.user.id)) {
                    target.followers.splice(index, 1)
                }
            })
        }
        User.findById(req.user.id)
        .then(subject => {
            if(req.body.follow) {
                subject.follows.push({ timeStamp: Date.now(), user: target.id })
            } else {
                subject.follows.map((user, index) => {
                    if(String(user.user) === String(target.id)) {
                        subject.follows.splice(index, 1)
                    }
                })
            }
            target.save()
            subject.save()
            res.send("Success")
        })
    })
    .catch(err => {
        console.log(err)
    })
})

app.post("/api/topic", isLoggedIn, (req, res) => {

    const columnId = mongoose.Types.ObjectId();
    const topicId = mongoose.Types.ObjectId();
    const topicRectangleImgId = mongoose.Types.ObjectId();
    const topicSquareImgId = mongoose.Types.ObjectId();
    const topicMobileImgId = mongoose.Types.ObjectId();

    const ls = [
        {_id: topicRectangleImgId, image: req.body.rectangleImg},
        {_id: topicSquareImgId, image: req.body.squareImg},
        {_id: topicMobileImgId, image: req.body.MobileImg},
    ]

    Image.insertMany(ls)

    const newBody = Object.assign(
        {},
        req.body,
        {squareImg: topicSquareImgId,
        rectangleImg: topicRectangleImgId,
        mobileImg: topicMobileImgId}
    )

    var post = new Post({
        topic: topicId, 
        topicName: req.body.topicName, 
        topicRectangleImg: topicRectangleImgId,
        topicSquareImg: topicSquareImgId,
        topicMobileImg: topicMobileImgId,
        index: [0], 
        postName: "概要",
    })

    post.save()
        .then((post) => {
            const desc = {
                _id: columnId,
                index: 0, // Column別にrenderする時に役に立つ
                title: "概要",
                posts: [post.id]
            }
            var topic = new Topic(Object.assign({_id: topicId}, newBody))
            topic.column.push(desc)
            topic.order.push(columnId)
            topic.posts.push(post.id)
            topic.postCount++
            topic.save()
                .then((topic) => {
                    res.send("Success: POST /api/topic")
                })
                .catch(err => { console.log(err); res.send("Fail: POST /api/topic") })
        })
})

app.get("/api/topic/:topicId", (req, res) => {
    Topic.findById(req.params.topicId).populate("column.posts").exec()
        .then(topic => {
            res.send(topic)
        })
        .catch(err => {
            console.log(err)
        })
})

app.post("/api/topic/:topicId/post", isLoggedIn, (req, res) => {
    const data = Object.assign({user: req.user.id, type: "New", creationDate: Date.now()}, req.body)
    new Draft(data)
    .save()
    .then(draft => {
        User.findById(req.user.id)
            .then(user => {
                user.draft.push(draft)
                user.save()
                .then(res.send("Success: POST /api/topic/:topicId/post"))
            })
    })
    .catch(err => {
        console.log(err)
        res.send("Fail: POST /api/topic/:topicId/post")
    })
})

app.get("/api/post/:postId", (req, res) => {
    Post.findById(req.params.postId).populate({path: "topic", populate:{ path: "rectangleImg"}}).populate("creator").exec()
    .then(post => {
        res.send(post)
    })
    .catch(err => {
        console.log(err)
    })
})

app.post("/api/post/:postId/star", isLoggedIn, (req, res) => {
    Post.findById(req.params.postId)
    .then(post => {

        if(!req.body.like){
            post.star.action.map((elem, index) => {
                if(String(elem.user) === String(req.user.id)) {
                    post.star.action.splice(index, 1)
                    post.star.counter--
                }
            })
        } else {
            const res = post.star.action.map(elem => {
                if(String(elem.user) === String(req.user.id)) {
                    return true
                }
            })
            if(!res[0]){
                post.star.counter++
                post.star.action.push({timeStamp: Date.now(), user: req.user.id})
            }
        }

        User.findById(req.user.id)
        .then(user => {
            if(!req.body.like){
                user.likedPost.map((elem,index) => {
                    if(String(elem.post) === String(post.id)) {
                        user.likedPost.splice(index, 1)
                    }
                })
            } else {
                const res = user.likedPost.map(elem => {
                    if(String(elem.post) === String(post.id)) {
                        return true
                    }
                })
                if(!res[0]){
                    user.likedPost.push({timeStamp: Date.now(), post: post.id})
                }
            }
            post.save()
            user.save()

            res.send("DONE")
        })
    })
    .catch(err => {
        console.log(err)
    })
})

app.post("/api/post/:postId/emoji", isLoggedIn, (req, res) => {
    Post.findById(req.params.postId)
    .then(post => {

        if(!req.body.emoji){
            post.rating.map((elem, index) => {
                if(String(elem.user) === String(req.user.id)) {
                    post.rating.splice(index, 1)
                }
            })
        } else {
            const res = post.rating.map(elem => {
                if(String(elem.user) === String(req.user.id)) {
                    elem.rate = req.body.emoji
                    elem.timeStamp = Date.now()
                    return true
                }
            })
            if(!res[0]){ 
                post.rating.push({timeStamp: Date.now(), user: req.user.id, rate: req.body.emoji})
            }
        }

        User.findById(req.user.id)
        .then(user => {
            if(!req.body.emoji){
                user.postRating.map((elem,index) => {
                    if(String(elem.post) === String(post.id)) {
                        user.postRating.splice(index, 1)
                    }
                })
            } else {
                const res = user.postRating.map(elem => {
                    if(String(elem.post) === String(post.id)) {
                        elem.rate = req.body.emoji
                        elem.timeStamp = Date.now()
                        return true
                    }
                })
                if(!res[0]){
                    user.postRating.push({timeStamp: Date.now(), post: post.id, rate: req.body.emoji})
                }
            }
            post.save()
            user.save()

            res.send("DONE")
        })
    })
    .catch(err => {
        console.log(err)
    })
})

app.get("/api/topic/search/:type/:term", (req, res) => {
    const type = req.params.type
    const value = type === "Match" ? '^' + req.params.term : '^' + req.params.term + '$' 
    Topic.find({"topicName": {$regex: value, $options: 'i'}}).populate("squareImg")
        .exec()
        .then(topic => {
            if(topic.length === 0){
                const result = type === "Match" ? [] : [{added: true}]
                res.send(result)
            } else {
                res.send(topic)
            }
        })
        .catch(err => {
            console.log(err)
            res.send([])
        })
})

app.get("/api/post/search/:type/:term", (req, res) => {
    const type = req.params.type
    const value = type === "Match" ? '^' + req.params.term : '^' + req.params.term + '$' 
    Post.find({"postName": {$regex: value, $options: 'i'}}).populate("postImg").populate("topicSquareImg")
        .exec()
        .then(post => {
            if(post.length === 0){
                const result = type === "Match" ? [] : [{added: true}]
                res.send(result)
            } else {
                res.send(post)
            }
        })
        .catch(err => {
            console.log(err)
            res.send([])
        })
})

// function searchByCategoryAndType(req, res, model, variableName) {
//     const type = req.params.type
//     const value = type === "Match" ? '^' + req.params.term : '^' + req.params.term + '$' 
//     model.find({[variableName]: {$regex: value, $options: 'i'}}) 
//         .exec()
//         .then(elem => {
//             if(elem.length === 0){
//                 const result = type === "Match" ? [] : [{added: true}]
//                 res.send(result)
//             } else {
//                 res.send(elem)
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             res.send([])
//         })
// }

app.get("/api/search/:term", (req, res) => {
    console.log(`A TERM "${req.params.term}" HAS BEEN SEARCHED`)
    res.send("")
})

app.post("/api/post/delete", (req,res) => {
    console.log(`DELETING ${req.body.id}`)
    res.send("")
})

app.post("/api/feedback", (req, res) => {
    console.log("Feedback Received! \n",req.body)
    res.send("")
})

function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("NOT AUTHENTICATED")
    return res.send("NO_AUTH")
}

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, err => {
    if (err) {
        throw new Error(err)
    } else {
        console.log(`LISTENING ON PORT ${PORT}`)
    }
});