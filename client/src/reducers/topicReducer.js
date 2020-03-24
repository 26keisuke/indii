import {
    SEARCH_TOPIC, 
    FETCH_TOPIC,
    SET_TOPIC_LIKE,
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
        case FETCH_TOPIC:
            return {
                ...state,
                fetched: action.payload
            }
        default:
            return state
    }
}