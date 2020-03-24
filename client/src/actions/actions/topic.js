import axios from "axios"

import { 
    SEARCH_FETCHING,
    SEARCH_TOPIC,
    FETCH_TOPIC,
    ADD_COLUMN, REVERT_COLUMN, DELETE_COLUMN,
    REVERT_IMG,
    SET_TOPIC_LIKE
} from "../types/types";

import { cancelOnMultipleSearch } from "../util"

export const setTopicLike = (topicLikeArr) => dispatch => {
    dispatch({ type: SET_TOPIC_LIKE, payload: topicLikeArr })
}

export const fetchTopic = (id, type) => async (dispatch) => {
    if(!id) { dispatch({type: FETCH_TOPIC, payload: {}}); return;}

    const url = "/api/topic/" + String(id) + "/" + String(type)
    const res = await axios.get(url)
    dispatch({type: FETCH_TOPIC, payload: res.data})
}

export const searchTopic = (type, value) => async (dispatch) => {
    if(type === "RESET") { dispatch({type: SEARCH_TOPIC, payload: {suggestions: []}}); return; }
    if(!value) { dispatch({type: SEARCH_TOPIC, payload: {suggestions: []}}); return; }
    
    const url = "/api/topic/search/" + String(type) + "/" + String(value)
    const res = await cancelOnMultipleSearch(url)
    if(!!res){
        dispatch({type: SEARCH_FETCHING, payload: {type: "ACTION", onSearch: false}})
        dispatch({type: SEARCH_TOPIC, payload: {suggestions: res}})
    }
} 

export const revertImg = (revert) => (dispatch) => {
    dispatch({type: REVERT_IMG, payload: {revert}})
}

export const revertColumn = (trigger) => (dispatch) => {
    dispatch({type: REVERT_COLUMN, payload: {trigger}})
}

export const addColumn = (name) => (dispatch) => {
    dispatch({type: ADD_COLUMN, payload: {name}})
}

export const deleteColumn = (id) => (dispatch) => {
    dispatch({type: DELETE_COLUMN, payload: {id}})
}