import axios from "axios";
import { FETCH_USER,
         ON_SEARCH, OFF_SEARCH, 
         SET_CATEGORY, 
         RESET_CATEGORY,
         NUDGE_ADD,
         NUDGE_CHECK,
         SEARCH_TERM,
         IS_FETCHING,
         END_FETCHING,
         ENABLE_GRAY,
         DISABLE_GRAY,
         UPDATE_MESSAGE,
         RESET_MESSAGE,
         SHOW_CONFIRMATION,
         HIDE_CONFIRMATION,
         ADD_COLUMN, REVERT_COLUMN,
         SHOW_LOGIN, HIDE_LOGIN,
         SEARCH_POST, SEARCH_TOPIC,
         FETCH_DRAFT,
         DRAFT_UPDATED, DRAFT_READ, 
         FETCH_TOPIC, FETCH_POST,
         FETCH_FEED,
         FETCH_PROFILE } from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get("/api/current_user");
    dispatch({type: FETCH_USER, payload: res.data});
};

export const onSearch = () => (dispatch) => {
    dispatch({type: ON_SEARCH})
}

export const offSearch = () => (dispatch) => {
    dispatch({type: OFF_SEARCH})
}

export const resetCategory = () => (dispatch) => {
    dispatch({type: RESET_CATEGORY})
}

export const setCategory = (id) => (dispatch) => {
    dispatch({type: SET_CATEGORY, payload: id})
}

export const nudgeAdd = (id) => (dispatch) => {
    dispatch({type: NUDGE_ADD, payload: id})
}

export const nudgeCheck = (id) => (dispatch) => {
    dispatch({type: NUDGE_CHECK, payload: id})
}

export const searchTerm = (term) => async (dispatch) => {
    const url = "/api/search/" + String(term)
    const res = await axios.get(url)
    dispatch({type: SEARCH_TERM, payload: res.data})
}

export const isFetching = () => (dispatch) => {
    dispatch({type: IS_FETCHING})
}

export const endFetching = () => (dispatch) => {
    dispatch({type: END_FETCHING})
}

export const enableGray = () => (dispatch) => {
    dispatch({type: ENABLE_GRAY})
}

export const disableGray = () => (dispatch) => {
    dispatch({type: DISABLE_GRAY})
}

export const updateMessage = (type, message) => (dispatch) => {
    dispatch({type: UPDATE_MESSAGE, payload: {type: type, message: message}})
}

export const resetMessage = () => (dispatch) => {
    dispatch({type: RESET_MESSAGE})
}

export const showConfirmation = (id, action, title, caution, message, buttonMessage, next, value) => (dispatch) => {
    dispatch({type: SHOW_CONFIRMATION, payload: {
                                                id: id,
                                                action: action,
                                                title: title,
                                                caution: caution,
                                                message: message, 
                                                buttonMessage: buttonMessage,
                                                next: next,
                                                value: value }})
}

export const hideConfirmation = () => (dispatch) => {
    dispatch({type: HIDE_CONFIRMATION})
}

export const revertColumn = (trigger) => (dispatch) => {
    dispatch({type: REVERT_COLUMN, payload: {trigger}})
}

export const addColumn = (id, name) => (dispatch) => {
    dispatch({type: ADD_COLUMN, payload: {id: id, name: name}})
}

export const showLogin = () => (dispatch) => {
    dispatch({type: SHOW_LOGIN})
}

export const hideLogin = () => (dispatch) => {
    dispatch({type: HIDE_LOGIN})
}


let token;

export const searchTopic = (type, value) => async (dispatch) => {
    const url = "/api/topic/search/" + String(type) + "/" + String(value)
    const res = await cancelOnMultipleSearch(url)
    dispatch({type: SEARCH_TOPIC, payload: {suggestions: res}})
} 

export const searchPost = (type, value, topicId) => async (dispatch) => {
    var url = "/api/post/search/" + String(type) + "/" + String(value)

    if(topicId){
        url = url + "/" + String(topicId)
    }

    const res = await cancelOnMultipleSearch(url)
    dispatch({type: SEARCH_POST, payload: {suggestions: res}})
}

export const draftUpdated = () => (dispatch) => {
    dispatch({type: DRAFT_UPDATED})
}

export const draftRead = () => (dispatch) => {
    dispatch({type: DRAFT_READ})
}

export const deletePost = (id) => async (dispatch) => {
    const url = "/api/post/delete";
    axios.post(url, {id})
        .then(()=> {
            dispatch(endFetching())
            dispatch(disableGray())
            sendMessage("success", "ポストを削除しました。", 3000, dispatch)
            return
        })
        .catch((err) => {
            console.error(err)
            return
        })   
}

export const sendFeedBack = (id, problems) => async (dispatch) => {
    const url = "/api/feedback"
    axios.post(url, {id, problems})
        .then(()=> {
            dispatch(endFetching())
            dispatch(disableGray())
            sendMessage("success", "フィードバックを受け取りました。", 3000, dispatch)
            return
        })
        .catch((err) => {
            console.error(err)
            return
        })
}

export const deleteDraft = (id) => async (dispatch) => {
    const url = "/api/draft/delete"
    axios.post(url, {subject: id})
        .then(res => {
            dispatch(endFetching())
            dispatch(disableGray())
            dispatch(fetchDraft()) // this certainly isnt the optimal because req is sent to server again
            sendMessage("success", "下書きを削除しました。", 3000, dispatch)
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}

export const uploadDraft = (value) => async (dispatch) => {
    const url = "/api/draft/upload"
    const promises = []

    for(var key in value) {
        promises.push(
            axios.post(url, {value: value[key]})
        )
    }

    Promise.all(promises)
    .then(() => {
        dispatch(disableGray())
        dispatch(endFetching())
        dispatch(draftUpdated())
        sendMessage("success", "ポストをアップロードしました。", 4000, dispatch)
        return
    })
    .catch(err => {
        console.log(err)
        return
    })
}

export const deleteRef = (id) => async (dispatch) => {
    const url = `/api/draft/${id.draftId}/ref/${id.refId}`
    axios.delete(url)
        .then(res => {
            dispatch(disableGray())
            sendMessage("success", "参照を削除しました。", 3000, dispatch)
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}

export const signUp = (value) => async (dispatch) => {
    const url = "/api/login"
    axios.post(url, value)
        .then(user => {
            dispatch(disableGray())
            dispatch(endFetching())
            sendMessage("success", `"${user.data.email}"に確認メールを送信しました。`, 7000, dispatch)
            dispatch(fetchUser())
            return
        })
        .catch(err => {
            console.log(err)
            return
        })  
}

export const logIn = (value) => async (dispatch) => {
    const url = "/api/login"
    axios.post(url, value)
        .then(user => {
            if(!user.data.userName) { // if user is not found, return error message
                dispatch(endFetching())
                this.setState({ logInError: true })
                return
            }
            dispatch(disableGray())
            dispatch(endFetching())
            sendMessage("success", `${user.data.userName}さん、お帰りなさい。`, 3000, dispatch)
            dispatch(fetchUser())
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}

export const updateImage = (id, value) => async (dispatch) => {
    const url = `/api/profile/${id}/photo`
    axios.post(url, {photo: value})
        .then(() => {
            dispatch(dispatch(disableGray()))
            dispatch(fetchProfile(id))
            dispatch(fetchUser())
            sendMessage("success", "プロフィール画像を変更しました。", 3000, dispatch)
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}

export const updateIntro = (id, value) => async (dispatch) => {

    if(value.length > 150) { sendMessage("fail", "入力可能な文字数を超えています。", 3000, dispatch); return }

    const url = `/api/profile/${id}/intro`
    axios.post(url, {intro: value})
        .then(() => {
            dispatch(disableGray())
            dispatch(fetchProfile(id))
            dispatch(fetchUser())
            sendMessage("success", "プロフィールの内容を変更しました。", 3000, dispatch)
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}

// ====== FETCH =====

export const fetchTopic = (id, type) => async (dispatch) => {
    const url = "/api/topic/" + String(id) + "/" + String(type)
    const res = await axios.get(url)
    dispatch({type: FETCH_TOPIC, payload: res.data})
}

export const fetchPost = (id) => async (dispatch) => {
    const res = await axios.get(`/api/post/${String(id)}`)
    dispatch({type: FETCH_POST, payload: res.data})
}

export const fetchProfile = (id) => async (dispatch) => {
    const res = await axios.get(`/api/profile/${id}`)
    dispatch({type: FETCH_PROFILE, payload: res.data})
}

export const fetchFeed = () =>  async (dispatch) => {
    const res = await axios.get("api/feed")
    dispatch({type: FETCH_FEED, payload: res.data})
}

export const fetchDraft = (id) => async (dispatch) => {
    const url = "/api/draft"
    const res = await axios.get(url)
    dispatch({type: FETCH_DRAFT, payload: {data: res.data, nounce: id }})
}

// ===== UTIL =====

const sendMessage = (type, message, duration, dispatch) => {
    dispatch(updateMessage(type, message));
    setTimeout(() => dispatch(resetMessage()), duration)
}

// exportを消したから後でバグ起きるかもしれない
const cancelOnMultipleSearch = async (url, type, body) => {
    if(token) {
        token.cancel()
    }
    token = axios.CancelToken.source()
    try {
        var res = {}

        if(type === "POST") {
            res = await axios.post(url, body, {cancelToken: token.token})
            const result = res.data
            return result
        }

        res = await axios.get(url, {cancelToken: token.token})
        const result = res.data
        return result

    } catch(error) {
        //　ここの二つは本来はキャンセルしたいところ。（今の状態では、reducerに送られているからその分無駄）
        if(axios.isCancel(error)) {
            console.log("Request has been cancelled.")
            return []
        } else {
            console.log("Something went wrong with searching.")
            return []
        }
    }
}