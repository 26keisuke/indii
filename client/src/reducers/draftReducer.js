import {
    FETCH_DRAFT, FETCH_ONE_DRAFT,
    DRAFT_UPDATED, 
    DRAFT_READ,
} from "../actions/types/types"

export default function draftReducer(state={
    onEdit: [],
    isUpdated: false,
    nounce: "",
    fetched: {},
}, action) {

    if(action.payload && action.payload.length === 0) {
        return state
    }

    switch(action.type) {
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
        default:
            return state
    }
}