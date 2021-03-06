import axios from "axios";

import { 
    beginAction,
    endAction,
    updateMessage,
} from "./update"

import {
    fetchTopic
} from "./topic"

import { 
    FETCH_DRAFT, FETCH_ONE_DRAFT,
    DRAFT_UPDATED, DRAFT_READ, 
    DRAFT_ADD_REF,
    SELECT_DRAFT,
    DRAFT_ADD_KATEX, DRAFT_ADD_URL,
    DRAFT_ONE_UPDATE,
    // DRAFT_ONE_UPDATED, DRAFT_ONE_READ
} from "../types/types";

export const selectDraft = (draft) => (dispatch) => {
    dispatch({type: SELECT_DRAFT, payload: draft})
}

export const fetchDraft = (nounce) => async (dispatch) => {
    const url = "/api/draft"
    const res = await axios.get(url)
    if(res){ dispatch({ type: DRAFT_READ }) }
    dispatch({type: FETCH_DRAFT, payload: {data: res.data, nounce }})
}

export const fetchOneDraft = (id) => async (dispatch) => {
    if(!id) dispatch({type: FETCH_ONE_DRAFT, payload: {}})

    dispatch(beginAction())
    const url = `/api/draft/${id}`
    const res = await axios.get(url)
    if(res){ dispatch({ type: DRAFT_READ }) }
    dispatch({type: FETCH_ONE_DRAFT, payload: res.data})
    dispatch(endAction())
}

export const draftRead = () => (dispatch) => {
    dispatch({type: DRAFT_READ})
}

export const draftAddRef = (id, data) => async (dispatch) => {
    const url = `/api/draft/${id}/ref`
    const res = await axios.post(url, {ref: data})
    dispatch({type: DRAFT_ADD_REF, payload: res.data})
}

export const draftOneUpdate = (id, content, timeStamp) => async (dispatch) => {
    dispatch({type: DRAFT_ONE_UPDATE, payload: {id, content: JSON.stringify(content), timeStamp}})
    const res = await axios.post(`/api/draft/${id}`, {timeUpdate: timeStamp, content: JSON.stringify(content)})
    if(res.data) return true
}

//  ============ ここからの範囲のものはserverからのresultで直接reduxを書き換えるべき ============ 

// そしたらこいつが消せる

export const draftUpdated = () => (dispatch) => {
    dispatch({type: DRAFT_UPDATED})
}

export const changeDraftName = (draftId, value, revert) => async (dispatch) => {
    const url = `/api/draft/${draftId}/name`
    axios.post(url, {value, revert})
    .then(res => {
        dispatch(draftUpdated())
        if(revert){
            dispatch(updateMessage("success", "ポスト名を元に戻しました。"))
            return
        }
        dispatch(updateMessage("success", "ポスト名を変更しました。"))
    })
    .catch(err => {
        console.log(err)
    })
}

export const changeTag = (draftId, tags, revert) => async (dispatch) => {
    const url = `/api/draft/${draftId}/tag`
    axios.post(url, {tags, revert})
    .then(res => {
        dispatch(draftUpdated())
        if(revert){
            dispatch(updateMessage("success", "タグを元に戻しました。"))
            return
        }
        dispatch(updateMessage("success", "タグを変更しました。"))
    })
    .catch(err => {
        console.log(err)
    })
}

export const changeDraftConfig = (draftId, value) => async (dispatch) => {
    dispatch(beginAction())
    const url = `/api/draft/${draftId}/config`
    axios.post(url, {config: value})
    .then(res => {
        dispatch(draftUpdated())
        dispatch(endAction())
        dispatch(updateMessage("success", "設定を変更しました。"))
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteRef = (id) => async (dispatch) => {
    dispatch(beginAction())
    const url = `/api/draft/${id.draftId}/ref/${id.refId}`
    axios.delete(url)
        .then(res => {
            dispatch(draftUpdated())
            dispatch(endAction())
            dispatch(updateMessage("success", "参照を削除しました。"))
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}

export const deleteDraft = (id) => async (dispatch) => {
    dispatch(beginAction())
    const url = "/api/draft/delete"
    axios.post(url, {subject: id})
        .then(res => {
            dispatch(endAction())
            dispatch(fetchDraft(id)) // this certainly isnt the optimal because req is sent to server again
            dispatch(draftUpdated())
            dispatch(updateMessage("success", "下書きを削除しました。"))
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}

export const uploadDraft = (value) => async (dispatch) => {
    dispatch(beginAction())
    
    const url = "/api/draft/upload"
    const promises = []

    for(var key in value) {
        promises.push(
            axios.post(url, {value: value[key]})
        )
    }

    Promise.all(promises)
    .then(() => {
        dispatch(endAction())
        dispatch(draftUpdated())
        
        // もしreduxにfetchされているtopicがあったらstale valueになるのでリセットする
        dispatch(fetchTopic())

        dispatch(updateMessage("success", "ポストをアップロードしました。"))
        return
    })
    .catch(err => {
        console.log(err)
        return
    })
}

// ============ ここまでの ============ 

export const confirmDraft = (value) => async (dispatch) => {
    dispatch(beginAction())
    const url = `/api/draft/edit`
    axios.post(url, value)
    .then(res => {
        const msg = res.data === true ? "リクエストを承認しました。" : "リクエストを拒否しました。"
        dispatch(endAction())
        dispatch(updateMessage("success", msg))
        return;
    })
    .catch(err => {
        console.log(err)
    })
}

export const draftAddKatex = (katex) => (dispatch) => {
    dispatch({ type: DRAFT_ADD_KATEX, payload: katex})
}

export const draftAddUrl = (url) => (dispatch) => {
    dispatch({ type: DRAFT_ADD_URL, payload: url})
}