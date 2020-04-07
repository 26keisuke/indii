import axios from "axios";

import { 
    endAction,
    updateMessage,
    enableGray,
} from "./update"

import { 
    FETCH_USER, FETCH_NOTIF, FETCH_CONFIRM,
    SHOW_LOGIN, HIDE_LOGIN, LOG_IN_ERROR,
    FETCH_AFTER_TOPIC_LIKE,
    SET_POST_EMOJI, SET_POST_STAR, SET_TOPIC_LIKE, SET_USER_FOLLOW,
} from "../types/types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get("/api/current_user");

    var copy;

    // バグ： SETした先のvalueを変えるとauth.infoの値も一緒に変わってしまう。Copyを作ってもうまくいかない。
    // このせいでEmojiを変更できない。
    
    // initialize localstorage and redux
    if(res.data.likedPost) {
        localStorage.setItem("INDII_POST_STAR", JSON.stringify(res.data.likedPost))
        copy = res.data.likedPost.slice()
        dispatch({ type: SET_POST_STAR, payload: copy })
    }
    if(res.data.postRating) {
        localStorage.setItem("INDII_POST_EMOJI", JSON.stringify(res.data.postRating))
        copy = res.data.postRating.slice()
        dispatch({ type: SET_POST_EMOJI, payload: copy })
    }
    if(res.data.likedTopic) {
        localStorage.setItem("INDII_TOPIC_LIKE", JSON.stringify(res.data.likedTopic))
        copy = res.data.likedTopic.slice()
        dispatch({ type: SET_TOPIC_LIKE, payload: copy })
    }
    if(res.data.follows) {
        localStorage.setItem("INDII_USER_FOLLOW", JSON.stringify(res.data.follows))
        copy = res.data.follows.slice()
        dispatch({ type: SET_USER_FOLLOW, payload: copy })
    }

    dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchNotif = () => async dispatch => {
    const res = await axios.get("/api/notif");
    dispatch({type: FETCH_NOTIF, payload: res.data})
}

export const fetchAfterTopicLike = (id, liked) => async dispatch => {
    const res = await axios.post(`/api/topic/${id}/like`, {like: liked})
    dispatch({ type: FETCH_AFTER_TOPIC_LIKE, payload: res.data})
}

export const fetchConfirm = (id, nounce) => async (dispatch) => {
    const res = await axios.get(`/api/notif/${id}`);
    dispatch({type: FETCH_CONFIRM, payload: {data: res.data, nounce}})
}

export const showLogin = () => (dispatch) => {
    dispatch(enableGray())
    dispatch({type: SHOW_LOGIN})
}

export const hideLogin = () => (dispatch) => {
    dispatch(endAction())
    dispatch({type: HIDE_LOGIN})
}

export const logInError = (error) => (dispatch) => {
    dispatch({type: LOG_IN_ERROR, payload: {error}})
}

export const signUp = (value) => async (dispatch) => {
    const url = "/auth/login"
    axios.post(url, value)
        .then(user => {
            dispatch(endAction())
            if(user.data === "ERROR"){
                dispatch(updateMessage("fail", "新規登録に失敗しました。", 7000))
                dispatch(hideLogin())
                return
            }
            dispatch(updateMessage("success", `"${user.data.email}"に確認メールを送信しました。`, 7000))
            dispatch(fetchUser())
            dispatch(hideLogin())
            return
        })
        .catch(err => {
            console.log(err)
            return
        })  
}

export const logIn = (value) => async (dispatch) => {
    const url = "/auth/login"
    axios.post(url, value)
        .then(user => {
            if(!user.data.userName) { // if user is not found, return error message
                dispatch(endAction())
                dispatch(logInError(true))
                return
            }
            dispatch(endAction())
            dispatch(updateMessage("success", `${user.data.userName}さん、お帰りなさい。`))
            dispatch(fetchUser())
            dispatch(hideLogin())
            dispatch(logInError(false))
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}