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
import nodemailer from "nodemailer"

import User from "./models/User"
import Topic from "./models/Topic"
import Post from "./models/Post"
import Draft from "./models/Draft"
import Token from "./models/Token";

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

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

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

                            console.log("YES")
                            return done(null, user)
                        }
                    })

            } else {

                // signUpとloginをここで分けている。果たしてこれが適切かは疑問
                if(!req.body.username || !req.body.familyName || !req.body.givenName) {
                    return done(null, false)
                }
                
                bcrypt.genSalt(10)
                    .then(salt => {
                        bcrypt.hash(password, salt)
                        .then(hash => {
                            const hashedPassword = hash

                            const value = {
                                userName: req.body.username,
                                name: {
                                    familyName: req.body.familyName,
                                    givenName: req.body.givenName
                                },
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
                                        var transporter = nodemailer.createTransport()
                                        var mailOptions = {
                                            from: 'no-reply@yourwebapplication.com',
                                            to: user.email,
                                            subject: 'Account Verification Token',
                                            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' 
                                        }

                                        transporter.sendMail(mailOptions)
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

app.post("/api/star_on", (req, res) => {
    res.send("")
})

app.post("/api/star_off", (req, res) => {
    res.send("")
})

app.get("/api/friend/:name", (req, res) => {
    console.log(req.params)
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

app.post("/api/confirmation", (req, res) => {
    Token.findOne({token: req.body.token})
    .then(token => {
        User.findOne({_id: token._userId, email: req.body.email})
        .then(user => {
            if(!user) { console.log("User not found"); return; }
            if(user.isVerified) { console.log("User is already verified"); return; }
            user.isVerified = true;
            user.save()
            .then(user => {
                console.log("User is now verified")
                res.send(user)
            })
        })
    })
})

app.post("/api/resend", (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) { console.log("User not found"); return; }
        if(user.isVerified) { console.log("User is already verified"); return; }

        var token = new Token({
            _userId: user._id,
             token: crypto.randomBytes(16).toString("hex")
        })

        token.save()
        .then(token => {
            var transporter = nodemailer.createTransport()
            var mailOptions = {
                from: 'no-reply@yourwebapplication.com',
                to: user.email,
                subject: 'Account Verification Token',
                text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' 
            }

            transporter.sendMail(mailOptions)

            console.log("A verfication mail has been resent")

            return;
        })
    })
})

app.post("/api/topic", isLoggedIn, (req, res) => {

    const columnId = mongoose.Types.ObjectId();
    const topicId = mongoose.Types.ObjectId();

    var post = new Post({
        topic: topicId, 
        topicName: req.body.topicName, 
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
            var topic = new Topic(Object.assign({_id: topicId}, req.body))
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

// app.post("/api/topic/:topicId/post/:postId")

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

app.get("/api/topic/search/:type/:term", (req, res) => {
    const type = req.params.type
    const value = type === "Match" ? '^' + req.params.term : '^' + req.params.term + '$' 
    Topic.find({"topicName": {$regex: value, $options: 'i'}}) 
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
    Post.find({"postName": {$regex: value, $options: 'i'}}) 
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

function searchByCategoryAndType(req, model, variableName) {
    const type = req.params.type
    const value = type === "Match" ? '^' + req.params.term : '^' + req.params.term + '$' 
    model.find({[variableName]: {$regex: value, $options: 'i'}}) 
        .exec()
        .then(elem => {
            if(elem.length === 0){
                const result = type === "Match" ? [] : [{added: true}]
                res.send(result)
            } else {
                res.send(elem)
            }
        })
        .catch(err => {
            console.log(err)
            res.send([])
        })
}

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

function isOwner(req,res,next) {

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