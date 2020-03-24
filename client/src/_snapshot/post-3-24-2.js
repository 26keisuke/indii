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
    UPDATE_POST_EMOJI, UPDATE_POST_STAR,
} from "../types/types";

import { cancelOnMultipleSearch } from "../util"

export const setPostStar = (starArr) => dispatch => {
    dispatch({ type: SET_POST_STAR, payload: starArr })
}

export const setPostEmoji = (emojiArr) => dispatch => {
    dispatch({ type: SET_POST_EMOJI, payload: emojiArr })
}

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

// diff => array
export const saveAsync = (type, diff, idLookUp) => async (dispatch) => {
    var subject;
    var requests = [];
    var oneRequest;

    var result;

    const { removed, added } = diff
    const { baseUrl, dispatchType } = getType(type)
    console.log("CALLED")
    if(removed){
        for(var i=0; i < removed.length; i++){
            // subject = removed[i]
            // oneRequest = axios.post(baseUrl(subject[idLookUp]) + "/removed", {subject})
            // requests.push(oneRequest)
            subject = removed[i]
            
            result = await axios.post(baseUrl(subject[idLookUp]) + "/removed", {subject})
        }
    }

    if(added){
        for(var i=0; i < added.length; i++){
            // subject = added[i]
            // oneRequest = axios.post(baseUrl(subject[idLookUp]) + "/added", {subject})
            // requests.push(oneRequest)

            subject = added[i]

            result = await axios.post(baseUrl(subject[idLookUp]) + "/added", {subject})
        }
    }

    dispatch({ type: dispatchType, payload: result.data})

    // Promise.all(requests)
    // .then(res => {
    //     console.log(res)
    //     dispatch({ type: dispatchType, payload: res[0].data })
    // })
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
        default:
            return
    }
}
