import {
    SEARCH_TOPIC, 
    FETCH_TOPIC,
    SET_TOPIC_LIKE,
    FETCH_ACTIVITY,
} from "../actions/types/types"

import update from "immutability-helper"

export default function topicReducer(state={
    search: [],
    fetched: {},
    topicLike: [],
}, action) {

    var newObj;

    switch(action.type) {
        case SET_TOPIC_LIKE:
            newObj = update(state, {topicLike: {$set: action.payload}})
            return newObj
        case SEARCH_TOPIC:
            return {
                ...state,
                search: action.payload.suggestions
            }
        case FETCH_ACTIVITY:
            const posts = JSON.parse(JSON.stringify(state.fetched.posts))
            const activity = JSON.parse(JSON.stringify(state.fetched.activity))

            const newPosts = posts.map((post, index) => {
                post.creator = action.payload[1][index]?.creator
                return post
            })
            newObj = update(state, {fetched: {posts: {$set: newPosts}}})

            const newActivity = activity.map((act, index) => {
                act.user = action.payload[0][index].activityUser
                return act
            })
            newObj = update(newObj, {fetched: {activity: {$set: newActivity}}})

            return newObj
        case FETCH_TOPIC:
            return {
                ...state,
                fetched: action.payload
            }
        default:
            return state
    }
}