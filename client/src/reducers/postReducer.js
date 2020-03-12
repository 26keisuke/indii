import {
    SEARCH_POST,
    FETCH_POST,
} from "../actions/types/types"

export default function postReducer(state={
    search: [],
    fetched: {},
}, action) {
    switch(action.type) {
        case SEARCH_POST:
            return {
                ...state,
                search: action.payload.suggestions
            }
        case FETCH_POST:
            return {
                ...state,
                fetched: action.payload
            }
        default:
            return state
    }
}
