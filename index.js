import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import mongoose from "mongoose";
import keys from "./config/keys";
import bodyParser from "body-parser";
import path from "path";

import User from "./models/User"

mongoose.connect(keys.mongoURI, err => {
    if (err){
        throw new Error(err)
    } else {
        console.log("DB CONNECTED!")
    }
});

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    User.findOne({googleId: profile.id})
        .then(user => {
            if(user){
                done(null, user)
            } else {
                const value = {
                    googleId: profile.id || "",
                    name: {
                        familyName: profile.name.familyName || "",
                        givenName: profile.name.givenName || ""
                    },
                    photo: profile.photos[0].value || "",
                }
                new User(value)
                    .save()
                    .then(user => {
                        done(null,user)
                })
        }
    })
}));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}))

app.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: "/login"}), 
    (req, res) => {
        res.redirect("/")
    }
)

app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
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

app.get("/api/draft/:id", (req, res) => {
    const stub = "<div><p>You Have Finally Done it!!!</p></div>"
    res.send(stub)
})

app.post("/api/draft", (req, res) => {
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