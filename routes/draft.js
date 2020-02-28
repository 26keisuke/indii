import express from "express"
import mongoose from "mongoose";

import User from "../models/User"
import Topic from "../models/Topic"
import Post from "../models/Post"
import Draft from "../models/Draft"
import Image from "../models/Image"

const router = express.Router()

router.get("/draft", (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            Draft.find({_id: {$in: user.draft}, isDeleted: false, isUploaded: false}).populate("topicSquareImg").populate("postImg").exec()
            .then(draft => {
                res.send(draft)
            })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post("/draft/upload", (req, res) => {

    const { draftId, index, addColumn } = req.body.value
    
    Draft.findById(draftId)
        .then(draft => {
            
            const imgId = mongoose.Types.ObjectId();

            const { 
                topic, topicName,
                postName, postImg,
                content, ref,
                config, 
                topicRectangleImg, topicSquareImg, topicMobileImg } = draft

            if(postImg){
                new Image({_id: imgId, image: postImg}).save()
            }

            var newIndex = index.slice()
            if(addColumn === true) {
                newIndex[0] = index[0] + 1
                newIndex[1] = 0
            } else {
                newIndex[1] = index[1] + 1
            }

            const data = {
                topic: topic,
                topicName: topicName,
                topicRectangleImg: topicRectangleImg,
                topicSquareImg: topicSquareImg,
                topicMobileImg: topicMobileImg,
                postName: postName,
                postImg: postImg ? imgId : undefined,
                index: newIndex,
                content: content,
                ref: ref,
                creator: req.user.id,
                creationDate: Date.now(),
                lastEdited: Date.now(),
                config: config,
            }

            const post = new Post(data)

            post.contribution.push({
                timeStamp: Date.now(),
                user: req.user.id
            })

            post.save()
            .then(newPost => {
                Topic.findById(topic).populate("posts")
                .then(topicElem => {

                    console.log("********UPDATING TOPICS********")

                    if(addColumn) {

                        const columnId = mongoose.Types.ObjectId()
                        const threshold = index[0] + 1

                        // topicElem.columnをupdate
                    
                        for (var k in topicElem.column) {
                            if(topicElem.column[k].index >= threshold){
                                topicElem.column[k].index = topicElem.column[k].index + 1
                            }
                        }

                        const newColumn = {
                            _id: columnId,
                            index: threshold,
                            title: postName,
                            posts: []
                        }
                        newColumn.posts.push(newPost)

                        topicElem.splice(threshold, 0, newColumn)

                        // topicElem.column.push(newColumn) <- これだと、順番がそろわない（columnは順番がそろわなくてはいけない）

                        // topicElem.postsをupdate

                        var promises = []

                        for (var l in topicElem.posts) {
                            if(topicElem.posts[l].index[0] >= threshold) {
                                promises.push(
                                    Post.update({_id: topicElem.posts[l]._id}, {$inc: {"index.0": 1}})
                                )
                            }
                        }

                        Promise.all(promises)
                        .then(() => {
                            // 注意: このthenの中にこいつらをいれないとupdateは反映されない

                            topicElem.posts.push(newPost)

                            // orderをupdate

                            topicElem.order.splice(threshold, 0, columnId)

                            // postCountをアップデート

                            topicElem.postCount++;

                            topicElem.save() 
                        })

                    } else {

                        const insertColumn = index[0]
                        const insertIndex = index[1] + 1

                        // topicElem.postsをupdate

                        var promises = []

                        for (var l in topicElem.posts) {
                            if((topicElem.posts[l].index[0] === insertColumn) && (topicElem.posts[l].index[1] >= insertIndex)) {
                                // Warning: topicElemから.save()してもできないので、Postをもう一回取ってくるようにしている
                                promises.push(
                                    Post.update({_id: topicElem.posts[l]._id}, {$inc: {"index.1": 1}})
                                )   
                            }
                        }

                        Promise.all(promises)
                        .then(() => {
                            topicElem.posts.push(newPost)

                            // topicElem.column.postsをupdate

                            for (var m in topicElem.column) {
                                if(topicElem.column[m].index === insertColumn) {
                                    topicElem.column[m].posts.splice(insertIndex, 0, newPost)
                                }
                            }

                            // postCountをアップデート

                            topicElem.postCount++;

                            topicElem.save()
                        })
                    }

                    draft.isUploaded = true
                    draft.save()
                    .then(res.send("Success: /api/draft/upload"))

                })
            })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post("/draft/delete", (req, res) => {
    Draft.updateMany(
        { _id: { $in: req.body.subject }},
        { $set: { isDeleted: true }},
        { $push: { editDate: Date.now() }})
        .then(draft => {
            res.send("Success: /api/draft/delete")
        })
})

router.post("/draft/:id", (req, res) => {
    Draft.findById(req.params.id)
    .then(draft => {
        draft.content = req.body.content
        if(req.body.timeUpdate !== false) {
            draft.editDate.push(Date.now())
        }
        draft.save()
        .then((draft) => {
            res.send("Sucess: POST /api/draft/:id")
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/draft/:id/image", (req, res) => {

    const imgId = mongoose.Types.ObjectId();

    new Image({ _id: imgId, image: req.body.img }).save()

    Draft.findById(req.params.id)
    .then(draft => {
        draft.postImg = imgId
        draft.save()
        .then(res.send("Success: /api/draft/:id/image"))
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/draft/:id/ref", (req, res) => {
    Draft.findById(req.params.id)
    .then(draft => {
        draft.ref.push(req.body.ref)
        draft.save()
        .then(res.send("Success: /api/draft/:id/ref"))
    })
    .catch(err => {
        console.log(err)
    })
})

router.delete("/draft/:id/ref/:refId", (req, res) => {
    Draft.findById(req.params.id)
    .then(draft => {
        for(var k in draft.ref) {
            if(String(draft.ref[k]._id) === String(req.params.refId)) {
                draft.ref[k].isDeleted = true
                break
            }
        }
        draft.save()
        .then(res.send("Sucess: /api/draft/:id/ref/:refId"))
    })
})


export default router