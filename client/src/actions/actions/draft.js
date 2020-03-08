import axios from "axios";

import { 
    isFetching,
    endFetching,
    disableGray,
    updateMessage,
} from "./update"

import { 
    FETCH_DRAFT, FETCH_ONE_DRAFT,
    DRAFT_UPDATED, DRAFT_READ, 
} from "../types/types";

export const fetchDraft = (nounce) => async (dispatch) => {
    const url = "/api/draft"
    const res = await axios.get(url)
    if(res){ dispatch({ type: DRAFT_READ }) }
    dispatch({type: FETCH_DRAFT, payload: {data: res.data, nounce }})
}

export const fetchOneDraft = (id) => async (dispatch) => {
    dispatch(isFetching())
    const url = `/api/draft/${id}`
    const res = await axios.get(url)
    if(res){ dispatch({ type: DRAFT_READ }) }
    dispatch({type: FETCH_ONE_DRAFT, payload: res.data})
    dispatch(endFetching())
}

export const draftUpdated = () => (dispatch) => {
    dispatch({type: DRAFT_UPDATED})
}

export const draftRead = () => (dispatch) => {
    dispatch({type: DRAFT_READ})
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

export const changeDraftConfig = (draftId, value) => async (dispatch) => {
    const url = `/api/draft/${draftId}/config`
    axios.post(url, {config: value})
    .then(res => {
        dispatch(draftUpdated())
        dispatch(disableGray())
        dispatch(updateMessage("success", "設定を変更しました。"))
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteDraft = (id) => async (dispatch) => {
    dispatch(isFetching())
    const url = "/api/draft/delete"
    axios.post(url, {subject: id})
        .then(res => {
            dispatch(endFetching())
            dispatch(disableGray())
            dispatch(fetchDraft(id)) // this certainly isnt the optimal because req is sent to server again
            dispatch(updateMessage("success", "下書きを削除しました。"))
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
        dispatch(updateMessage("success", "ポストをアップロードしました。"))
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
            dispatch(draftUpdated())
            dispatch(updateMessage("success", "参照を削除しました。"))
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}

export const confirmDraft = (value) => async (dispatch) => {
    dispatch(isFetching())
    const url = `/api/draft/edit`
    axios.post(url, value)
    .then(res => {
        const msg = res.data === true ? "リクエストを承認しました。" : "リクエストを拒否しました。"
        dispatch(updateMessage("success", msg))
        dispatch(endFetching())
        return;
    })
    .catch(err => {
        console.log(err)
    })
}