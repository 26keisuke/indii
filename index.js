import express from "express";
import passport from "passport";
// import cookieSession from "cookie-session";
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

const dbName = "indii";

mongoose.connect(keys.mongoURI, err => {
    if (err){
        console.err(err)
    } else {
        console.log("DB CONNECTED!")
    }
}).catch(err => {
    console.err(err)
})

const app = express();

// app.use(
//     cookieSession({
//         secret: "im a genius", // must be changed later
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys: [keys.cookieKey]
//     })
// );

app.use(session({
    secret: [keys.cookieKey],
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
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
    new Topic(req.body)
        .save()
        .then(topic => {
            res.send("Success: POST /api/topic")
        })
        .catch(err => {
            console.log(err)
            res.send("Fail: POST /api/topic")
        })
})

app.post("/api/topic/:topicId/post/:postId")

app.post("/api/topic/:topicId/post", isLoggedIn, (req, res) => {
    const data = Object.assign({user: req.user.id, type: "New", date: Date.now()}, req.body)
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

app.get("/api/draft", (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            Draft.find({_id: {$in: user.draft}}).limit(10)
            .then(draft => {
                res.send(draft)
            })
        })
        .catch(err => {
            console.log(err)
        })
})

app.get("/api/draft/:id", (req, res) => {
    const stub = '<p></p><div class=\"media-wrap image-wrap\"><img src=\"data:image/png;base64,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\"/></div><p>You Have Finally Done it!!!</p>'
    res.send(stub)
})

app.post("/api/draft/:id", (req, res) => {
    console.log(req.body)
    res.send("")
})

app.get("/api/search/:term", (req, res) => {
    console.log(`A TERM "${req.params.term}" HAS BEEN SEARCHED`)
    res.send("")
})

app.post("/api/post/delete", (req,res) => {
    console.log(`DELETING ${req.body.id}`)
    res.send("")
})

app.post("/api/feeback", (req, res) => {
    console.log("Feedback Received! \n",req.body)
    res.send("")
})

function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("NOT AUTHENTICATED")
    return res.redirect("/")
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