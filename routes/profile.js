import express from "express"

import User from "../models/User"

const router = express.Router()

router.get("/:userId", (req, res) => {
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

router.post("/:userId/name", (req, res) => {
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

router.post("/:userId/comment", (req, res) => {
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

router.post("/:userId/intro", (req, res) => {
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

router.post("/:userId/follow", (req, res) => {
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

export default router