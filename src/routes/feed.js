import express from "express"

import User from "../models/User"
import Topic from "../models/Topic"
import Post from "../models/Post"

// import { performance } from "perf_hooks"
import { isLoggedIn } from "./util/util"

const router = express.Router()

const postsPerReq = 3

router.get("/post/:pageId", (req, res) => {
    // var t0 = performance.now()
    const page = parseInt(req.params.pageId)

    Post.aggregate([
        {$match: {lastEdited: { $exists: true }}},
        {$sort: {lastEdited: -1}},
        {$skip: postsPerReq * page},
        {$limit: postsPerReq},
        {$project: {
            _id: 1,
            creator: 1,
            lastEdited: 1,
            topic: 1,
            topicName: 1,
            postName: 1,
            content: 1, // こいつを足すことで2秒~5秒ほどのロス
            rating: 1,
        }},
        {$lookup: { // こいつを足すことで2秒ほどのロス
            "from": "users",
            "localField": "creator",
            "foreignField": "_id",
            "as": "creator",
        }},
        {$project: {
            _id: 1,
            lastEdited: 1,
            topic: 1,
            topicName: 1,
            postName: 1,
            content: 1,
            rating: 1,
            "creator._id": 1,
            "creator.photo": 1,
            "creator.userName": 1,
        }}
    ])
    .exec()
    .then(posts => {
        // console.log(performance.now() - t0)
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

router.get("/category", (req, res) => {
    Topic.aggregate([
        {$match: {$and: [{category: {$exists: true}}, {category: {$ne: []}}]}},
        {$limit: 10},
        {$project: {
            _id: 1,
            squareImg: 1,
            tags: 1,
            topicName: 1,
            posts: { $arrayElemAt: [ "$posts", 0 ] },
            likes: 1,
            category: 1,
        }},
        {$lookup: {
            "from": "images",
            "localField": "squareImg",
            "foreignField": "_id",
            "as": "squareImg"
        }},
        {$lookup: {
            "from": "posts",
            "localField": "posts",
            "foreignField": "_id",
            "as": "posts"
        }},
        {$group: {
            _id: "$category", 
            topics: {
                $push: {
                    _id: "$_id",
                    squareImg: "$squareImg",
                    tags: "$tags",
                    topicName: "$topicName",
                    posts: "$posts",
                    likes: "$likes",
                    category: "$category"
                }
            }
        }}
    ])
    .exec()
    .then(topic => {
        res.send(topic)
    })
    .catch(err => console.log(err))
})

const topicsPerReq = 6

router.get("/topic/:pageId", (req, res) => {
    // var t0 = performance.now()
    Topic.aggregate([
        {$sort: {creationDate: -1}},
        {$skip: topicsPerReq * req.params.pageId},
        {$limit: topicsPerReq},
        {$project: {
            _id: 1,
            squareImg: 1,
            tags: 1,
            topicName: 1,
            posts: { $arrayElemAt: [ "$posts", 0 ] },
            likes: 1,
        }},
        {$lookup: {
            "from": "images",
            "localField": "squareImg",
            "foreignField": "_id",
            "as": "squareImg"
        }},
        {$lookup: {
            "from": "posts",
            "localField": "posts",
            "foreignField": "_id",
            "as": "posts"
        }},
    ])
    .exec()
    .then(topic => {
        // console.log("TOPIC", performance.now() - t0)
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