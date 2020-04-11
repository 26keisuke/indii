import express from "express"

import keys from "../config/keys"

import User from "../models/User"
import Topic from "../models/Topic"
import Post from "../models/Post"

const router = express.Router()


// topic/1とかのrouteを後でやる



// For more info: https://github.com/marmelab/react-admin/tree/master/packages/ra-data-simple-rest
router.get("/:key/users", (req, res) => {
    if(isValidAdminKey(req.params.keys)){
        const projection = {
            $project: {
                _id: 0,
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

        const [query, first, last] = parseOptions(req.query, projection)

        wrapHeader(res, User, "users", query, first, last)
    }
})

router.get("/:key/posts", (req, res) => {
    if(isValidAdminKey(req.params.keys)){
        const projection = {
            $project: {
                _id: 0,
                postId: "$_id",
                topicName: 1,
                index: 1,
                tags: 1,
                lastEdited: 1,
                feedback: 1,
                rating: 1,
                star: "$star.counter",
                config: 1,
            }
        }

        const [query, first, last] = parseOptions(req.query, projection)

        wrapHeader(res, Post, "posts", query, first, last)
    }
})

router.get("/:key/topics", (req, res) => {
    if(isValidAdminKey(req.params.keys)){
        const projection = {
            $project: {
                _id: 0,
                topicId: "$_id",
                creator: 1,
                topicName: 1,
                tags: 1,
                likes: "$likes.counter",
                postCount: 1,
            }
        }

        const [query, first, last] = parseOptions(req.query, projection)

        wrapHeader(res, Topic, "topics", query, first, last)
    }
})

function wrapHeader(res, schema, name, query, first, last) {
    schema.aggregate(query)
    .then(objs => {
        if(!objs[0].id) { // もしid fieldがない場合
            objs = objs.map((obj, index) => {
                obj.id = index
                return obj
            })
        }
        res.header("Access-Control-Expose-Headers", "Content-Range")
        res.header("Content-Range", `${name} ${first}-${last}/${objs.length}`)
        res.send(objs)
    })
    .catch(err => console.log(err))
}

function parseOptions(query, projection) {

    var q = [];

    const filter = JSON.parse(query.filter)
    const sort = JSON.parse(query.sort)
    const range = JSON.parse(query.range)

    const filterKey = Object.keys(filter)[0]
    const filterValue = Object.values(filter)[0]

    if(filterKey && filterValue) { q.push({$match: {[filterKey]: filterValue}}) }

    if(projection) { q.push(projection) }

    const sortKey = sort[0]
    const sortValue = sort[1]

    q.push({$sort: {[sortKey]: sortValue === "ASC" ? -1 : 1}})

    const firstIdx = parseInt(range[0])
    const lastIdx = parseInt(range[1])

    q = q.concat([{$skip: firstIdx}, {$limit: lastIdx-firstIdx}])

    return [q, firstIdx, lastIdx]
}

function isValidAdminKey(key) {
    if(key === keys.ADMIN_KEY) {
        return false
    }
    return true
}

export default router
