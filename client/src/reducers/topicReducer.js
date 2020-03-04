import {
    SEARCH_TOPIC, 
    FETCH_TOPIC,
    CLEAR_TOPIC,
} from "../actions/types/types"

export default function topicReducer(state={
    search: [],
    fetched: {},
}, action) {
    switch(action.type) {
        case SEARCH_TOPIC:
            return {
                ...state,
                search: action.payload.suggestions
            }
        case FETCH_TOPIC:
            return {
                ...state,
                fetched: action.payload
            }
        case CLEAR_TOPIC:
            return {
                ...state,
                fetched: {},
            }
        default:
            return state
    }
}