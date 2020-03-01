import {
    SEARCH_POST,
    FETCH_POST,
    FETCH_FEED,
} from "../actions/types/types"

export default function postReducer(state={
    search: [],
    fetched: {},
    feed: {},
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
        case FETCH_FEED:
            return {
                ...state,
                feed: action.payload
            }
        default:
            return state
    }
}
