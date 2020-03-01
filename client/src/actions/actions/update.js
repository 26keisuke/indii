import {
    IS_FETCHING, END_FETCHING,
    ENABLE_GRAY, DISABLE_GRAY, 
    UPDATE_MESSAGE, RESET_MESSAGE, HIDE_MESSAGE,
    SHOW_CONFIRMATION, HIDE_CONFIRMATION, RESET_CONFIRMATION
} from "../types/types"

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

export const updateMessage = (type, message, duration) => (dispatch) => {
    dispatch({type: UPDATE_MESSAGE, payload: {type: type, message: message}})
    setTimeout(() => dispatch({type: HIDE_MESSAGE}), duration || 3000)
}

export const resetMessage = () => (dispatch) => {
    dispatch({type: RESET_MESSAGE})
}

export const showConfirmation = (id, action, title, caution, message, buttonMessage, next, value) => (dispatch) => {
    dispatch({type: SHOW_CONFIRMATION, payload: { id, action, title, caution, message, buttonMessage, next, value }})
}

export const hideConfirmation = () => (dispatch) => {
    dispatch({type: HIDE_CONFIRMATION})
}

export const resetConfirmation = () => (dispatch) => {
    dispatch({type: RESET_CONFIRMATION})
}