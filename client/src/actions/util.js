import axios from "axios";

let token;

export const cancelOnMultipleSearch = async (url, type, body) => {
    if(token) {
        token.cancel()
    }
    token = axios.CancelToken.source()
    try {
        var res = {}

        if(type === "POST") {
            res = await axios.post(url, body, {cancelToken: token.token})
            const result = res.data
            return result
        }

        res = await axios.get(url, {cancelToken: token.token})
        const result = res.data
        return result

    } catch(error) {
        if(axios.isCancel(error)) {
            console.log("Request has been cancelled.")
            return null
        } else {
            console.log("Something went wrong with searching.")
            return null
        }
    }
}