import { combineReducers } from "redux";

import updateReducer from "./updateReducer"
import authReducer from "./authReducer"
import categoryReducer from "./categoryReducer"
import draftReducer from "./draftReducer"
import postReducer from "./postReducer"
import topicReducer from "./topicReducer"

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
    notif: {

    },
    index: {
        columnName: "",
        revert: false,
        deleteId: "",
    },
    image: {
        revert: false,
    },
    profile: {
        user: {},
    }
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

function profileReducer(state=initialState.profile, action) {
    switch(action.type) {
        case FETCH_PROFILE:
            return {
                ...state,
                user: action.payload
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
});