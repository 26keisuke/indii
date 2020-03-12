import axios from "axios";

import { 
    updateMessage,
} from "./update"

import { 
    CREATE_TALK,
    FETCH_TALK,
    CREATE_COMMENT,
    SELECT_TALK
} from "../types/types";

export const createTalk = (id, type, title, content) => async (dispatch) => {
    const res = await axios.post("/api/talk", {id, type, title, content})
    dispatch({type: CREATE_TALK, payload: res.data})
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