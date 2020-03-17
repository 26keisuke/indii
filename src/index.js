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
import Token from "./models/Token";

import auth from "./routes/auth"
import draft from "./routes/draft"
import profile from "./routes/profile"
import topic from "./routes/topic"
import post from "./routes/post"
import feed from "./routes/feed"
import talk from "./routes/talk"

mongoose.connect(keys.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, err => {
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
    secret: [keys.COOKIE_KEY],
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

function isValidEmail(email) {
   if(/(.+)@(.+){2,}\.(.+){2,}/.test(email)){
       return true
   }
   return false
}


// 参考: https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password", 
    passReqToCallback : true,  
}, (req, email, password, done) => {
    User.findOne({email: email})
        .then(user => {

            if(user){

                if(user.facebookId || user.googleId) {
                    console.log("User is authenticated by external service.")
                    return done(null, false)
                }

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

                            user.activity.push({timeStamp: Date.now(), type: "LOG_IN"})
                            user.save()
                            .then(() => {
                                return done(null, user)
                            })
                            
                        }
                    })

            } else {

                // signUpとloginをここで分けている。果たしてこれが適切かは疑問
                if(!req.body.username) return done(null, false)

                if(!isValidEmail(email)) return done(null, false)
                
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
                                            return done(null, user)
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

                user.activity.push({timeStamp: Date.now(), type: "LOG_IN"})
                user.save()
                .then(() => {
                    return done(null, user)
                })

            } else {

                const { id, displayName, familyName, givenName, emails, photos } = profile

                User.findOne({email: emails[0].value})
                .then(user => {
                    if(user){
                        return done(null, false);
                    }

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
                        verifiedDate: Date.now(),
                    }
    
                    new User(value)
                        .save()
                        .then(user => {
                            return done(null,user)
                        })
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

                user.activity.push({timeStamp: Date.now(), type: "LOG_IN"})
                user.save()
                .then(() => {
                    return done(null, user)
                })

            } else {

                const {id, displayName, name, emails, photos} = profile

                User.findOne({email: emails[0].value})
                .then(user => {
                    if(user){
                        return done(null, false);
                    }

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
                        verifiedDate: Date.now(),
                    }
                    new User(value)
                        .save()
                        .then(user => {
                            return done(null,user)
                        })
                })
            }
        })
        .catch(err => {
            done(err)
        })
    }
));

app.use("/api", auth)
app.use("/api/feed", feed)
app.use("/api/draft", draft)
app.use("/api/profile", profile)
app.use("/api/topic", topic)
app.use("/api/post", post)
app.use("/api/talk", talk)

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

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
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