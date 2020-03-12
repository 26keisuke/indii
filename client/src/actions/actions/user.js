import axios from "axios";

import { 
    disableGray,
    updateMessage,
} from "./update"

import {
    fetchUser
} from "./auth"

import { 
    SEARCH_FETCHING,
    SEARCH_FOLLOWER,
    FETCH_PROFILE 
} from "../types/types";

import { cancelOnMultipleSearch } from "../util"

export const fetchProfile = (id) => async (dispatch) => {
    const res = await axios.get(`/api/profile/${id}`)
    dispatch({type: FETCH_PROFILE, payload: res.data})
}

export const searchFollower = (name) => async (dispatch) => {
    var url = `/api/friend/${name}`
    const res = await cancelOnMultipleSearch(url)
    if(!!res){
        dispatch({type: SEARCH_FETCHING, payload: {type: "ACTION", onSearch: false}})
        dispatch({type: SEARCH_FOLLOWER, payload: {suggestions: res}})
    }
}


export const updateImage = (id, value) => async (dispatch) => {
    const url = `/api/profile/${id}/photo`
    axios.post(url, {photo: value})
        .then(() => {
            dispatch(disableGray())
            dispatch(fetchProfile(id))
            dispatch(fetchUser())
            dispatch(updateMessage("success", "プロフィール画像を変更しました。"))
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}

export const updateProfile = (id, value) => async (dispatch) => {
    if(value.userName.length > 25) {
        dispatch(updateMessage("fail", "入力可能な文字数を超えています")); return;
    }

    if(value.intro.length > 150) { 
        dispatch(updateMessage("fail", "入力可能な文字数を超えています。")); return 
    }

    if(value.comment.length > 30) {
        dispatch(updateMessage("success", "入力可能な文字数を超えています")); return
    }

    const url = `/api/profile/${id}`
    axios.post(url, value)
        .then(() => {
            dispatch(disableGray())
            dispatch(fetchProfile(id))
            dispatch(fetchUser())
            dispatch(updateMessage("success", "プロフィールの内容を変更しました。"))
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}