import update from "immutability-helper"

import {
    FETCH_DRAFT, FETCH_ONE_DRAFT,
    DRAFT_UPDATED, 
    DRAFT_READ,
    DRAFT_ADD_REF,
    SELECT_DRAFT,
    DRAFT_ADD_KATEX, DRAFT_ADD_URL,
    DRAFT_ONE_UPDATE
} from "../actions/types/types"

import { findArrObjIndex } from "./util"

export default function draftReducer(state={
    onEdit: [], // draft複数を保存する
    isUpdated: false,
    nounce: "",　// nounceはfetchDraftする度に新しい値になる（要するに、databaseで変更がある度）
    fetched: {}, // draft一つだけを保存する
    selected: {
        content: "", 
        id: "",
    }, // draft一つだけを保存する(Draft edit時に使うから上と一緒にしない方がいい）

    katex: null,
    url: "",
}, action) {

    if(action.payload && action.payload.length === 0) {
        return state
    }

    var newObj, index;

    switch(action.type) {
        case DRAFT_ONE_UPDATE:
            index = findArrObjIndex(state.onEdit, "_id", action.payload.id)
            newObj = update(state, {onEdit: {[index]: {content: {$set: action.payload.content}}}})
            newObj = update(newObj, {onEdit: {[index]: {editDate: {$push: [action.payload.timeStamp]}}}})
            return newObj
        case SELECT_DRAFT:
            return {
                ...state,
                selected: action.payload,
            }
        case FETCH_DRAFT:
            return {
                ...state,
                onEdit: action.payload.data,
                nounce: action.payload.nounce
            }
        case FETCH_ONE_DRAFT:
            return {
                ...state,
                fetched: action.payload,
            }
        case DRAFT_UPDATED:　// これnounceがあるからいらないのではないか？
            return {
                ...state,
                isUpdated: true,
            }
        case DRAFT_READ:
            return {
                ...state,
                isUpdated: false,
            }
        case DRAFT_ADD_REF:

            index = findArrObjIndex(state.onEdit, "_id", action.payload.id)

            newObj = update(state, {onEdit: {[index]: {ref: {$set: action.payload.ref}}}})
            newObj = update(newObj, {selected: {ref: {$set: action.payload.ref}}})

            return newObj

        case DRAFT_ADD_KATEX:
            return {
                ...state,
                katex: action.payload
            }
            
        case DRAFT_ADD_URL:
            return {
                ...state,
                url: action.payload
            }

        default:
            return state
    }
}