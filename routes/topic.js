import express from "express"
import mongoose from "mongoose";
import equal from "deep-equal";

import User from "../models/User"
import Topic from "../models/Topic"
import Post from "../models/Post"
import Draft from "../models/Draft"
import Image from "../models/Image"

import { isLoggedIn } from "./util/util"

const router = express.Router()

router.post("/", isLoggedIn, (req, res) => {

    const columnId = mongoose.Types.ObjectId();
    const topicId = mongoose.Types.ObjectId();
    const topicRectangleImgId = mongoose.Types.ObjectId();
    const topicSquareImgId = mongoose.Types.ObjectId();
    const topicMobileImgId = mongoose.Types.ObjectId();

    const ls = [
        {_id: topicRectangleImgId, image: req.body.rectangleImg},
        {_id: topicSquareImgId, image: req.body.squareImg},
        {_id: topicMobileImgId, image: req.body.mobileImg},
    ]

    Image.insertMany(ls)

    const newBody = Object.assign(
        {},
        req.body,
        {squareImg: topicSquareImgId,
        rectangleImg: topicRectangleImgId,
        mobileImg: topicMobileImgId}
    )

    var post = new Post({
        topic: topicId, 
        topicName: req.body.topicName, 
        topicRectangleImg: topicRectangleImgId,
        topicSquareImg: topicSquareImgId,
        topicMobileImg: topicMobileImgId,
        index: [0], 
        postName: "概要",
    })

    post.save()
        .then((post) => {
            const desc = {
                _id: columnId,
                index: 0, // Column別にrenderする時に役に立つ
                title: "概要",
                posts: [post.id]
            }
            var topic = new Topic(Object.assign({_id: topicId}, newBody))
            topic.column.push(desc)
            topic.order.push(columnId)
            topic.posts.push(post.id)
            topic.postCount++
            topic.save()
                .then((topic) => {
                    res.send("Success: POST /api/topic")
                })
                .catch(err => { console.log(err); res.send("Fail: POST /api/topic") })
        })
})

router.post("/:topicId/edit", isLoggedIn, (req, res) => {
    Topic.findById(req.params.topicId)
    .then(topic => {

        const {
            mobileImg,
            rectangleImg,
            squareImg,
            tags,
            posts,
            columns,
            order,
        } = req.body

        // TOPIC PHASE

        // check if each image is changed, create new image with OBJID, then insert
        var id;
        var imgList = []

        if(topic.squareImg !== squareImg) { 
            id = mongoose.Types.ObjectId();
            imgList.push({ _id: id, image: squareImg })
            topic.squareImg = id
        }
        if(topic.rectangleImg !== rectangleImg) { 
            id = mongoose.Types.ObjectId();
            imgList.push({ _id: id, image: rectangleImg })
            topic.rectangleImg = id
        }
        if(topic.mobileImg !== mobileImg) { 
            id = mongoose.Types.ObjectId();
            imgList.push({ _id: id, image: mobileImg })
            topic.mobileImg = id
        }

        if(imgList.length > 0) { Image.insertMany(imgList) }

        // check if tags are changed => if yes replace
        if(topic.tags !== tags) { topic.tags = tags }

        // orders 
        var orderList = []

        console.log(topic.order)
        console.log(order)
        
        for(var i=0; i < order.length; i++) {
            orderList.push(mongoose.Types.ObjectId(order[i]))
        }

        console.log(typeof topic.order[0])
        console.log(typeof orderList[0])

        console.log(equal(topic.order[0], orderList[0]))

        if(!equal(topic.order, orderList)) {
            console.log("HERE")
            topic.order = orderList
        }
        

        // columns

        console.log(topic.column)
        console.log(columns)
        
        if(!equal(topic.column, columns)){
            
        }

        // POST PHASE

        // check if posts are changed => if yes replace
        
        // 

        // activityに追加

        // USER PHASE

        // editTopicを追加する

        // activityに追加

        // SAVING PHASE

        // topic.save()
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/:topicId/post", isLoggedIn, (req, res) => {
    const data = Object.assign({user: req.user.id, type: "New", creationDate: Date.now()}, req.body)
    new Draft(data)
    .save()
    .then(draft => {
        User.findById(req.user.id)
            .then(user => {
                user.draft.push(draft)
                user.save()
                .then(res.send("Success: POST /api/topic/:topicId/post"))
            })
    })
    .catch(err => {
        console.log(err)
        res.send("Fail: POST /api/topic/:topicId/post")
    })
})

router.get("/:topicId/:type", (req, res) => {
    const type = req.params.type
    switch(type){
        case "ALL":
            Topic.findById(req.params.topicId)
                .populate("rectangleImg")
                .populate("mobileImg")
                .populate("squareImg")
                // .populate({path: "column.posts", populate: {path: "postImg"}})
                .populate({path: "posts", populate: {path: "postImg"}})
                .exec()
                .then(topic => {
                    res.send(topic)
                })
                .catch(err => {
                    console.log(err)
                })
            return
        case "INDEX":
            Topic.findById(req.params.topicId).populate("column.posts").exec()
                .then(topic => {
                    res.send(topic)
                })
                .catch(err => {
                    console.log(err)
                })
            return
        default:
            return
    } 
})

router.get("/search/:type/:term", (req, res) => {
    const type = req.params.type
    const value = type === "Match" ? '^' + req.params.term : '^' + req.params.term + '$' 
    Topic.find({"topicName": {$regex: value, $options: 'i'}}).populate("squareImg")
        .exec()
        .then(topic => {
            if(topic.length === 0){
                const result = type === "Match" ? [] : [{added: true}]
                res.send(result)
            } else {
                res.send(topic)
            }
        })
        .catch(err => {
            console.log(err)
            res.send([])
        })
})

export default router