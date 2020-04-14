import {
    FETCH_FEED, FETCH_RECOMMEND, FETCH_NEW_TOPIC, FETCH_FEED_USER, FETCH_CATEGORY,
    SEARCH_FEED,
    SEARCH_TERM,
    RESTORE_SCROLL,
    SET_PAGE, SET_TOPIC_PAGE,
    RENDER_FEED, RENDER_NEW_TOPIC,
    LAST_FEED,
} from "../actions/types/types"

import update from "immutability-helper"

export default function feedReducer(state={
    search: [], // suggestions
    searchTerm: "", //検索結果
    postsFound: [], //検索結果
    topicsFound: [], //検索結果
    feed: [],
    recommend: [],
    newTopic: [],
    category: [],
    user: [],
    done: false, // 最後のフィードまで行った場合
    scroll: 0,
    page: 0,
    topicPage: 0,
    renderedTopics: [],
    rendered: [],
}, action) {
    switch(action.type) {
        case LAST_FEED:
            return {
                ...state,
                done: true,
            }
        case RENDER_NEW_TOPIC:
            return {
                ...state,
                renderedTopics: action.payload.topics
            }
        case RENDER_FEED:
            return {
                ...state,
                rendered: action.payload.feed,
            }
        case SET_TOPIC_PAGE:
            return {
                ...state,
                topicPage: action.payload.page,
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.payload.page,
            }
        case RESTORE_SCROLL:
            return {
                ...state,
                scroll: action.payload.scroll
            }
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
        case FETCH_CATEGORY:
            return {
                ...state,
                category: action.payload.map(cat => {
                    return {catId: cat._id[0], topics: cat.topics}
                })
            }
        case FETCH_NEW_TOPIC:
            if(!action.payload[0]) return state
            const newTopics = update(state.newTopic, {$push: [action.payload]})
            return {
                ...state,
                newTopic: newTopics
            }
        case FETCH_FEED:
            if(!action.payload[0]) return state
            const newFeed = update(state.feed, {$push: [action.payload]})
            return {
                ...state,
                feed: newFeed
            }
        case FETCH_RECOMMEND:
            return {
                ...state,
                recommend: action.payload
            }
        case FETCH_FEED_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}
