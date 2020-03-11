import express from "express"
// import mongoose from "mongoose";
// import equal from "deep-equal"

// import User from "../models/User"
// import Topic from "../models/Topic"
import Post from "../models/Post"
// import Draft from "../models/Draft"
// import Image from "../models/Image"

const router = express.Router()

router.get("/", (req, res) => {
    // Post.find({contribution: { $exists: true, $ne: [] }}).sort({contribution: 1}).limit(10)
    Post.find({lastEdited: { $exists: true }}).sort({lastEdited: -1}).limit(10)
    .populate("creator")
    .then(posts => {
        res.send(posts)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get("/search/:term", (req, res) => {
    console.log(`A TERM "${req.params.term}" HAS BEEN SEARCHED`)
    res.send("")
})


router.post("/feedback", (req, res) => {
    Post.findById(req.body.id)
    .then(post => {

        var translated = [];
        var feedback = req.body.problems

        if(feedback.problem1){
            translated.push("HARD_TO_UNDERSTAND")
        } 
        if(feedback.problem2){
            translated.push("UNAPPROPRIATE")
        } 
        if(feedback.problem3){
            translated.push("WRONG_CONTENT")
        }
        if(feedback.problem4){
            translated.push("WRONG_TITLE")
        } 
        if(feedback.problem5){
            translated.push("DUPLICATE")
        }

        post.feedback.push({timeStamp: Date.now(), user: req.user.id, type: translated})
        post.save()
        .then(res.send("Success"))
    })
    .catch(err => {
        console.log(err)
    })
})


export default router