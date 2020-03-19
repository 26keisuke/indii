import {
    FETCH_FEED,
    FETCH_RECOMMEND,
    FETCH_NEW_TOPIC,
    SEARCH_FEED,
    SEARCH_TERM,
} from "../actions/types/types"

export default function feedReducer(state={
    search: [], // suggestions
    searchTerm: "", //検索結果
    postsFound: [], //検索結果
    topicsFound: [], //検索結果
    feed: [],
    recommend: [],
    newTopic: []
}, action) {
    switch(action.type) {
        case SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload.term,
                postsFound: action.payload.posts,
                topicsFound: action.payload.topics,
            }
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
