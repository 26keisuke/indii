import express from "express"

import User from "../models/User"
import Topic from "../models/Topic"
import Post from "../models/Post"
import Draft from "../models/Draft"

const router = express.Router()

router.get("/draft", (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            Draft.find({_id: {$in: user.draft}}).limit(10)
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
            
            const { topic, topicName, postName, content, config } = draft

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
                postName: postName,
                index: newIndex,
                content: content,
                creator: req.user.id,
                creationDate: Date.now(),
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
                            index: index[0] + 1,
                            title: postName,
                            posts: []
                        }
                        newColumn.posts.push(newPost)

                        topicElem.column.push(newColumn)

                        // topicElem.postsをupdate

                        for (var l in topicElem.posts) {
                            if(topicElem.posts[l][0] >= threshold) {
                                topicElem.posts[l][0] = topicElem.posts[l][0] + 1
                            }
                        }

                        topicElem.posts.push(newPost)

                        // orderをupdate

                        topicElem.order.splice(threshold, 0, columnId)

                        // postCountをアップデート

                        topicElem.postCount++;

                        topicElem.save()

                    } else {

                        const insertColumn = index[0]
                        const insertIndex = index[1]

                        // topicElem.postsをupdate
                        
                        for (var l in topicElem.posts) {
                            if((topicElem.posts[l][0] === insertColumn) && (topicElem.posts[l][1] >= insertIndex)) {
                                topicElem.posts[l][1] = topicElem.posts[l][1] + 1
                            }
                        }

                        topicElem.posts.push(newPost)

                        // topicElem.column.postsをupdate

                        for (var m in topicElem.column) {
                            if(topicElem.column[m].index === insertColumn) {
                                topicElem.column[m].splice(insertIndex, 0, newPost)
                            }
                        }

                        // postCountをアップデート

                        topicElem.postCount++;

                        topicElem.save()

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

router.post("/draft/:id/ref", (req, res) => {
    Draft.findById(req.params.id)
    .then(draft => {
        console.log(req.body.ref.postDate)
        console.log(typeof req.body.ref.postDate)
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