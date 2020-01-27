import axios from "axios";
import { USER_IS_LOGGEDIN,
         STAR_ON, STAR_OFF,
         ON_SEARCH,
         OFF_SEARCH, 
         SET_CATEGORY, 
         RESET_CATEGORY,
         NUDGE_ADD,
         NUDGE_CHECK,
         SEARCH_TERM } from "./types";

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

export const onSearch = () => async (dispatch) => {
    dispatch({type: ON_SEARCH})
}

export const offSearch = () => async (dispatch) => {
    dispatch({type: OFF_SEARCH})
}

export const resetCategory = () => async (dispatch) => {
    dispatch({type: RESET_CATEGORY})
}

export const setCategory = (id) => async (dispatch) => {
    dispatch({type: SET_CATEGORY, payload: id})
}

export const nudgeAdd = (id) => async (dispatch) => {
    dispatch({type: NUDGE_ADD, payload: id})
}

export const nudgeCheck = (id) => async (dispatch) => {
    dispatch({type: NUDGE_CHECK, payload: id})
}

export const searchTerm = (term) => async (dispatch) => {
    const url = "/api/search/" + String(term)
    const res = await axios.get(url)
    dispatch({type: SEARCH_TERM, payload: res.data})
}