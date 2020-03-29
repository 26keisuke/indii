import express from "express"
import passport from "passport";

import User from "../models/User"

var router = express.Router();

// 参考: http://www.passportjs.org/docs/authenticate/

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) {
            res.send("ERROR"); 
            return
        }
        if(user) {
            req.logIn(user, (err) => {
                if(err) return next(err)

                if(req.body.remember) {
                    req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000; 
                } else {
                    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
                }
    
                res.send(user); 
                return
            })
        }
        if(req.pendingUser){
            res.send(req.pendingUser)
        } else {
            res.send("ERROR")
        }
    })(req, res, next)
})

router.get("/logout", (req, res) => {
    User.findById(req.user.id)
    .then(user => {
        user.activity.push({timeStamp: Date.now(), type: "LOG_OUT"})
        user.save()
        .then(() => {
            req.logout();
            res.redirect("/")
        })
    })
    .catch(err => console.log(err))
})


router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}))

router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/"}), 
    (req, res) => {
        res.redirect("/")
    }
)

router.get("/facebook", passport.authenticate("facebook"))

router.get("/facebook/callback", passport.authenticate("facebook", {failureRedirect: "/"}),
    (req, res) => {
        res.redirect("/")
    }
)

export default router