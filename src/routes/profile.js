import express from "express"

import User from "../models/User"

const router = express.Router()

router.get("/:userId", (req, res) => {
    User.findById(req.params.userId)
    .populate({path: "post", populate: [{path: "postImg"},{path: "topicSquareImg"}]})
    .populate("followers.user")
    .populate("follows.user")
    .populate({path: "likedPost.post", populate: [{path: "postImg"}, {path: "topicSquareImg"}]})
    .populate({path: "likedTopic.topic", populate: [{path: "squareImg"}, {path: "posts", options: {limit: 1}}]})
    .exec()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/:userId", (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(user.intro !== req.body.intro){
            user.intro = req.body.intro
        }
        if(user.userName !== req.body.userName){
            user.userName = req.body.userName
        }
        if(user.comment !== req.body.comment){
            user.comment = req.body.comment
        }
        user.save()
        res.send("Success")
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/:userId/photo", (req, res) => {
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

// router.post("/:userId/name", (req, res) => {
//     User.findById(req.params.userId)
//     .then(user => {
//         user.userName= req.body.userName
//         user.save()
//         res.send("Success")
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

// router.post("/:userId/comment", (req, res) => {
//     User.findById(req.params.userId)
//     .then(user => {
//         user.comment = req.body.comment
//         user.save()
//         res.send("Success")
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

// router.post("/:userId/intro", (req, res) => {
//     User.findById(req.params.userId)
//     .then(user => {
//         user.intro= req.body.intro
//         user.save()
//         res.send("Success")
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

router.post("/:userId/follow", (req, res) => {

    const now = Date.now()

    // 対象者
    User.findById(req.params.userId)
    .then(target => {
        if(req.body.follow) {

            const res = target.followers.filter(user => String(user.user) === String(req.user.id))

            if(!res[0]){
                target.followers.push({ timeStamp: now, user: req.user.id})
                // 対象者に通知を送る
                target.notif.push({timeStamp: now, type: "FOLLOWED", user: req.user.id})
            }
            
        } else {
            target.followers.map((user, index) => {
                if(String(user.user) === String(req.user.id)) {
                    target.followers.splice(index, 1)
                }
            })
            // 対象者の通知から削除
            target.notif.map((user, index) => {
                if(String(user.user) === String(req.user.id)) {
                    target.notif.splice(index, 1)
                }
            })
        }

        // 自分
        User.findById(req.user.id)
        .then(subject => {
            if(req.body.follow) {

                const res = subject.follows.filter(user => String(user.user) === String(target._id))

                if(!res[0]){
                    subject.follows.push({ timeStamp: now, user: target.id })
                }

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

export default router