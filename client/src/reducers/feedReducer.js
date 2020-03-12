import {
    FETCH_FEED,
    FETCH_RECOMMEND,
} from "../actions/types/types"

export default function feedReducer(state={
    feed: [],
    recommend: []
}, action) {
    switch(action.type) {
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
