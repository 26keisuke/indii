import express from "express"
import mongoose from "mongoose";
import equal from "deep-equal"

import User from "../models/User"
import Topic from "../models/Topic"
import Post from "../models/Post"
import Draft from "../models/Draft"
import Image from "../models/Image"

const router = express.Router()

router.get("/", (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            Draft.find({_id: {$in: user.draft}, isDeleted: false, isUploaded: false})
            .populate("topicSquareImg").populate("postImg").populate("editCreator").populate("editLastEditedAuthor").exec() // 最後の二つのpopulateはいらないかもしれない
            .then(draft => {
                res.send(draft)
            })
        })
        .catch(err => {
            console.log(err)
        })
})

router.get("/:draftId", (req, res) => {
    Draft.findById(req.params.draftId).populate("editCreator").populate("editLastEditedAuthor").exec()
    .then(draft => {
        res.send(draft)
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/upload", (req, res) => {

    const { draftId, index, addColumn } = req.body.value

    Draft.findById(draftId).populate("postImg").populate("editCreator")
        .then(draft => {

            const now = Date.now()

            if(draft.type !== "New") {
                User.findById(draft.editCreator)
                .then(user => {                
                    // allowEditがfalseの時
                    if((draft.config.allowEdit === false) && (draft.editCreator._id !== req.user.id)){
                        draft.editUploadedDate = now

                        user.notif.push({timeStamp: now, type: "POST_EDIT", user: req.user.id, post: draft.editPostId, draft: draft._id})

                        draft.save();
                        user.save()
                        res.send("Success")
                        return
                    }

                    // allowEditがtrueの時
                    Post.findById(draft.editPostId)
                    .then(post => {

                        console.log("HERE")

                        if(post.content !== draft.content){post.content = draft.content}
                        if(post.ref !== draft.ref){post.ref = draft.ref}
                        if(post.postName !== draft.postName){post.postName = draft.postName} //まだ何も変更できないが、将来的には変更できるようにしたい
                        if(!equal(post.tags, draft.tags)){post.tags = draft.tags}

                        if(post.postImg !== draft.postImg) {
                            const imgId = mongoose.Types.ObjectId()
                            new Image({_id: imgId, image: draft.postImg.image}).save()
                            post.postImg = imgId
                        }

                        post.contribution.push({user: req.user.id, timeStamp: now})

                        draft.isUploaded = true

                        Topic.findById(post.topic)
                        .then(topicElem => {

                            topicElem.activity.push({timeStamp: now, user: req.user.id, type: "EDIT_POST", postName: draft.postName})
                            
                            if(user){ // type === ZEROの場合はuserがない
                                user.notif.push({timeStamp: now, type: "POST_EDIT", user: req.user.id, post: draft.editPostId, draft: draft._id})
                                user.save()
                            }
                            
                            topicElem.save()
                            post.save()
                            draft.save()

                            res.send("Success")
                            return
                        })
                    })
                    return
                })

            } else {
            
                const imgId = mongoose.Types.ObjectId();

                const { 
                    topic, topicName,
                    postName, postImg,
                    content, ref, tags,
                    config, 
                    topicRectangleImg, topicSquareImg, topicMobileImg } = draft

                // if(postImg){
                //     new Image({_id: imgId, image: postImg.image}).save()
                // }

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
                    tags: tags,
                    index: newIndex,
                    content: content,
                    ref: ref,
                    creator: req.user.id,
                    creationDate: now,
                    lastEdited: now,
                    config: config,
                }

                const post = new Post(data)

                post.contribution.push({
                    timeStamp: now,
                    user: req.user.id
                })

                post.save()
                .then(newPost => {


                    User.findById(req.user.id)
                    .then(user => {
                        user.post.push(newPost._id)
                        user.save()
                    })


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

                            topicElem.column.splice(threshold, 0, newColumn)

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

                                topicElem.activity.push({timeStamp: now, user: req.user.id, type: "CREATE_POST", postName: newPost.postName})

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
                                
                                topicElem.activity.push({timeStamp: now, user: req.user.id, type: "CREATE_POST", postName: postName})

                                topicElem.save()
                            })
                        }

                        draft.isUploaded = true
                        draft.save()
                        .then(res.send("Success: /api/draft/upload"))

                    })
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

router.post("/delete", (req, res) => {
    Draft.updateMany(
        { _id: { $in: req.body.subject }},
        { $set: { isDeleted: true }},
        { $push: { editDate: Date.now() }})
        .then(draft => {
            res.send("Success: /api/draft/delete")
        })
})

router.post("/edit", (req, res) => {

    const now = Date.now();
    const { draftId, accept, comment, feedback } = req.body

    Draft.findById(draftId).populate("postImg")
    .then(draft => {
        if(accept){
            Post.findById(draft.editPostId)
            .then(post => {

                post.lastEdited = now
                post.contribution.push({ timeStamp: now, user: draft.user})
                post.postName = (post.postName !== draft.postName) ? draft.postName : post.postName
                post.content = (post.content !== draft.content) ? draft.content : post.content

                if(draft.postImg && !equal(post.postImg, draft.postImg.image)){

                    const imgId = mongoose.Types.ObjectId();
                    new Image({_id: imgId, image: draft.postImg.image}).save();

                    post.postImg = imgId;

                }

                if(!equal(post.ref, draft.ref)){
                    post.ref = draft.ref
                }

                User.findById(draft.user)
                .then(user => {
                    user.notif.push({
                        timeStamp: now,
                        type: "POST_EDIT_FEEDBACK",
                        user: req.user.id,
                        emoji: feedback,
                        draft: draftId, // これはallowEditがfalseの場合に必要
                        post: post._id,
                        topic: post.topic,
                        comment: comment, // これはPOST_EDIT_FEEDBACKの時のみ必要
                        isApproved: accept, // これはPOST_EDIT_FEEDBACKの時のみ必要
                    })

                    draft.isApproved = "APPROVE";
                    draft.editConfirmedDate = now;
                    draft.comment = comment;

                    Topic.findById(post.topic)
                    .then(topicElem => {

                        topicElem.activity.push({timeStamp: now, user: req.user.id, type: "EDIT_POST", postName: draft.postName})

                        topicElem.save()
                        draft.save();
                        post.save();
                        user.save();

                        res.send(accept)
                        return
                    })
                })
            })
        } else {
            User.findById(draft.user)
            .then(user => {
                user.notif.push({
                    timeStamp: now,
                    type: "POST_EDIT_FEEDBACK",
                    user: req.user.id,
                    emoji: feedback,
                    draft: draftId, // これはallowEditがfalseの場合に必要
                    comment: comment, // これはPOST_EDIT_FEEDBACKの時のみ必要
                    isApproved: accept, // これはPOST_EDIT_FEEDBACKの時のみ必要
                })

                draft.isApproved = "REJECT";
                draft.editConfirmedDate = now;

                draft.save();
                user.save();

                res.send(accept)
            })
        }

    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/:id", (req, res) => {
    if(!req.params.id) return

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

router.post("/:id/name", (req, res) => {
    Draft.findById(req.params.id)
    .then(draft => {
        if(req.body.revert && (draft.type === "Edit")){
            Post.findById(draft.editPostId)
            .then(post => {
                draft.postName = post.postName
                draft.save()
                .then(res.send("Success"))
            })
        } else {
            draft.postName = req.body.value
            draft.save()
            .then(res.send("Success"))
        }
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/:id/config", (req, res) => {
    Draft.findById(req.params.id)
    .then(draft => {
        draft.config[req.body.config] = !draft.config[req.body.config]
        draft.save()
        .then(res.send("Success"))
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/:id/tag", (req, res) => {
    Draft.findById(req.params.id)
    .then(draft => {
        if(req.body.revert && (draft.type === "Edit")){
            Post.findById(draft.editPostId)
            .then(post => {
                draft.tags = post.tags
                draft.save()
                .then(res.send("Success"))
            })
        } else {
            draft.tags = req.body.tags
            draft.save()
            .then(res.send("Success"))
        }
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/:id/image", (req, res) => {

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

router.post("/:id/ref", (req, res) => {
    Draft.findById(req.params.id)
    .then(draft => {
        draft.ref.push(req.body.ref)
        draft.save()
        .then(res.send({id: draft._id, ref:draft.ref}))
    })
    .catch(err => {
        console.log(err)
    })
})

router.delete("/:id/ref/:refId", (req, res) => {
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