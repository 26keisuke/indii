import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import { USER_IS_LOGGEDIN,
         STAR_OFF, STAR_ON, 
         ON_SEARCH, OFF_SEARCH, 
         RESET_CATEGORY, SET_CATEGORY,
         NUDGE_ADD, NUDGE_CHECK,
         SEARCH_TERM,
         IS_FETCHING, END_FETCHING,
         ENABLE_GRAY, DISABLE_GRAY, 
         UPDATE_MESSAGE, RESET_MESSAGE,
         SHOW_CONFIRMATION, HIDE_CONFIRMATION} from "../actions/types"

const initialState = {
    category: {
        home: true,
        draft: false,
        topic: false,
        post: false,
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
    response: {
        starOn: false
    },
    nudge: {
        home: true,
        draft: false,
        topic: true,
        post: false,
        notification: false,
        setting: false
    },
    form: {

    },
    auth: {},
    notif: {

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
            html: ""
        },
    },
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
                    buttonMessage: action.payload.buttonMessage
                }
            }
        case HIDE_CONFIRMATION:
            return {
                ...state,
                confirmation: {
                    on: false,
                    id: 0,
                    action: "",
                    title: "",
                    caution: "",
                    message: "",
                    buttonMessage: "",
                    html: ""
                }
            }
        default:
            return state
    }
}

function nudgeReducer(state=initialState.nudge, action) {
    switch(action.type){
        case NUDGE_ADD:
            // !!!! MUST BE ADDED LATER
            return state
        case NUDGE_CHECK:
            switch(action.payload){
                case "home":
                    return {
                        ...state,
                        home: false
                    }
                case "draft":
                    return {
                        ...state,
                        draft: false
                    }
                case "topic":
                    return {
                        ...state,
                        topic: false
                    }
                case "post":
                    return {
                        ...state,
                        post: false
                    }
                case "notification":
                    return {
                        ...state,
                        notification: false
                    }
                case "setting":
                    return {
                        ...state,
                        setting: false
                    }
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
                topic: false,
                post: false,
                notification: false,
                setting: false
            }
        case SET_CATEGORY:
            console.log("CATEGORY SET")
            switch(action.payload){
                case "home":
                    return {
                        ...state,
                        home: true
                    }
                case "draft":
                    return {
                        ...state,
                        draft: true
                    }
                case "topic":
                    return {
                        ...state,
                        topic: true
                    }
                case "post":
                    return {
                        ...state,
                        post: true
                    }
                case "notification":
                    return {
                        ...state,
                        notification: true
                    }
                case "setting":
                    return {
                        ...state,
                        setting: true
                    }
            }
        default:
            return state
    }
}

function responseReducer(state=initialState.response, action) {
    switch(action.type){
        case STAR_ON:
            console.log("STAR HAS BEEN CLICKED")
            return {
                ...state,
                starOn: true
            }
        case STAR_OFF:
            console.log(("STAR HAS BEEN UNCLICKED"))
            return {
                ...state,
                starOn: false
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
            return action.payload || false;
        default:
            return state;
    }
}

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    response: responseReducer,
    search: searchReducer,
    category: categoryReducer,
    nudge: nudgeReducer,
    update: updateReducer,
});