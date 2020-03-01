import express from "express"

import User from "../models/User"
import Topic from "../models/Topic"
import Post from "../models/Post"
import Draft from "../models/Draft"

import { isLoggedIn } from "./util/util"

const router = express.Router()


router.get("/:postId", (req, res) => {
    Post.findById(req.params.postId).populate({path: "topic", populate:{ path: "rectangleImg"}}).populate("creator").exec()
    .then(post => {
        res.send(post)
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/:postId/edit", isLoggedIn, (req, res) => {
    Post.findById(req.params.postId)
    .then(post => {

        const type = post.index[0] === 0 ? "Zero" : "Edit"
        const lastContribution = post.contribution[post.contribution.length-1]

        const data = {
            user: req.user.id,
            type,
            creationDate: Date.now(),
            topic: post.topic,
            topicName: post.topicName,
            topicSquareImg: post.topicSquareImg,
            postName: post.postName,
            postImg: post.postImg,
            content: post.content,
            editPostId: post._id,
            editCreator: post.creator,
            editCreationDate: post.creationDate,
            editLastEdited: (type !== "New") && lastContribution && lastContribution.timeStamp,
            editLastEditedAuthor: (type !== "New") && lastContribution && lastContribution.user,
            // editContribution: post.editContribution,
            editIndex: post.index,
            ref: post.ref,
            config: {
                allowEdit: post.config.allowEdit,
            }
        }

        new Draft(data)
        .save()
        .then(draft => {
            User.findById(req.user.id)
                .then(user => {
                    user.draft.push(draft)
                    user.save()
                    .then(res.send("Success"))
                })
        })
        .catch(err => {
            console.log(err)
            res.send("Fail")
        })
    })
})


//　通知
router.post("/:postId/star", isLoggedIn, (req, res) => {

    const now = Date.now()

    Post.findById(req.params.postId)
    .then(post => {

        // postの変更
        if(!req.body.like){
            post.star.action.map((elem, index) => {
                if(String(elem.user) === String(req.user.id)) {
                    post.star.action.splice(index, 1)
                    post.star.counter--
                }
            })
        } else {
            const res = post.star.action.filter(elem => String(elem.user) === String(req.user.id))

            if(!res[0]){
                post.star.counter++
                post.star.action.push({timeStamp: now, user: req.user.id})
            }
        }

        // post ownerの変更
        User.findById(post.creator)
        .then(user => {
            if(!req.body.like){
                user.notif.push({timeStamp: now, type: "POST_LIKE", user: req.user.id, post: post._id})
            } else {
                user.notif.map((elem, index) => {
                    if((elem.type === "POST_LIKE") && (elem.post === post._id)){
                        user.notif.splice(index, 1)
                    }
                })
            }
        })

        // req.userの変更
        User.findById(req.user.id)
        .then(user => {
            if(!req.body.like){
                user.likedPost.map((elem,index) => {
                    if(String(elem.post) === String(post.id)) {
                        user.likedPost.splice(index, 1)
                    }
                })
            } else {
                const res = user.likedPost.filter(elem => String(elem.post) === String(post.id))

                if(!res[0]){
                    user.likedPost.push({timeStamp: now, post: post.id})
                }
            }
            post.save()
            user.save()

            res.send("DONE")
        })
    })
    .catch(err => {
        console.log(err)
    })
})

//　通知
router.post("/:postId/emoji", isLoggedIn, (req, res) => {

    const now = Date.now()

    Post.findById(req.params.postId)
    .then(post => {

        // postの変更
        if(!req.body.emoji){
            post.rating.map((elem, index) => {
                if(String(elem.user) === String(req.user.id)) {
                    post.rating.splice(index, 1)
                }
            })
        } else {
            const res = post.rating.map(elem => {
                if(String(elem.user) === String(req.user.id)) {
                    elem.rate = req.body.emoji
                    elem.timeStamp = now
                    return true
                }
            })
            if(!res[0]){ 
                post.rating.push({timeStamp: now, user: req.user.id, rate: req.body.emoji})
            }
        }

        // post ownerの変更
        User.findById(post.creator)
        .then(user => {
            if(!req.body.emoji){
                user.notif.push({timeStamp: now, type: "POST_EMOJI", user: req.user.id, post: post._id})
            } else {
                user.notif.map((elem, index) => {
                    if((elem.type === "POST_EMOJI") && (elem.post === post._id)){
                        user.notif.splice(index, 1)
                    }
                })
            }
        })

        // req.userの変更
        User.findById(req.user.id)
        .then(user => {
            if(!req.body.emoji){
                user.postRating.map((elem,index) => {
                    if(String(elem.post) === String(post.id)) {
                        user.postRating.splice(index, 1)
                    }
                })
            } else {
                const res = user.postRating.map(elem => {
                    if(String(elem.post) === String(post.id)) {
                        elem.rate = req.body.emoji
                        elem.timeStamp = now
                        return true
                    }
                })
                if(!res[0]){
                    user.postRating.push({timeStamp: now, post: post.id, rate: req.body.emoji})
                }
            }
            post.save()
            user.save()

            res.send("DONE")
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/delete", (req,res) => {
    console.log(`DELETING ${req.body.id}`)
    res.send("")
})

// post searchはtopicId内で検索するやり方と、postIdでpost全体から検索する方法の二種類
// Method 1
router.get("/search/:type/:term/:topicId", (req, res) => {
    const type = req.params.type
    const value = type === "Match" ? '^' + req.params.term : '^' + req.params.term + '$' 
    // ここのpostImgの方はpopulateされない可能性あり
    Topic.findById(req.params.topicId)
        .populate({path: "posts", populate: [{path: "topicSquareImg"}, {path: "postImg"}]})
        .exec()
        .then(topic => {
            var result = []
            var regEx = new RegExp(value)
            for(var k in topic.posts){
                if(regEx.exec(topic.posts[k].postName)) {
                    result.push(topic.posts[k])
                }
            }
            if(result.length === 0){
                result = type === "Match" ? [] : [{added: true}]
            }
            res.send(result)
        })
        .catch(err => {
            console.log(err)
            res.send([])
        })
})
// Method 2
router.get("/search/:type/:term", (req, res) => {
    const type = req.params.type
    const value = type === "Match" ? '^' + req.params.term : '^' + req.params.term + '$' 
    Post.find({"postName": {$regex: value, $options: 'i'}}).populate("postImg").populate("topicSquareImg")
        .exec()
        .then(post => {
            if(post.length === 0){
                const result = type === "Match" ? [] : [{added: true}]
                res.send(result)
            } else {
                res.send(post)
            }
        })
        .catch(err => {
            console.log(err)
            res.send([])
        })
})


export default router