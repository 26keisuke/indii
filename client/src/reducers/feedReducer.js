import {
    FETCH_FEED,
    FETCH_RECOMMEND,
    FETCH_NEW_TOPIC,
    SEARCH_FEED,
} from "../actions/types/types"

export default function feedReducer(state={
    search: [],
    feed: [],
    recommend: [],
    newTopic: []
}, action) {
    switch(action.type) {
        case SEARCH_FEED:
            return {
                ...state,
                search: action.payload.suggestions
            }
        case FETCH_NEW_TOPIC:
            return {
                ...state,
                newTopic: action.payload
            }
        case FETCH_FEED:
            return {
                ...state,
                feed: action.payload
            }
        case FETCH_RECOMMEND:
            return {
                ...state,
                recommend: action.payload
            }
        default:
            return state
    }
}
