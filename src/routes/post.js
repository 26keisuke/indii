import express from "express"

import User from "../models/User"
import Topic from "../models/Topic"
import Post from "../models/Post"
import Draft from "../models/Draft"

import { isLoggedIn } from "./util/util"

const router = express.Router()

router.get("/:postId/:type", (req, res) => {
    switch(req.params.type){
        case "MOBILE":
            Post.findById(req.params.postId)
                .lean()
                .populate({path: "topic", populate: [{ path: "squareImg" }, { path: "mobileImg" }, { path: "posts" }]}) // need to optimize
                .populate("creator")
                .exec()
                .then(post => {
                    res.send(post)
                })
                .catch(err => {
                    console.log(err)
                })
            return
        case "DABLET":
            Post.findById(req.params.postId)
                .lean()
                .populate({path: "topic", populate: [{ path: "rectangleImg" }, { path: "squareImg" }, { path: "posts" }]}) // need to optimize
                .populate("creator")
                .exec()
                .then(post => {
                    res.send(post)
                })
                .catch(err => {
                    console.log(err)
                })
            return
        default:
            Post.findById(req.params.postId).lean()
                .then(post => res.send(post))
                .catch(err => console.log(err))
    }
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
            tags: post.tags,
            editPostImg: post.postImg,
            editContent: post.content,
            editPostName: post.postName,
            editPostId: post._id,
            editCreator: post.creator,
            editCreationDate: post.creationDate,
            editRef: post.ref,
            editLastEdited: (type !== "New") && lastContribution && lastContribution.timeStamp,
            editLastEditedAuthor: (type !== "New") && lastContribution && lastContribution.user,
            editIndex: post.index,
            editTags: post.tags,
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


router.post("/:postId/star/removed", isLoggedIn, (req, res) => {
    Post.findById(req.params.postId)
    .then(post => {

        post.star.action.map((elem, index) => {
            if(String(elem.user) === String(req.user.id)) {
                post.star.action.splice(index, 1)
                post.star.counter--
            }
        })
        
        User.findById(post.creator)
        .then(user => {
            user.notif.map((elem, index) => {
                if((elem.type === "POST_LIKE") && (elem.post === post._id)){
                    user.notif.splice(index, 1)
                }
            })
        })

        User.findById(req.user.id)
        .then(user => {
            user.likedPost.map((elem,index) => {
                if(String(elem.post) === String(post.id)) {
                    user.likedPost.splice(index, 1)
                }
            })

            post.save()
            user.save()

            res.send(user.likedPost)
        })
    })
    .catch(err => console.log(err))
})

router.post("/:postId/star/added", isLoggedIn, (req, res) => {

    var result;

    const { subject } = req.body
    const { timeStamp } = subject

    Post.findById(req.params.postId)
    .then(post => {
        result = post.star.action.filter(elem => String(elem.user) === String(req.user.id))

        if(!result[0]){
            post.star.counter++
            post.star.action.push({timeStamp: timeStamp, user: req.user.id})
        }

        User.findById(post.creator)
        .then(user => {
            user.notif.push({timeStamp: timeStamp, type: "POST_LIKE", user: req.user.id, post: post._id})
        })

        User.findById(req.user.id)
        .then(user => {
            result = user.likedPost.filter(elem => String(elem.post) === String(post.id))

            if(!result[0]){
                user.likedPost.push(subject)
            }

            post.save()
            user.save()

            res.send(user.likedPost)
        })
    })
    .catch(err => console.log(err))
})

router.post("/:postId/emoji/added", isLoggedIn, (req, res) => {

    var result;

    const { subject } = req.body
    const { timeStamp, rate } = subject

    Post.findById(req.params.postId)
    .then(post => {

        result = post.rating.map(elem => {
            if(String(elem.user) === String(req.user.id)) {
                elem.rate = rate
                elem.timeStamp = timeStamp
                return true
            }
        })
        
        if(!result[0]){ 
            post.rating.push({timeStamp: timeStamp, user: req.user.id, rate: rate})
        }

        // post ownerの変更
        User.findById(post.creator)
        .then(owner => {

            result = owner.notif.map(elem => {
                if(String(elem.post) === String(post.id)) {
                    elem.emoji = rate
                    elem.timeStamp = timeStamp
                    return true
                }
            })
            if(!result[0]){
                owner.notif.push({timeStamp: timeStamp, type: "POST_EMOJI", user: req.user.id, post: post._id, emoji: rate})
            }


            // req.userの変更
            User.findById(req.user.id)
            .then(user => {
                result = user.postRating.map(elem => {
                    if(String(elem.post) === String(post.id)) {
                        elem.rate = rate
                        elem.timeStamp = timeStamp
                        return true
                    }
                })
                if(!result[0]){
                    user.postRating.push(subject)
                }

                owner.save();
                post.save();
                user.save();

                res.send(user.postRating);
            })
        })
    })
    .catch(err => console.log(err))
})

router.post("/:postId/emoji/removed", isLoggedIn, (req, res) => {
    Post.findById(req.params.postId)
    .then(post => {

        // postの変更
        post.rating.map((elem, index) => {
            if(String(elem.user) === String(req.user.id)) {
                post.rating.splice(index, 1)
            }
        })

        // post ownerの変更
        User.findById(post.creator)
        .then(owner => {
            owner.notif.map((elem, index) => {
                if((elem.type === "POST_EMOJI") && (elem.post === post._id)){
                    owner.notif.splice(index, 1)
                }
            })

            // req.userの変更
            User.findById(req.user.id)
            .then(user => {
                user.postRating.map((elem,index) => {
                    if(String(elem.post) === String(post.id)) {
                        user.postRating.splice(index, 1)
                    }
                })

                owner.save();
                post.save();
                user.save();

                res.send(user.postRating);
            })

        })
    })
    .catch(err => console.log(err))
})

router.post("/delete", isLoggedIn, (req,res) => {
    console.log(`DELETING ${req.body.id}`)
    res.send("")
})

// post searchはtopicId内で検索するやり方と、postIdでpost全体から検索する方法の二種類
// Method 1
router.get("/search/:type/:term/:topicId", (req, res) => {
    const type = req.params.type
    const value = type === "MATCH" ? '^' + req.params.term : '^' + req.params.term + '$' 
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
                result = [req.params.term]
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
    const value = type === "MATCH" ? '^' + req.params.term : '^' + req.params.term + '$' 

    Post.find({"postName": {$regex: value, $options: 'i'}})
        .populate("postImg")
        .populate("topicSquareImg")
        .exec()
        .then(post => {
            if(post.length === 0){
                const result = [req.params.term]
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