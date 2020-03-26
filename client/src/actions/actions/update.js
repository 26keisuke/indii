import axios from "axios"

import {
    IS_FETCHING, END_FETCHING,
    ENABLE_GRAY, DISABLE_GRAY, 
    UPDATE_MESSAGE, RESET_MESSAGE, HIDE_MESSAGE,
    SHOW_CONFIRMATION, HIDE_CONFIRMATION, RESET_CONFIRMATION, CHANGE_CONFIRMATION,
    UPDATE_POST_EMOJI, UPDATE_POST_STAR, UPDATE_TOPIC_LIKE,
} from "../types/types"

export const isFetching = () => (dispatch) => {
    dispatch({type: IS_FETCHING})
}

export const endFetching = () => (dispatch) => {
    dispatch({type: END_FETCHING})
}

export const enableGray = () => (dispatch) => {
    dispatch({type: ENABLE_GRAY})
}

export const disableGray = () => (dispatch) => {
    dispatch({type: DISABLE_GRAY})
}

// Action

export const beginAction = () => (dispatch) => {
    dispatch({type: ENABLE_GRAY})
    dispatch({type: IS_FETCHING})
}

export const endAction = () => (dispatch) => {
    dispatch({type: DISABLE_GRAY})
    dispatch({type: END_FETCHING})
}

// Message

export const updateMessage = (type, message, duration) => (dispatch) => {
    dispatch({type: UPDATE_MESSAGE, payload: {type: type, message: message}})
    setTimeout(() => dispatch({type: HIDE_MESSAGE}), duration || 3000)
}

export const resetMessage = () => (dispatch) => {
    dispatch({type: RESET_MESSAGE})
}


// Confirmation

export const showConfirmation = (id, action, title, caution, message, buttonMessage, next, value) => (dispatch) => {
    dispatch({type: SHOW_CONFIRMATION, payload: { id, action, title, caution, message, buttonMessage, next, value }})
}

export const hideConfirmation = () => (dispatch) => {
    dispatch({type: HIDE_CONFIRMATION})
}

export const resetConfirmation = () => (dispatch) => {
    dispatch({type: RESET_CONFIRMATION})
}

export const updateConfirmation = (obj) => (dispatch) => {
    dispatch({type: CHANGE_CONFIRMATION, payload: obj})
}


// Async Save
// diff => array
export const saveAsync = (type, diff, idLookUp) => async (dispatch) => {
    var subject;
    var result;

    const { removed, added } = diff
    const { baseUrl, dispatchType } = getType(type)

    if(removed){
        for(let i=0; i < removed.length; i++){
            subject = removed[i]
            result = await axios.post(baseUrl(subject[idLookUp]) + "/removed", {subject})
        }
    }

    if(added){
        for(let i=0; i < added.length; i++){
            subject = added[i]
            result = await axios.post(baseUrl(subject[idLookUp]) + "/added", {subject})
        }
    }

    dispatch({ type: dispatchType, payload: result.data})
}

function getType(type) {
    switch(type){
        case "POST_STAR":
            return {
                baseUrl: (id) => `/api/post/${id}/star`,
                dispatchType: UPDATE_POST_STAR
            }
        case "POST_EMOJI":
            return {
                baseUrl: (id) => `/api/post/${id}/emoji`,
                dispatchType: UPDATE_POST_EMOJI
            }
        case "TOPIC_LIKE":
            return {
                baseUrl: (id) => `/api/topic/${id}/like`,
                dispatchType: UPDATE_TOPIC_LIKE
            }
        default:
            return
    }
}
