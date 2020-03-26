import axios from "axios";

import { 
    beginAction,
    endAction,
    updateMessage,
} from "./update"

import { 
    SEARCH_FETCHING,
    SEARCH_TERM,
    FETCH_FEED,
    FETCH_RECOMMEND,
    FETCH_NEW_TOPIC,
    FETCH_FEED_USER,
    SEARCH_FEED,
} from "../types/types";

import { cancelOnMultipleSearch } from "../util"

export const searchFeed = (type, value) => async (dispatch) => {
    if(type === "RESET") { dispatch({type: SEARCH_FEED, payload: {suggestions: []}}) }
    if(!value) { dispatch({type: SEARCH_FEED, payload: {suggestions: []}}); return }
    
    const url = "/api/topic/search/" + String(type) + "/" + String(value)
    const data = await cancelOnMultipleSearch(url)
    if(!!data){
        dispatch({type: SEARCH_FEED, payload: {suggestions: data}})
    }
} 

export const searchFetching = (type, onSearch) => (dispatch) => {
    dispatch({type: SEARCH_FETCHING, payload: {type, onSearch}})
}

export const searchTerm = (term) => async (dispatch) => {
    if(!term) dispatch({type: SEARCH_TERM, payload: {term: "", posts: [], topics: []}})

    const url = "/api/feed/search/" + String(term)
    const res = await axios.get(url)
    dispatch({type: SEARCH_TERM, payload: {...res.data, term}})
}

export const fetchFeed = () =>  async (dispatch) => {
    const res = await axios.get("/api/feed")
    dispatch({type: FETCH_FEED, payload: res.data})
}

export const fetchRecommend = () => async (dispatch) => {
    const res = await axios.get("/api/feed/recommend")
    dispatch({type: FETCH_RECOMMEND, payload: res.data})
}

export const fetchNewTopic = () => async (dispatch) => {
    const res = await axios.get("/api/feed/new/topic")
    dispatch({type: FETCH_NEW_TOPIC, payload: res.data})
}

export const fetchPeople = () => async (dispatch) => {
    const res = await axios.get("/api/feed/user")
    dispatch({type: FETCH_FEED_USER, payload: res.data})
}

export const sendFeedBack = (id, problems) => async (dispatch) => {
    dispatch(beginAction())
    const url = "/api/feed/feedback"
    axios.post(url, {id, problems})
        .then(()=> {
            dispatch(endAction())
            dispatch(updateMessage("success", "フィードバックを受け取りました。"))
            return
        })
        .catch((err) => {
            console.error(err)
            return
        })
}