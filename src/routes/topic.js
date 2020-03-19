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


router.get("/:topicId/:type", (req, res) => {
    const type = req.params.type
    switch(type){
        case "ALL":
            Topic.findById(req.params.topicId)
                .populate("rectangleImg")
                .populate("mobileImg")
                .populate("squareImg")
                // .populate({path: "column.posts", populate: {path: "postImg"}})
                .populate({path: "posts", populate: [{path: "postImg"}, {path: "topicSquareImg"}, {path: "creator"}]})
                .populate("activity.user")
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
        case "IMAGE":
            Topic.findById(req.params.topicId)
                .populate("rectangleImg")
                .populate("mobileImg")
                .populate("squareImg")
                .then(topic => {
                    res.send(topic)
                })
                .catch(err => {
                    console.log(err)
                })
            return
        default:
            Topic.findById(req.params.topicId)
                .then(topic => {
                    res.send(topic)
                })
                .catch(err => {
                    console.log(err)
                })
            return
    } 
})

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
            const now = Date.now()
            var topic = new Topic(Object.assign({_id: topicId, creator: req.user.id}, newBody))
            topic.column.push(desc)
            topic.order.push(columnId)
            topic.posts.push(post.id)
            topic.postCount++
            topic.activity.push({timeStamp: now, user: req.user.id, type: "CREATE_TOPIC"})
            User.findById(req.user.id)
            .then(user => {
                user.createTopic.push({timeStamp: now, topic: topicId})
                user.save()
                .then(() => {   
                    topic.save()
                    .then(() => {
                        res.send("Success: POST /api/topic")
                    })
                    .catch(err => { console.log(err) })
                })  
            })
        })
})

router.post("/:topicId/edit", isLoggedIn, (req, res) => {
    Topic.findById(req.params.topicId).populate("posts") // populateした方がパフォーマンスが上がるのかは不明
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

        // convert strings to OBJIDS and check if orders are changed => if yes replace
        var orderList = []
        
        for(var i=0; i < order.length; i++) {
            orderList.push(mongoose.Types.ObjectId(order[i]))
        }

        if(!equal(topic.order, orderList)) {
            topic.order = orderList
        }
        
        // while converting _id string to OBJID, check if values are changed
        const result = columnCheckModified(columns, topic.column)

        if(result){
            topic.column = columns
        }

        // POST PHASE

        // check if posts are changed(if column is changed, post is always changed) => if yes replace
        var promises = [];

        if(result[0]) {
            promises = modifyPostIndex(posts, topic.posts)
        }

        const now = Date.now() // 同じ Date.now()でuserとtopic schemaで揃える

        // activityに追加
        Promise.all(promises)
        .then(() => {
            topic.activity.push({type: "EDIT_TOPIC", user: req.user.id, timeStamp: now})
            User.findById(req.user.id)
            .then(user => {
                // editTopicを追加する
                user.editTopic.push({timeStamp: now, topic: topic._id});
                topic.save();
                user.save();
                res.send("Success")
            });
        });
    })
    .catch(err => {
        console.log(err)
    })
})

function arrObjLookUp(obj, field, attr){
    for(var i=0; i < obj.length; i++){
        if(equal(obj[i][field], attr)){
            return obj[i]
        }
    }
    return
}

function modifyPostIndex(newPosts, oldPosts) {

    var promises = []

    var id;
    var lookUp;
    var columnIdxChnaged;
    var postIdxChanged;

    for(var j=0; j < newPosts.length; j++){
        id = mongoose.Types.ObjectId(newPosts[j]._id)
        lookUp = arrObjLookUp(oldPosts, "_id", id)
        if(!equal(newPosts[j].index, lookUp.index)) {
            columnIdxChnaged = newPosts[j].index[0] - lookUp.index[0]
            postIdxChanged = newPosts[j].index[1] - lookUp.index[1]
            console.log("FROM => TO: ", lookUp.index, newPosts[j].index, newPosts[j].postName)
            console.log("CHANGE IN VALUE :: (COLUMN, INDEX) => ", "(", columnIdxChnaged, ",", postIdxChanged, ")")
            promises.push(
                Post.updateOne({_id: id}, {$inc: {"index.0": columnIdxChnaged, "index.1": postIdxChanged}})
            )
        }
    }

    return promises
}

function columnCheckModified(newColumn, oldColumn) {

    var flag = false;

    for(var j=0; j < newColumn.length; j++){
        newColumn[j]._id = mongoose.Types.ObjectId(newColumn[j]._id)
        if(oldColumn[j]){
            flag = !equal(newColumn[j]._id, oldColumn[j]._id)
            flag = !equal(newColumn[j].title, oldColumn[j].title)
        } else {
            flag = true
        }
        if(flag) { break }
        for(var k=0; k < newColumn[j].posts.length; k++){
            newColumn[j].posts[k] = mongoose.Types.ObjectId(newColumn[j].posts[k])
            if(oldColumn[j].posts[k]){
                flag = !equal(newColumn[j].posts[k]._id, oldColumn[j].posts[k]._id)
            } else {
                flag = true
            }
            if(flag) { break }
        }
    }

    return flag
}

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

router.post("/:topicId/like", (req, res) => {

    const now = Date.now()

    Topic.findById(req.params.topicId)
    .then(topic => {
        if(req.body.like){
            const res = topic.likes.user.filter(user => user === req.user._id)
            if(!res[0]){
                topic.likes.counter++;
                topic.likes.user.push(req.user.id)
            }
        } else {
            topic.likes.user.map((user,index) => {
                if(String(user) === String(req.user.id)) {
                    topic.likes.user.splice(index, 1)
                    topic.likes.counter--;
                }
            })
        }

        User.findById(req.user.id)
        .then(user => {
            if(req.body.like){
                user.likedTopic.push({timeStamp: now, topic: topic._id})
            } else {
                user.likedTopic.map((elem, index) => {
                    if(String(elem.topic) === String(topic._id)){
                        user.likedTopic.splice(index, 1)
                    }
                })
            }

            user.save();
            topic.save();

            res.send(user.likedTopic)

        })
    })
    .catch(err => console.log(err))
})


router.get("/search/:type/:term", (req, res) => {
    const type = req.params.type
    const value = type === "MATCH" ? '^' + req.params.term : '^' + req.params.term + '$' 

    Topic.find({"topicName": {$regex: value, $options: 'i'}}).populate("squareImg")
        .exec()
        .then(topic => {
            if(topic.length === 0){
                const result = [req.params.term]
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