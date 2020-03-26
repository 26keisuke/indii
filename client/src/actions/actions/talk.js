import axios from "axios";

import { 
    updateMessage,
    beginAction,
    endAction,
} from "./update"

import { 
    CREATE_TALK,
    FETCH_TALK,
    CREATE_COMMENT,
    SELECT_TALK,
    EDIT_TALK_DESC,
    DELETE_TALK
} from "../types/types";

export const deleteTalk = (id) => async dispatch => {
    dispatch(beginAction())
    const url = `/api/talk/${id}/delete`
    const res = await axios.post(url)
    dispatch({type: DELETE_TALK, payload: {id}})
    dispatch(endAction())
    dispatch(updateMessage("success", "トークを削除しました。"))
}

export const editTalkDesc = (id, value) => async dispatch => {
    const url = `/api/talk/${id}/edit`
    const res = await axios.post(url, {value})
    dispatch({type: EDIT_TALK_DESC, payload: {id, value}})
    dispatch(updateMessage("success", "トークを編集しました。"))
}

export const createTalk = (id, type, title, content) => async (dispatch) => {
    dispatch(beginAction())
    const res = await axios.post("/api/talk", {id, type, title, content})
    dispatch({type: CREATE_TALK, payload: res.data})
    dispatch(endAction())
    dispatch(updateMessage("success", "トークを作成しました。"))
}

export const fetchTalks = () => async (dispatch) => {
    const res = await axios.get("/api/talk")
    dispatch({type: FETCH_TALK, payload: res.data})
}

export const createComment = (id, value) => async (dispatch) => {
    const res = await axios.post(`/api/talk/${id}`, {value})
    dispatch({type: CREATE_COMMENT, payload: res.data})
    dispatch(updateMessage("success", "メッセージを追加しました。"))
}

export const selectTalk = (talk) => (dispatch) => {
    dispatch({type: SELECT_TALK, payload: talk})
}