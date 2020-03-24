import {
    SEARCH_POST,
    FETCH_POST,
    SET_POST_EMOJI, SET_POST_STAR,
} from "../actions/types/types"

import update from "immutability-helper"

export default function postReducer(state={
    search: [],
    fetched: {},
    postStar: [],
    postEmoji: [],
}, action) {

    var newObj;

    switch(action.type) {
        case SET_POST_STAR:
            newObj = update(state, {postStar: {$set: action.payload}})
            return newObj
        case SET_POST_EMOJI:
            newObj = update(state, {postEmoji: {$set: action.payload}})
            return newObj
        case SEARCH_POST:
            return {
                ...state,
                search: action.payload.suggestions
            }
        case FETCH_POST:
            return {
                ...state,
                fetched: action.payload
            }
        default:
            return state
    }
}
