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
         SHOW_LOGIN, HIDE_LOGIN,} from "./types";

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