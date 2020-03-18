import {
    FETCH_TALK,
    SELECT_TALK,
    CREATE_COMMENT,
    CREATE_TALK,
} from "../actions/types/types"

import update from "immutability-helper"
import { findArrObjIndex } from "./util"

export default function talkReducer(state={
    fetched: [],
    selected: {},
}, action) {

    var newObj

    switch(action.type) {
        case CREATE_TALK:
            var newArr = []
            Object.assign(newArr, state.fetched)
            newArr.splice(0,0,action.payload)
            newObj = update(state, { fetched: { $set: newArr }})
            return newObj
        case CREATE_COMMENT:
            const index = findArrObjIndex(state.fetched, "_id", action.payload._id)
            newObj = update(state, {fetched: {[index]: {$merge: action.payload}}})
            // selectedの中身もアップデート
            if(state.selected._id === action.payload._id){
                const lastIdx = action.payload.comments.length-1 
                newObj = update(newObj, {selected: {comments: {$push: [action.payload.comments[lastIdx]]}}})
            }
            return newObj
        case FETCH_TALK:
            return {
                ...state,
                fetched: action.payload
            }
        case SELECT_TALK:
            return {
                ...state,
                selected: action.payload,
            }
        default:
            return state
    }
}