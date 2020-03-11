import {
    RESET_CATEGORY, SET_CATEGORY,
    NUDGE_ADD, NUDGE_CHECK,
} from "../actions/types/types"

export default function categoryReducer(state={
    home: {
        selected: false,
        nudge: false,
    },
    draft: {
        selected: false,
        nudge: false,
    },
    talk: {
        selected: false,
        nudge: false,
    },
    action: {
        selected: false,
        nudge: false,
    },
    notification: {
        selected: false,
        nudge: false,
    },
    setting: {
        selected: false,
        nudge: false,
    },
}, action) {
    switch(action.type) {
        case NUDGE_ADD:
            return {
                ...state,
                [action.payload]: { ...state[action.payload], nudge: true }
            }
        case NUDGE_CHECK:
            return {
                ...state,
                [action.payload]: { ...state[action.payload], nudge: false }
            }
        case RESET_CATEGORY:
            return{
                home: { ...state[action.payload], selected: false },
                draft: { ...state[action.payload], selected: false },
                talk: { ...state[action.payload], selected: false },
                action: { ...state[action.payload], selected: false },
                notification: { ...state[action.payload], selected: false },
                setting: { ...state[action.payload], selected: false },
            }
        case SET_CATEGORY:
            return {
                ...state,
                [action.payload]: { ...state[action.payload], selected: true }
            }
        default:
            return state
    }
}