import axios from "axios";
import { USER_IS_LOGGEDIN,
         STAR_ON, STAR_OFF,
         ON_SEARCH,
         OFF_SEARCH, 
         SET_CATEGORY, 
         RESET_CATEGORY,
         NUDGE_ADD,
         NUDGE_CHECK,
         SEARCH_TERM,
         IS_FETCHING,
         END_FETCHING,
         ENABLE_GRAY,
         DISABLE_GRAY,
         UPDATE_MESSAGE,
         RESET_MESSAGE,
         SHOW_CONFIRMATION,
         HIDE_CONFIRMATION,
         ADD_COLUMN,
         SHOW_LOGIN, HIDE_LOGIN,
         SEARCH_POST, SEARCH_TOPIC,
         FETCH_DRAFT,
         DRAFT_UPDATED, DRAFT_READ, 
         FETCH_TOPIC, FETCH_POST} from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get("/api/current_user");
    dispatch({type: USER_IS_LOGGEDIN, payload: res.data});
};

export const starOn = (id) => async (dispatch) => {
    const res = await axios.post("/api/star_on", id)
    dispatch({type: STAR_ON, payload: res.data})
}

export const starOff = (id) => async (dispatch) => {
    const res = await axios.post("/api/star_off", id)
    dispatch({type: STAR_OFF, payload: res.data})
}

export const onSearch = () => (dispatch) => {
    dispatch({type: ON_SEARCH})
}

export const offSearch = () => (dispatch) => {
    dispatch({type: OFF_SEARCH})
}

export const resetCategory = () => (dispatch) => {
    dispatch({type: RESET_CATEGORY})
}

export const setCategory = (id) => (dispatch) => {
    dispatch({type: SET_CATEGORY, payload: id})
}

export const nudgeAdd = (id) => (dispatch) => {
    dispatch({type: NUDGE_ADD, payload: id})
}

export const nudgeCheck = (id) => (dispatch) => {
    dispatch({type: NUDGE_CHECK, payload: id})
}

export const searchTerm = (term) => async (dispatch) => {
    const url = "/api/search/" + String(term)
    const res = await axios.get(url)
    dispatch({type: SEARCH_TERM, payload: res.data})
}

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

export const updateMessage = (type, message) => (dispatch) => {
    dispatch({type: UPDATE_MESSAGE, payload: {type: type, message: message}})
}

export const resetMessage = () => (dispatch) => {
    dispatch({type: RESET_MESSAGE})
}

export const showConfirmation = (id, action, title, caution, message, buttonMessage, next) => (dispatch) => {
    dispatch({type: SHOW_CONFIRMATION, payload: {
                                                id: id,
                                                action: action,
                                                title: title,
                                                caution: caution,
                                                message: message, 
                                                buttonMessage: buttonMessage,
                                                next: next}})
}

export const hideConfirmation = () => (dispatch) => {
    dispatch({type: HIDE_CONFIRMATION})
}

export const addColumn = (id, name) => (dispatch) => {
    dispatch({type: ADD_COLUMN, payload: {id: id, name: name}})
}

export const showLogin = () => (dispatch) => {
    dispatch({type: SHOW_LOGIN})
}

export const hideLogin = () => (dispatch) => {
    dispatch({type: HIDE_LOGIN})
}

let token;

export const searchTopic = (type, value) => async (dispatch) => {
    const url = "/api/topic/search/" + String(type) + "/" + String(value)
    const res = await cancelOnMultipleSearch(url)
    dispatch({type: SEARCH_TOPIC, payload: {suggestions: res}})
} 

export const searchPost = (type, value) => async (dispatch) => {
    const url = "/api/post/search/" + String(type) + "/" + String(value)
    const res = await cancelOnMultipleSearch(url)
    dispatch({type: SEARCH_POST, payload: {suggestions: res}})
}

export const fetchDraft = () => async (dispatch) => {
    dispatch({type: IS_FETCHING})
    const url = "/api/draft"
    const res = await axios.get(url)
    dispatch({type: FETCH_DRAFT, payload: res.data})
    dispatch({type: END_FETCHING})
}

export const draftUpdated = () => (dispatch) => {
    dispatch({type: DRAFT_UPDATED})
}

export const draftRead = () => (dispatch) => {
    dispatch({type: DRAFT_READ})
}

export const fetchTopic = (id) => async (dispatch) => {
    const url = "/api/topic/" + String(id)
    const res = await axios.get(url)
    dispatch({type: FETCH_TOPIC, payload: res.data})
}

export const fetchPost = (id) => async (dispatch) => {
    const res = await axios.get(`/api/post/${String(id)}`)
    dispatch({type: FETCH_POST, payload: res.data})
}

// ===== UTIL =====

const cancelOnMultipleSearch = async (url) => {
    if(token) {
        token.cancel()
    }
    token = axios.CancelToken.source()
    try {
        const res = await axios.get(url, {cancelToken: token.token})
        const result = res.data
        return result
    } catch(error) {
        //　ここの二つは本来はキャンセルしたいところ。（今の状態では、reducerに送られている）
        if(axios.isCancel(error)) {
            console.log("Search request has been cancelled.")
            return []
        } else {
            console.log("Something went wrong with searching.")
            return []
        }
    }
}