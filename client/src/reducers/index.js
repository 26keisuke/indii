import { combineReducers } from "redux";

import updateReducer from "./updateReducer"
import authReducer from "./authReducer"
import categoryReducer from "./categoryReducer"
import draftReducer from "./draftReducer"
import postReducer from "./postReducer"
import topicReducer from "./topicReducer"
import talkReducer from "./talkReducer"
import feedReducer from "./feedReducer"

import { 
    SEARCH_FETCHING,
    SEARCH_TERM,
    ADD_COLUMN, REVERT_COLUMN, DELETE_COLUMN,
    REVERT_IMG,
    SEARCH_FOLLOWER,
    FETCH_PROFILE
} from "../actions/types/types"

const initialState = {
    search: {
        actionFetching: false, // action内のsearchBoxから検索中（axiosでfetchingしている最中）
        barFetching: false,　// header内のsearchBoxから検索中
        searchResult: {
            topic: [],
            post: [],
            talk: [],
            people: []
        }
    },
    index: {
        columnName: "",
        revert: false,
        deleteId: "",
    },
    image: {
        revert: false,
    },
}

function imageReducer(state=initialState.image, action) {
    switch(action.type) {
        case REVERT_IMG:
            return {
                ...state,
                revert: action.payload.revert
            }
        default:
            return state
    }
}

function profileReducer(state={
    user: {
        post: [],
        followers: [],
        follows: [],
        likedTopic: [],
        likedPost: [],
    },
}, action) {
    switch(action.type) {
        case FETCH_PROFILE:

            const data = action.payload.data[0]

            if(!data) return state

            switch(action.payload.type){
                case "general":
                    return {
                        ...state,
                        user: data
                    }
                case "likedPost":
                    return {
                        ...state,
                        user: {
                            ...state.user,
                            likedPost: data.likedPost,
                        }
                    }
                case "likedTopic":
                    return {
                        ...state,
                        user: {
                            ...state.user,
                            likedTopic: data.likedTopic,
                        }
                    }
                case "post":
                    return {
                        ...state,
                        user: {
                            ...state.user,
                            post: data.post,
                        }
                    }
                case "follows":
                    return {
                        ...state,
                        user: {
                            ...state.user,
                            follows: data.follows,
                        }
                    }
                case "followers":
                    return {
                        ...state,
                        user: {
                            ...state.user,
                            followers: data.followers,
                        }
                    }
                default:
                    return {
                        ...state,
                    }
            }
        default:
            return state
    }
}

function indexReducer(state=initialState.index, action) {
    switch(action.type){
        case ADD_COLUMN:
            return {
                ...state,
                columnName: action.payload.name,
            }
        case REVERT_COLUMN:
            return {
                ...state,
                revert: action.payload.trigger,
            }
        case DELETE_COLUMN:
            return {
                ...state,
                deleteId: action.payload.id,
            }
        default:
            return state
    }
}

function searchReducer(state=initialState.search, action) {
    switch(action.type) {
        case SEARCH_FETCHING:
            if(action.payload.type === "ACTION"){
                return {
                    ...state,
                    actionFetching: action.payload.onSearch,
                }
            } else {
                return {
                    ...state,
                    barFetching: action.payload.onSearch,
                }
            }
        case SEARCH_FOLLOWER:
            return {
                ...state,
                searchResult: {
                    ...state.searchResult,
                    people: action.payload.suggestions,
                }
            }
        case SEARCH_TERM:
            return {
                ...state,
                searchResult: {
                    topic: action.payload.topic,
                    post: action.payload.post,
                    talk: action.payload.talk,
                    people: action.payload.people
                }
            }
        default:
            return state
    }
}

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    search: searchReducer,
    category: categoryReducer,
    update: updateReducer,
    index: indexReducer,
    topic: topicReducer,
    draft: draftReducer,
    post: postReducer,
    image: imageReducer,
    talk: talkReducer,
    feed: feedReducer,
});