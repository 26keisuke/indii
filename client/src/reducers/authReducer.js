import {
    FETCH_USER,
    SHOW_LOGIN, HIDE_LOGIN, LOG_IN_ERROR,
} from "../actions/types/types"

export default function authReducer(state={

    showForm: false,
    loggedIn: false,
    logInError: null,
    info: {}

}, action) {
    switch(action.type) {
        case FETCH_USER:
            if(action.payload) {
                return {
                    ...state,
                    loggedIn: true,
                    info: action.payload,
                }
            }
            return state;
        case SHOW_LOGIN:
            return {
                ...state,
                showForm: true,
            }
        case HIDE_LOGIN:
            return {
                ...state,
                showForm: false,
            }
        case LOG_IN_ERROR:
            return {
                ...state,
                logInError: action.payload.error,
            }
        default:
            return state;
    }
}