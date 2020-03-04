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

    User.findById(req.user.id)
    .then(user => {
        user.activity.push({timeStamp: Date.now(), type: "LOG_OUT"})
        user.save()
        .then(() => {
            req.logout();
            res.redirect("/")
        })
    })
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
            user.verifiedDate = Date.now();
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

// もしcurrent_userでもfollowersをpopulateしても平気そうならば、そっちの方がいいと思う。
router.get("/friend/:name", (req, res) => {
    User.findById(req.user.id).populate("followers.user")
    .then(user => {
        var result = []
        const regEx = RegExp('^' + req.params.name, 'i')

        if(user.followers.length === 0){ res.send([]); return; }
    
        for(var i=0; i < user.followers.length; i++){
            if(regEx.exec(user.followers[i].user.userName)){
                result.push(user.followers[i].user)
            }
        }
        res.send(result)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get("/notif", (req, res) => {
    User.findById(req.user.id).sort({timeStamp: 1}).populate("notif.user")
    .then(user => {
        res.send(user.notif)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get("/notif/:notifId", (req, res) => {
    User.findById(req.user.id).populate("notif.user").populate("notif.post").populate({path: "notif.draft", populate: {path: "editLastEditedAuthor"}})
    .then(user => {
        for(var i=0; i < user.notif.length; i++){
            if(String(user.notif[i]._id) === String(req.params.notifId)){
                res.send(user.notif[i])
                return
            }
        }
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/notif/:notifId", (req, res) => {
    User.findById(req.user.id).populate("notif.user")
    .then(user => {
        for(var i=0; i < user.notif.length; i++){
            if(String(user.notif[i]._id) === String(req.params.notifId)){
                user.notif[i].checked = true
                return
            }
        }
        user.save()
        res.send("Done")
    })
    .catch(err => {
        console.log(err)
    })
})

export default router