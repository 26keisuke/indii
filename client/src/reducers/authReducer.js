import {
    FETCH_USER, FETCH_NOTIF, FETCH_CONFIRM,
    SHOW_LOGIN, HIDE_LOGIN, LOG_IN_ERROR,
    FETCH_AFTER_TOPIC_LIKE,
    UPDATE_POST_EMOJI, UPDATE_POST_STAR, UPDATE_TOPIC_LIKE, UPDATE_USER_FOLLOW,
    SET_USER_FOLLOW,
} from "../actions/types/types"

import update from "immutability-helper"
import { findArrObjIndex } from "./util"

export default function authReducer(state={

    showForm: false,
    loggedIn: false,
    logInError: null,
    info: {
        notif: [],
        nounce: "",
    },
    follows: [] // updateのためのtemporary storage

}, action) {
    
    var newObj;

    switch(action.type) {
        case SET_USER_FOLLOW:
            newObj = update(state, {follows: {$set: action.payload}})
            return newObj
        case UPDATE_USER_FOLLOW:
            newObj = update(state, {info: {follows: {$set: action.payload}}})
            return newObj
        case UPDATE_TOPIC_LIKE:
            newObj = update(state, {info: {likedTopic: {$set: action.payload}}})
            return newObj
        case UPDATE_POST_STAR:
            newObj = update(state, {info: {likedPost: {$set: action.payload}}})
            return newObj
        case UPDATE_POST_EMOJI:
            newObj = update(state, {info: {postRating: {$set: action.payload}}})
            return newObj
        case FETCH_USER:
            if(action.payload) {
                return {
                    ...state,
                    loggedIn: true,
                    info: action.payload,
                }
            }
            return state;
        case FETCH_NOTIF:
            newObj = update(state, {info: {notif: {$set: action.payload}}})
            
            return newObj
        case FETCH_CONFIRM:
            const indexOfId = findArrObjIndex(state.info.notif, "_id", action.payload.data._id)

            newObj = update(state, {info: {notif: {[indexOfId]: {$merge: action.payload.data}}}})
            newObj = update(newObj, {info: {nounce: {$set: action.payload.nounce}}})

            return newObj
        case FETCH_AFTER_TOPIC_LIKE:
            newObj = update(state, {info: {likedTopic: {$set: action.payload}}})
            return newObj
        case SHOW_LOGIN:
            return {
                ...state,
                showForm: true,
            }
        case HIDE_LOGIN:
            return {
                ...state,
                showForm: false,
            }
        case LOG_IN_ERROR:
            return {
                ...state,
                logInError: action.payload.error,
            }
        default:
            return state;
    }
}