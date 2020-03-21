import express from "express"

import keys from "../config/keys"

import User from "../models/User"
import Topic from "../models/Topic"
import Post from "../models/Post"

const router = express.Router()

router.get("/user/:key", (req, res) => {
    if(req.params.key !== keys.SITEMAP_KEY) return

    User.find({}, "_id")
    .then(users => {
        var ls = [];
        for(var i=0; i < users.length; i++){
            ls.push(users[i]._id)
        }
        res.send(ls)
    })
    .catch(err => console.log(err))

})

router.get("/topic/:key", (req, res) => {
    if(req.params.key !== keys.SITEMAP_KEY) return

    Topic.find({}, "_id")
    .then(topics => {
        var ls = [];
        for(var i=0; i < topics.length; i++){
            ls.push(topics[i]._id)
        }
        res.send(ls)
    })
    .catch(err => console.log(err))
})

router.get("/post/:key", (req, res) => {
    if(req.params.key !== keys.SITEMAP_KEY) return
    
    Post.find({}, "_id")
    .then(posts => {
        var ls = [];
        for(var i=0; i < posts.length; i++){
            ls.push(posts[i]._id)
        }
        res.send(ls)
    })
    .catch(err => console.log(err))
})

export default router
