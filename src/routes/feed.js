import express from "express"

import User from "../models/User"
import Topic from "../models/Topic"
import Post from "../models/Post"

import { isLoggedIn } from "./util/util"

const router = express.Router()

const postsPerReq = 10

router.get("/post/:pageId", (req, res) => {
    const page = parseInt(req.params.pageId) + 1
    Post
    .find({lastEdited: { $exists: true }}) // 概要のポストを省いている
    .sort({lastEdited: -1})
    .skip(postsPerReq * page - postsPerReq)
    .limit(postsPerReq)
    .populate("creator")
    .then(posts => {
        res.send(posts)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get("/user", (req, res) => {
    var match = [];

    if(req.user) match.push({_id: {$ne: req.user._id}})

    match = match.concat([
        {post: { $ne: [] }}
    ])

    const query = [
        {$match: {
            $and: match
        }},
        {$sample: {size: 10}}
    ]
    
    User.aggregate(query)
    .exec()
    .then(users => res.send(users))
    .catch(err => console.log(err))
})

router.get("/recommend", (req, res) => {
    Post.aggregate(
        [
            {$match: {"index": {$ne: [0]}}},
            {$sample: {size: 10}},
            {$lookup: {
                "from": "users",
                "localField": "creator",
                "foreignField": "_id",
                "as": "creator"
            }},
            {$lookup: {
                "from": "images",
                "localField": "postImg",
                "foreignField": "_id",
                "as": "postImg"
            }},
            {$lookup: {
                "from": "images",
                "localField": "topicSquareImg",
                "foreignField": "_id",
                "as": "topicSquareImg"
            }},
        ]
    )
    .exec()
    .then(posts => res.send(posts))
    .catch(err => console.log(err))
})

router.get("/new/topic", (req, res) => {
    Topic.find().sort({timeStamp: -1})
    .populate("squareImg")
    .populate("posts")
    .exec()
    .then(topic => {
        res.send(topic.reverse())
    })
    .catch(err => console.log(err))
})

router.post("/feedback", isLoggedIn, (req, res) => {
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

router.get("/search/:term", (req, res) => {
    const { term } = req.params
    Post.find({"postName": {$regex: term, $options: "i"}})
    .sort({"star.counter": -1})
    .populate("postImg")
    .populate("topicSquareImg")
    .then(posts => {
        Topic.find({"topicName": {$regex: term, $options: "i"}})
        .populate("squareImg")
        .populate("posts")
        .then(topics => {
            res.send({posts, topics})
        })
    })
    .catch(err => console.log(err))
})


export default router