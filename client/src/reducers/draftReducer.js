import update from "immutability-helper"

import {
    FETCH_DRAFT, FETCH_ONE_DRAFT,
    DRAFT_UPDATED, 
    DRAFT_READ,
    UPDATE_DRAFT_ONE,
    SELECT_DRAFT
} from "../actions/types/types"

export default function draftReducer(state={
    onEdit: [], // draft複数を保存する
    isUpdated: false,
    nounce: "",
    fetched: {}, // draft一つだけを保存する
    selected: {}, // draft一つだけを保存する(Draft edit時に使うから上と一緒にしない方がいい）
}, action) {

    if(action.payload && action.payload.length === 0) {
        return state
    }

    switch(action.type) {
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
        case UPDATE_DRAFT_ONE:

            var index;

            for(var i=0; i < state.onEdit.length; i++){
                if(state.onEdit[i]._id === action.payload._id){
                    index = i
                    break
                }
            }

            const newObj = update(state, {onEdit: {[index]: {$set: action.payload}}})

            return newObj

        default:
            return state
    }
}