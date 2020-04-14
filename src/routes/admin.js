import express from "express"
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto"

import keys from "../config/keys"

import User from "../models/User"
import Topic from "../models/Topic"
import Post from "../models/Post"

const router = express.Router()

// For more info: https://github.com/marmelab/react-admin/tree/master/packages/ra-data-simple-rest
router.post("/:key/auth/login", (req, res) => {
    if(isValidAdminKey(req.params.key)) {
        const {
            username,
            password,
        } = req.body

        User.findOne({ email: username })
        .then(user => {
            if (
                user &&
                user.role && 
                user.role !== "User"
            ) {
                bcrypt.compare(password, user.adminPassword)
                .then(result => {
                    if(result === false) {
                        res.status(401).send({error: "Username or Password did not match."})
                    } else if(result === true) {
                        res.send({token: crypto.randomBytes(16).toString("hex")})
                    }
                })
            } else {
                res.status(401).send({error: "You are not authenticated user yet."})
            }
        })
    }
})

router.put("/:key/users/:id", (req, res) => {
    if(isValidAdminKey(req.params.key)) {
        const {
            _id,
            role,
            adminPassword,
        } = req.body

        User.findById(_id)
        .then(user => {
            if(role !== user.role) {
                user.role = role
            }

            var result = new Promise((resolve, reject) => {
                if(adminPassword !== user.adminPassword) {
                    bcrypt.genSalt(10)
                    .then(salt => {
                        bcrypt.hash(adminPassword, salt)
                        .then(hash => {
                            user.adminPassword = hash
                            return resolve()                        
                        })
                    })
                } else {
                    return reject()
                }                
            })

            result.then(() => {
                console.log(user.adminPassword)
                user.save().then(user => res.send(user))
            })
        })
        .catch(err => console.log(err))
    }
})

router.get("/:key/users/:id", (req, res) => {
    if(isValidAdminKey(req.params.key)){
        const projection = {
            $project: {
                _id: 1,
                role: 1,
                adminPassword: 1,
                userId: "$_id",
                userName: 1,
                comment: 1,
                intro: 1,
                email: 1,
                verifiedDate: 1,
                isVerified: 1,
            }
        }

        const [query, first, last, includeHeader] = parseOptions(req.query, projection)

        wrapHeader(res, User, "users", query, [first, last], includeHeader)
    }
})

router.get("/:key/users", (req, res) => {
    if(isValidAdminKey(req.params.key)){
        const projection = {
            $project: {
                _id: 1,
                role: 1,
                userId: "$_id",
                userName: 1,
                comment: 1,
                intro: 1,
                posts: {$size: "$post"},
                drafts: {$size: "$draft"},
                followers: {$size: "$followers"},
                follows: {$size: "$follows"},
                email: 1,
                verifiedDate: 1,
                isVerified: 1,
            }
        }

        const [query, first, last, includeHeader] = parseOptions(req.query, projection)

        wrapHeader(res, User, "users", query, [first, last], includeHeader)
    }
})

router.get("/:key/posts", (req, res) => {
    if(isValidAdminKey(req.params.key)){
        const projection = {
            $project: {
                _id: 1,
                postId: "$_id",
                postName: 1,
                topicName: 1,
                index: 1,
                tags: 1,
                lastEdited: 1,
                feedback: 1,
                rating: 1,
                star: "$star.counter",
                allowEdit: "$config.allowEdit",
            }
        }

        const [query, first, last, includeHeader] = parseOptions(req.query, projection)

        wrapHeader(res, Post, "posts", query, [first, last], includeHeader)
    }
})

router.put("/:key/topics/:id", (req, res) => {
    if(isValidAdminKey(req.params.key)) {
        const {
            _id,
            topicName,
            category,
        } = req.body

        Topic.findById(_id)
        .then(topic => {
            if(topicName !== topic.topicName) {
                topic.topicName = topicName
            }

            if(category !== topic.category) {
                topic.category = category
            }

            topic.save()
            .then(topic => res.send(topic))
        })
        .catch(err => console.log(err))
    }
})

router.get("/:key/topics/:id", (req, res) => {
    if(isValidAdminKey(req.params.key)) {
        const projection = {
            $project: {
                _id: 1,
                topicId: "$_id",
                tags: 1,
                topicName: 1,
                category: 1,
            }
        }

        const [query, first, last, includeHeader] = parseOptions(req.query, projection)

        wrapHeader(res, Topic, "topics", query, [first, last], includeHeader)
    }
})

router.get("/:key/topics", (req, res) => {
    if(isValidAdminKey(req.params.key)){
        const projection = {
            $project: {
                _id: 1,
                topicId: "$_id",
                creator: 1,
                topicName: 1,
                tags: 1,
                likes: "$likes.counter",
                postCount: 1,
                category: 1,
            }
        }

        const [query, first, last, includeHeader] = parseOptions(req.query, projection)

        wrapHeader(res, Topic, "topics", query, [first, last], includeHeader)
    }
})

function wrapHeader(res, schema, name, query, range, includeHeader) {
    schema.aggregate(query)
    .then(objs => {
        if(!objs.length) return objs;

        if(includeHeader) {
            objs = objs.map((obj, index) => {
                obj.id = index
                return obj
            })

            res.header("Access-Control-Expose-Headers", "Content-Range")
            res.header("Content-Range", `${name} ${range[0]}-${range[1]}/${objs.length}`)
        } else {
            // これをしないとreferenceが表示されない
            objs = objs.map(obj => {
                obj.id = obj.userId
                return obj
            })
        }

        res.send(objs)
    })
    .catch(err => console.log(err))
}

function parseOptions(query, projection) {

    var q = [];

    const filter = query.filter && JSON.parse(query.filter)
    const sort = query.sort && JSON.parse(query.sort)
    const range = query.range && JSON.parse(query.range)

    var filterKey, filterValue;

    if(filter && Object.keys(filter)[0]) {
        filterKey = Object.keys(filter)[0]
        filterValue = Object.values(filter)[0]

        if(filterKey === "id") { 
            filterKey = "_id";
            filterValue = filterValue.map(val => mongoose.Types.ObjectId(val)) 
        } 

        q.push({$match: {[filterKey]: {$in: filterValue}}}) 
    }

    if(projection) { 
        q.push(projection) 
    }

    var sortKey, sortValue;

    if(sort) {
        sortKey = sort[0]
        sortValue = sort[1]

        q.push({$sort: {[sortKey]: sortValue === "ASC" ? -1 : 1}})
    }

    var firstIdx, lastIdx;

    if(range) {
        firstIdx = parseInt(range[0])
        lastIdx = parseInt(range[1])

        q = q.concat([{$skip: firstIdx}, {$limit: lastIdx-firstIdx}])
    }

    const includeHeader = !!query.filter && !!query.sort && !!query.range

    return [q, firstIdx, lastIdx, includeHeader];
}

function isValidAdminKey(key) {
    if(key === keys.ADMIN_KEY) {
        return true
    }
    return false
}

export default router
