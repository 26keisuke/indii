import axios from "axios"

import { 
    disableGray,
    endFetching,
    isFetching,
    updateMessage,
} from "./update"

import { 
    SEARCH_FETCHING,
    SEARCH_POST, 
    FETCH_POST,
} from "../types/types";

import { cancelOnMultipleSearch } from "../util"

export const fetchPost = (id) => async (dispatch) => {
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

export const deletePost = (id) => async (dispatch) => {
    dispatch(isFetching())
    const url = "/api/post/delete";
    axios.post(url, {id})
        .then(()=> {
            dispatch(endFetching())
            dispatch(disableGray())
            dispatch(updateMessage("success", "ポストを削除しました"))
            return
        })
        .catch((err) => {
            console.error(err)
            return
        })   
}