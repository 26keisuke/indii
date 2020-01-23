import axios from "axios";
import { USER_IS_LOGGEDIN } from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get("/api/current_user");
    dispatch({type: USER_IS_LOGGEDIN, payload: res.data});
};

