import axios from "axios";

import { 
    isFetching,
    endFetching,
    disableGray,
    updateMessage,
} from "./update"

import { 
    SEARCH_FETCHING,
    SEARCH_TERM,
    FETCH_FEED,
} from "../types/types";


export const searchFetching = (type, onSearch) => (dispatch) => {
    dispatch({type: SEARCH_FETCHING, payload: {type, onSearch}})
}

export const searchTerm = (term) => async (dispatch) => {
    const url = "/api/feed/search/" + String(term)
    const res = await axios.get(url)
    dispatch({type: SEARCH_TERM, payload: res.data})
}

export const fetchFeed = () =>  async (dispatch) => {
    const res = await axios.get("api/feed")
    dispatch({type: FETCH_FEED, payload: res.data})
}

export const sendFeedBack = (id, problems) => async (dispatch) => {
    dispatch(isFetching())
    const url = "/api/feed/feedback"
    axios.post(url, {id, problems})
        .then(()=> {
            dispatch(endFetching())
            dispatch(disableGray())
            dispatch(updateMessage("success", "フィードバックを受け取りました。"))
            return
        })
        .catch((err) => {
            console.error(err)
            return
        })
}