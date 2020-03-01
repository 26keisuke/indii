import {
    SET_CATEGORY, 
    RESET_CATEGORY,
    NUDGE_ADD,
    NUDGE_CHECK,
} from "../types/types";

export const setCategory = (id) => (dispatch) => {
    dispatch({type: RESET_CATEGORY})
    dispatch({type: SET_CATEGORY, payload: id})
}

export const nudgeAdd = (id) => (dispatch) => {
    dispatch({type: NUDGE_ADD, payload: id})
}

export const nudgeCheck = (id) => (dispatch) => {
    dispatch({type: NUDGE_CHECK, payload: id})
}