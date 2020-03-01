import update from 'immutability-helper';

import {
    IS_FETCHING, END_FETCHING,
    ENABLE_GRAY, DISABLE_GRAY, 
    UPDATE_MESSAGE, RESET_MESSAGE, HIDE_MESSAGE,
    SHOW_CONFIRMATION, HIDE_CONFIRMATION, RESET_CONFIRMATION
} from "../actions/types/types"

export default function updateReducer(state={

    fetching: false,
    grayBackground: false,
    updateMessage: {
        on: false,
        type: "",
        message: "",
    },
    confirmation: {

        // 最初にロードする時に必要な値
        on: false,
        id: "",
        action: "",
        title: "",
        message: "",
        buttonMessage: "",
        next: "",

        // Edit時に派生するState
        tranparent: false,
        draftId: {},
        index: {},
    },

}, action){
    switch(action.type){
        case IS_FETCHING:
            return {
                ...state,
                fetching: true,
            }
        case END_FETCHING:
            return {
                ...state,
                fetching: false,
            }
        case ENABLE_GRAY:
            return {
                ...state,
                grayBackground: true,
            }
        case DISABLE_GRAY:
            return {
                ...state,
                grayBackground: false
            }
        case UPDATE_MESSAGE:
            return {
                ...state,
                updateMessage: {
                    ...state.updateMessage,
                    on: true,
                    type: action.payload.type,
                    message: action.payload.message
                }
            }

        case HIDE_MESSAGE:
            return {
                ...state,
                updateMessage: {
                    ...state.updateMessage,
                    on: false,
                }
            }
        case RESET_MESSAGE:
            return {
                ...state,
                updateMessage: {
                    ...state.updateMessage,
                    type: "",
                    message: ""
                }
            }
        case SHOW_CONFIRMATION:
            return {
                ...state,
                confirmation: {
                    ...state.confirmation,
                    on: true,
                    id: action.payload.id,
                    action: action.payload.action,
                    title: action.payload.title,
                    caution: action.payload.caution,
                    message: action.payload.message,
                    buttonMessage: action.payload.buttonMessage,
                    next: action.payload.next,
                    value: action.payload.value,
                }
            }
        case HIDE_CONFIRMATION:
            return {
                ...state,
                confirmation: {
                    ...state.confirmation,
                    on: false,
                }
            }
        case RESET_CONFIRMATION:
            return {
                ...state,
                confirmation: {
                    ...state.confirmation,
                    id: "",
                    action: "",
                    title: "",
                    caution: "",
                    message: "",
                    buttonMessage: "",
                    next: "",
                    value: "",
                }
            }
        case CHANGE_CONFIRMATION: // action.payload => {name: value, name: value,...}
            const newObj = update(state, {$merge: action.payload})
            return newObj
        default:
            return state
    }
}