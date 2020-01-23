import { combineReducers, bindActionCreators } from "redux";
import authReducer from "./authReducer"

export default combineReducers({
    auth: authReducer
});