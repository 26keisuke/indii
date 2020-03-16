// STAR_ONとSTAR_OFFのようにペアになっているやつはSTAR_TOGGLEで一つにまとめて、argumentでon offさせた方が楽だしわかりやすい

export const FEEDBACK_SENT = "FEEDBACK_SENT"

export const ON_SEARCH = "ON_SEARCH"
export const OFF_SEARCH = "OFF_SEARCH"
export const SEARCH_FETCHING = "SEARCH_FETCHING"

export const RESET_CATEGORY = "RESET_CATEGORY"
export const SET_CATEGORY = "SET_CATEGORY"

export const NUDGE_CHECK = "NUDGE_CHECK"
export const NUDGE_ADD = "NUDGE_ADD"

export const SEARCH_TERM = "SEARCH_TERM"

export const IS_FETCHING = "IS_FETCHING"
export const END_FETCHING = "END_FETCHING"

export const ENABLE_GRAY = "ENABLE_GRAY"
export const DISABLE_GRAY = "DISABLE_GRAY"

// MESSAGE

export const UPDATE_MESSAGE = "UPDATE_MESSAGE"
export const RESET_MESSAGE = "RESET_MESSAGE"
export const HIDE_MESSAGE = "HIDE_MESSAGE"

// CONFIRMATION

export const SHOW_CONFIRMATION = "SHOW_CONFIRMATION"
export const HIDE_CONFIRMATION = "HIDE_CONFIRMATION"
export const RESET_CONFIRMATION = "RESET_CONFIRMATION"
export const CHANGE_CONFIRMATION = "CHANGE_CONFIRMATION"

// INDEX
export const ADD_COLUMN = "ADD_COLUMN"
export const REVERT_COLUMN = "REVERT_COLUMN"
export const DELETE_COLUMN = "DELETE_COLUMN"

// AUTH
export const FETCH_USER = "FETCH_USER"
export const FETCH_NOTIF = "FETCH_NOTIF"
export const FETCH_CONFIRM = "FETCH_CONFIRM"
export const SHOW_LOGIN = "SHOW_LOGIN"
export const HIDE_LOGIN = "HIDE_LOGIN"
export const LOG_IN_ERROR = "LOG_IN_ERROR"

// TALK 

export const CREATE_TALK = "CREATE_TALK"
export const FETCH_TALK = "FETCH_TALK"
export const CREATE_COMMENT = "CREATE_COMMENT"
export const SELECT_TALK = "SELECT_TALK"

// Feed
export const FETCH_FEED = "FETCH_FEED"
export const FETCH_RECOMMEND = "FETCH_RECOMMEND"
export const FETCH_NEW_TOPIC = "FETCH_NEW_TOPIC"

// Draft
export const FETCH_DRAFT = "FETCH_DRAFT"
export const DRAFT_UPDATED = "DRAFT_UPDATED"
export const DRAFT_READ = "DRAFT_READ"
export const DRAFT_ONE_UPDATED = "DRAFT_ONE_UPDATED"
export const DRAFT_ONE_READ = "DRAFT_ONE_READ"
export const CHANGE_DRAFTNAME = "CHANGE_DRAFTNAME"
export const CHANGE_DRAFTCONFIG = "CHANGE_DRAFTCONFIG"
export const FETCH_ONE_DRAFT = "FETCH_ONE_DRAFT"
export const UPDATE_DRAFT_ONE = "UPDATE_DRAFT_ONE"
export const SELECT_DRAFT = "SELECT_DRAFT"
export const DRAFT_ADD_KATEX = "DRAFT_ADD_KATEX"
export const DRAFT_ADD_URL = "DRAFT_ADD_URL"

// TOPIC
export const SEARCH_TOPIC = "SEARCH_TOPIC"
export const FETCH_TOPIC = "FETCH_TOPIC"
export const CLEAR_TOPIC = "CLEAR_TOPIC"

// POST
export const SEARCH_POST = "SEARCH_POST"
export const FETCH_POST = "FETCH_POST"

// PROFILE
export const FETCH_PROFILE = "FETCH_PROFILE"

// FOLLOW
export const SEARCH_FOLLOWER = "SEARCH_FOLLOWER"

// IMAGE 
export const REVERT_IMG = "REVERT_IMG"