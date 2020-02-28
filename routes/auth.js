import express from "express"
import passport from "passport";

import User from "../models/User"

var router = express.Router();

router.post("/login", passport.authenticate("local", {failureRedirect: "/"}), 
    (req, res) => {
        if(req.body.remember) {
            req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000; 
        } else {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        }
        res.send(req.user)
    }
)

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
})

router.get("/current_user", (req, res) => {
    res.send(req.user)
})

router.get("/email/:id", (req, res) => {
    User.findOne({email: req.params.id})
        .then(result => {
            res.send(result === null)
        })
        .catch(err => {
            console.error(err)
        })
})

// 本来はここでもう一段階emailを入力してもらうステップを置いて、POSTで確認するのが理想（tokenIdを取得すれば誰でもできちゃうから）
router.get("/confirmation/:tokenId", (req, res) => {
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

router.post("/password/reset/:tokenId", (req, res) => {
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

router.post("/password/reset/email", (req, res) => {
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
                text: `${user.userName}さん\n\n` + "以下のリンクをクリックすると、パスワードの再設定を行うことができます。\n\n" + `http://indii.jp/password/reset/${token.token}` + "\n" 
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
router.get("/password/reset/:tokenId", (req, res) => {
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

router.post("/resend", (req, res) => {
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

export default router