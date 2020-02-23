import { combineReducers } from "redux";
// import { reducer as reduxForm } from "redux-form";

import { USER_IS_LOGGEDIN,
         ON_SEARCH, OFF_SEARCH, 
         RESET_CATEGORY, SET_CATEGORY,
         NUDGE_ADD, NUDGE_CHECK,
         SEARCH_TERM,
         IS_FETCHING, END_FETCHING,
         ENABLE_GRAY, DISABLE_GRAY, 
         UPDATE_MESSAGE, RESET_MESSAGE,
         SHOW_CONFIRMATION, HIDE_CONFIRMATION,
         ADD_COLUMN, 
         SHOW_LOGIN, HIDE_LOGIN,
         SEARCH_TOPIC, SEARCH_POST,
         FETCH_TOPIC,
         FETCH_DRAFT, 
         FETCH_POST,
         DRAFT_UPDATED, DRAFT_READ,
         FETCH_FEED,
         FETCH_PROFILE
         } from "../actions/types"

const initialState = {
    category: {
        home: true,
        draft: false,
        action: false,
        notification: false,
        setting: false
    },
    search: {
        onSearch: false,
        searchResult: {
            topic: [],
            post: [],
            talk: [],
            people: []
        }
    },
    nudge: {
        home: true,
        draft: false,
        action: true,
        notification: false,
        setting: false
    },
    form: {

    },
    auth: {
        showForm: false,
        loggedIn: false,
        info: {}
    },
    notif: {

    },
    index: {
        columnName: ""
    },
    update: {
        fetching: false,
        grayBackground: false,
        updateMessage: {
            on: false,
            type: "",
            message: "",
        },
        confirmation: {
            on: false,
            id: 0,
            action: "",
            title: "",
            message: "",
            buttonMessage: "",
            next: "",
        },
    },
    post: {
        search: [],
        fetched: {},
        feed: {},
    },
    topic: {
        search: [],
        fetched: {},
    },
    draft: {
        onEdit: [],
        isUpdated: false,
        nounce: "",
    },
    profile: {
        user: {},
    }
}

function profileReducer(state=initialState.profile, action) {
    switch(action.type) {
        case FETCH_PROFILE:
            return {
                user: action.payload
            }
        default:
            return state
    }
}

function draftReducer(state=initialState.draft, action) {

    if(action.payload && action.payload.length === 0) {
        return state
    }

    switch(action.type) {
        case FETCH_DRAFT:
            return {
                ...state,
                onEdit: action.payload.data,
                nounce: action.payload.nounce
            }
        case DRAFT_UPDATED:
            return {
                ...state,
                isUpdated: true,
            }
        case DRAFT_READ:
            return {
                ...state,
                isUpdated: false,
            }
        default:
            return state
    }
}

function postReducer(state=initialState.post, action) {
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

function topicReducer(state=initialState.topic, action) {
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
        default:
            return state
    }
}

function updateReducer(state=initialState.update, action){
    switch(action.type){
        case IS_FETCHING:
            return {
                ...state,
                fetching: true,
            }
        case END_FETCHING:
            return {
                ...state,
                fetching: false,
            }
        case ENABLE_GRAY:
            return {
                ...state,
                grayBackground: true,
            }
        case DISABLE_GRAY:
            return {
                ...state,
                grayBackground: false
            }
        case UPDATE_MESSAGE:
            return {
                ...state,
                updateMessage: {
                    on: true,
                    type: action.payload.type,
                    message: action.payload.message
                }
            }
        case RESET_MESSAGE:
            return {
                ...state,
                updateMessage: {
                    on: false,
                    type: "",
                    message: ""
                }
            }
        case SHOW_CONFIRMATION:
            return {
                ...state,
                confirmation: {
                    on: true,
                    id: action.payload.id,
                    action: action.payload.action,
                    title: action.payload.title,
                    caution: action.payload.caution,
                    message: action.payload.message,
                    buttonMessage: action.payload.buttonMessage,
                    next: action.payload.next,
                    value: action.payload.value,
                }
            }
        case HIDE_CONFIRMATION:
            return {
                ...state,
                confirmation: {
                    on: false,
                    id: "", // 0から""に変えたバグ起きる可能性あり
                    action: "",
                    title: "",
                    caution: "",
                    message: "",
                    buttonMessage: "",
                    next: "",
                    value: "",
                }
            }
        default:
            return state
    }
}

function nudgeReducer(state=initialState.nudge, action) {
    switch(action.type){
        case NUDGE_ADD:
            return {
                ...state,
                [action.payload]: true
            }
        case NUDGE_CHECK:
            return {
                ...state,
                [action.payload]: false
            }
        default:
            return state
    }
}

function categoryReducer(state=initialState.category, action) {
    switch(action.type) {
        case RESET_CATEGORY:
            console.log("CATEGORY RESET")
            return{
                ...state,
                home: false,
                draft: false,
                action: false,
                notification: false,
                setting: false
            }
        case SET_CATEGORY:
            console.log("CATEGORY SET")
            return {
                [action.payload]: true
            }
        default:
            return state
    }
}

function searchReducer(state=initialState.search, action) {
    switch(action.type) {
        case ON_SEARCH:
            console.log("SEARCHING")
            return {
                ...state,
                onSearch: true
            }
        case OFF_SEARCH:
            console.log("SEARCH ENDED")
            return {
                ...state,
                onSearch: false
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

function authReducer(state=initialState.auth, action) {
    switch(action.type) {
        case USER_IS_LOGGEDIN:
            if(action.payload) {
                return {
                    ...state,
                    loggedIn: true,
                    info: action.payload,
                }
            }
            return state;
        case SHOW_LOGIN:
            return {
                ...state,
                showForm: true,
            }
        case HIDE_LOGIN:
            return {
                ...state,
                showForm: false,
            }
        default:
            return state;
    }
}

export default combineReducers({
    auth: authReducer,
    // form: reduxForm,
    profile: profileReducer,
    search: searchReducer,
    category: categoryReducer,
    nudge: nudgeReducer,
    update: updateReducer,
    index: indexReducer,
    topic: topicReducer,
    draft: draftReducer,
    post: postReducer,
});