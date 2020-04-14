import axios from "axios";

import { 
    beginAction,
    endAction,
    updateMessage,
} from "./update"

import { 
    SEARCH_FETCHING,
    SEARCH_TERM,
    FETCH_FEED, FETCH_RECOMMEND, FETCH_NEW_TOPIC, FETCH_FEED_USER, FETCH_CATEGORY,
    SEARCH_FEED,
    RESTORE_SCROLL,
    SET_PAGE, SET_TOPIC_PAGE,
    RENDER_FEED, RENDER_NEW_TOPIC,
    LAST_FEED,
} from "../types/types";

import { cancelOnMultipleSearch } from "../util"

export const renderNewTopic = (topics) => dispatch => {
    dispatch({ type: RENDER_NEW_TOPIC, payload: {topics}})
}

export const renderFeed = (feed) => dispatch => {
    dispatch({ type: RENDER_FEED, payload: {feed}})
}

export const setTopicPage = (page) => dispatch => {
    dispatch({ type: SET_TOPIC_PAGE, payload: {page}})
}

export const setPage = (page) => dispatch => {
    dispatch({ type: SET_PAGE, payload: {page}})
}

export const restoreScroll = (scroll) => dispatch => {
    dispatch({ type: RESTORE_SCROLL, payload: {scroll}})
}

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

export const fetchCategory = () => async (dispatch) => {
    const res = await axios.get(`/api/feed/category`)
    dispatch({type: FETCH_CATEGORY, payload: res.data})
}

export const fetchFeed = (page) =>  async (dispatch) => {
    const res = await axios.get(`/api/feed/post/${page}`)
    if(!res.data.length) { dispatch({type: LAST_FEED}) }
    dispatch({type: FETCH_FEED, payload: res.data})
}

export const fetchRecommend = () => async (dispatch) => {
    const res = await axios.get("/api/feed/recommend")
    dispatch({type: FETCH_RECOMMEND, payload: res.data})
}

export const fetchNewTopic = (page) => async (dispatch) => {
    const res = await axios.get(`/api/feed/topic/${page}`)
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