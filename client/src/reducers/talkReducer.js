import {
    FETCH_TALK,
    SELECT_TALK,
} from "../actions/types/types"

export default function talkReducer(state={
    fetched: [],
    selected: {},
}, action) {
    switch(action.type) {
        case FETCH_TALK:
            return {
                ...state,
                fetched: action.payload
            }
        case SELECT_TALK:
            return {
                ...state,
                selected: action.payload,
            }
        default:
            return state
    }
}