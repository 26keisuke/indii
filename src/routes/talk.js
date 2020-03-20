import express from "express"

import { isLoggedIn } from "./util/util"

import Talk from "../models/Talk"
import User from "../models/User"

const router = express.Router()

router.get("/", (req, res) => {
    Talk.find({isDeleted: {$ne: true}}).sort({timeStamp: -1}).limit(10)
    .populate("creator")
    .populate("comments.user")
    .populate({path: "post", populate: [{path: "postImg"}, {path: "topicSquareImg"}]})
    .populate({path: "topic", populate: [{path: "squareImg"}, {path: "posts", options: {limit: 1}}]})
    .then(talk => {
        res.send(talk)
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/", isLoggedIn, (req, res) => {

    var data;
    const now = Date.now()

    const {id, type, title, content} = req.body

    if(type === "post"){
        data = { post: id, refType: "POST" }
    } else if(type === "topic"){
        data = { topic: id, refType: "TOPIC" }
    }

    const combinedData = {...data, timeStamp: now, title, description: content, creator: req.user.id}

    new Talk(combinedData).save()
    .then(talk => {
        User.findById(req.user.id)
        .then(user => {
            user.createTalk.push({ timeStamp: now, talk: talk })
            user.save()

            talk.populate("creator")
                .populate("comments.user")
                .populate({path: "post", populate: [{path: "postImg"}, {path: "topicSquareImg"}]})
                .populate({path: "topic", populate: [{path: "squareImg"}, {path: "posts"}]})
                .execPopulate()
                .then(talk => {
                    res.send(talk)
                })
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/:talkId", (req, res) => {

    const now = Date.now()

    Talk.findById(req.params.talkId)
    .then(talk => {
        talk.comments.push({ timeStamp: now, user: req.user.id, content: req.body.value })
        talk.msgCounter++;

        User.findById(req.user.id)
        .then(user => {
            user.createComment.push({ timeStamp: now, talk: talk._id, content: req.body.value })

            user.save()
            talk.save()
            .then(talk => {
                
                talk.populate("creator")
                    .populate("comments.user")
                    .populate({path: "post", populate: [{path: "postImg"}, {path: "topicSquareImg"}]})
                    .populate({path: "topic", populate: [{path: "squareImg"}, {path: "posts"}]})
                    .execPopulate()
                    .then(talk => {
                        res.send(talk)
                    })
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/:talkId/delete", (req, res) => {
    Talk.findById(req.params.talkId)
    .then(talk => {
        talk.isDeleted = true
        talk.save()
        res.send("Success")
    })
})

router.post("/:talkId/edit", (req, res) => {
    Talk.findById(req.params.talkId)
    .then(talk => {
        talk.description = req.body.value
        talk.save()
        res.send("Success")
    })
})

export default router