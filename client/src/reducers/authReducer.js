import {
    FETCH_USER, FETCH_NOTIF, FETCH_CONFIRM,
    SHOW_LOGIN, HIDE_LOGIN, LOG_IN_ERROR,
} from "../actions/types/types"

import update from "immutability-helper"

export default function authReducer(state={

    showForm: false,
    loggedIn: false,
    logInError: null,
    info: {
        notif: [],
        nounce: "",
    }

}, action) {
    
    var newObj;

    switch(action.type) {
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

            // if(indexOfId !== undefined){
                newObj = update(state, {info: {notif: {[indexOfId]: {$merge: action.payload.data}}}})
            // } else {
            //     newObj = update(state, {info: {notif: {$push: action.payload.data}}})
            // }

            newObj = update(newObj, {info: {nounce: {$set: action.payload.nounce}}})

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

function findArrObjIndex(arr, lookUp, value){
    for(var i=0; i < arr.length; i++){
        if(arr[i][lookUp] === value){
            return i
        }
    }
}