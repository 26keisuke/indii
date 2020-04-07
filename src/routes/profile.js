import express from "express"
import mongoose from "mongoose";

import User from "../models/User"

import { performance } from "perf_hooks"
import { isLoggedIn } from "./util/util"

const router = express.Router()

router.get("/:userId/:type", (req, res) => {
    var t0 = performance.now()
    
    var pre = [
        {$match: {"_id": {$in: [mongoose.Types.ObjectId(req.params.userId)]}}}
    ]

    var post = [];

    switch(req.params.type){
        case "general":
            break
        case "likedPost":
            post = [
                {$project: {
                    _id: 0,
                    likedPost: 1
                }},
                {$lookup: {
                    "from": "posts",
                    "localField": "likedPost.post",
                    "foreignField": "_id",
                    "as": "likedPost",
                }},
                {$unwind: {
                    path: "$likedPost",
                }},
                {$lookup: {
                    "from": "images",
                    "localField": "likedPost.postImg",
                    "foreignField": "_id",
                    "as": "likedPost.postImg",
                }},
                {$lookup: {
                    "from": "images",
                    "localField": "likedPost.topicSquareImg",
                    "foreignField": "_id",
                    "as": "likedPost.topicSquareImg",
                }},
                {$group: {_id: null, likedPost: {$push: "$likedPost"}}},
                {$project: {_id: 0}},
            ]
            break
        case "likedTopic":
            post = [
                {$project: {
                    _id: 0,
                    likedTopic: 1,
                }},
                {$lookup: {
                    "from": "topics",
                    "localField": "likedTopic.topic",
                    "foreignField": "_id",
                    "as": "likedTopic",
                }},
                {$project: {
                    "likedTopic._id": 1,
                    "likedTopic.topicName": 1,
                    "likedTopic.likes": 1,
                    "likedTopic.squareImg": 1,
                    "likedTopic.tags": 1,
                    "likedTopic.posts": { $arrayElemAt: [ "$likedTopic.posts", 0 ] },
                }},
                {$unwind: {
                    path: "$likedTopic",
                }},
                {$lookup: {
                    "from": "images",
                    "localField": "likedTopic.squareImg",
                    "foreignField": "_id",
                    "as": "likedTopic.squareImg",
                }},
                {$lookup: {
                    "from": "posts",
                    "localField": "likedTopic.posts",
                    "foreignField": "_id",
                    "as": "likedTopic.posts",
                }},
                {$group: {_id: null, likedTopic: {$push: "$likedTopic"}}},
                {$project: {_id: 0}},
            ]
            break
        case "post":
            post = [
                {$project: {
                    _id: 0,
                    post: 1
                }},
                {$lookup: {
                    "from": "posts",
                    "localField": "post",
                    "foreignField": "_id",
                    "as": "post",
                }},
                {$unwind: {
                    path: "$post",
                }},
                {$lookup: {
                    "from": "images",
                    "localField": "post.postImg",
                    "foreignField": "_id",
                    "as": "post.postImg",
                }},
                {$lookup: {
                    "from": "images",
                    "localField": "post.topicSquareImg",
                    "foreignField": "_id",
                    "as": "post.topicSquareImg",
                }},
                {$group: {_id: null, post: {$push: "$post"}}},
                {$project: {_id: 0}},
            ]
            break
        case "follows":
            post = [
                {$project: {
                    _id: 0,
                    follows: 1
                }},
                {$lookup: {
                    "from": "users",
                    "localField": "follows.user",
                    "foreignField": "_id",
                    "as": "follows",
                }},
                {$unwind: {
                    path: "$follows",
                }},
                {$group: {_id: null, follows: {$push: "$follows"}}},
                {$project: {_id: 0}},
            ]
            break
        case "followers":
            post = [
                {$project: {
                    _id: 0,
                    followers: 1
                }},
                {$lookup: {
                    "from": "users",
                    "localField": "followers.user",
                    "foreignField": "_id",
                    "as": "followers",
                }},
                {$unwind: {
                    path: "$followers",
                }},
                {$group: {_id: null, followers: {$push: "$followers"}}},
                {$project: {_id: 0}},
            ]
            break
        default:
            break
    }

    const query = pre.concat(post)

    User.aggregate(query)
    .exec() 
    .then(data => {
        console.log(performance.now() - t0)
        res.send(data)
    })
    .catch(err => {
        console.log(err)
    })   
})

router.post("/:userId", isLoggedIn, (req, res) => {
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

router.post("/:userId/photo", isLoggedIn, (req, res) => {
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

router.post("/:userId/follow/added", isLoggedIn, (req, res) => {
    var result;
    const now = Date.now()

    // 対象者
    User.findById(req.params.userId)
    .then(target => {
        result = target.followers.filter(user => String(user.user) === String(req.user.id))

        if(!result[0]){
            target.followers.push({ timeStamp: now, user: req.user.id})
            // 対象者に通知を送る
            target.notif.push({timeStamp: now, type: "FOLLOWED", user: req.user.id})
        }

        // 自分
        User.findById(req.user.id)
        .then(subject => {
            result = subject.follows.filter(user => String(user.user) === String(target._id))

            if(!result[0]){
                subject.follows.push({ timeStamp: now, user: target.id })
            }

            target.save()
            subject.save()
            res.send(subject.follows)
        })
    })
    .catch(err => {
        console.log(err)
    })

})

router.post("/:userId/follow/removed", isLoggedIn, (req, res) => {
    // 対象者
    User.findById(req.params.userId)
    .then(target => {
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

        // 自分
        User.findById(req.user.id)
        .then(subject => {
            subject.follows.map((user, index) => {
                if(String(user.user) === String(target.id)) {
                    subject.follows.splice(index, 1)
                }
            })

            target.save()
            subject.save()
            res.send(subject.follows)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

export default router