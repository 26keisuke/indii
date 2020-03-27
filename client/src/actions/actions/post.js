import axios from "axios"

import { 
    beginAction,
    endAction,
    updateMessage,
} from "./update"

import { 
    SEARCH_FETCHING,
    SEARCH_POST, 
    FETCH_POST,
    SET_POST_STAR, SET_POST_EMOJI,
} from "../types/types";

import { cancelOnMultipleSearch } from "../util"

export const setPostStar = (starArr) => dispatch => {
    dispatch({ type: SET_POST_STAR, payload: starArr })
}

export const setPostEmoji = (emojiArr) => dispatch => {
    dispatch({ type: SET_POST_EMOJI, payload: emojiArr })
}

export const fetchPost = (id) => async (dispatch) => {
    if(!id) { dispatch({type: FETCH_POST, payload: {}}); return }
    const res = await axios.get(`/api/post/${id}`)
    dispatch({type: FETCH_POST, payload: res.data})
}

export const searchPost = (type, value, topicId) => async (dispatch) => {
    if(type === "RESET") { dispatch({type: SEARCH_POST, payload: {suggestions: []}}); return }
    if(!value) { dispatch({type: SEARCH_POST, payload: {suggestions: []}}); return }

    var url = "/api/post/search/" + String(type) + "/" + String(value)
    if(topicId){
        url = url + "/" + String(topicId)
    }
    const res = await cancelOnMultipleSearch(url)
    if(!!res){
        dispatch({type: SEARCH_FETCHING, payload: {type: "ACTION", onSearch: false}})
        dispatch({type: SEARCH_POST, payload: {suggestions: res}})
    }
}

export const deletePost = (id) => (dispatch) => {
    dispatch(beginAction())
    const url = "/api/post/delete";
    axios.post(url, {id})
        .then(()=> {
            dispatch(endAction())
            dispatch(updateMessage("success", "ポストを削除しました"))
            return
        })
        .catch((err) => {
            console.error(err)
            return
        })   
}
