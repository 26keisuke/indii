import { USER_IS_LOGGEDIN } from "../actions/types"

export default function authReducer(state=null, action) {
    console.log(action);
    switch(action.type) {
        case USER_IS_LOGGEDIN:
            return action.payload || false;
        default:
            return state;
    }
}