// これ全部reduxで管理できないか？

import axios from "axios"
import { sendMessage } from "./Util/util"

export function deletePost(id, context) {
    axios.post("/api/post/delete", {id})
        .then(()=> {
            // 本来はsettimeoutはいらん
            setTimeout(() => {
            context.endFetching(); 
            context.disableGray();
            sendMessage("success", "ポストを削除しました。", 3000, context)
            }, 500)
            return
        })
        .catch((err) => {
            console.error(err)
            return
        })
}

export function sendFeedBack(id, problems, context) {
    axios.post("/api/feeback", {id, problems})
        .then(()=> {
            // 本来はsettimeoutはいらん
            setTimeout(() => {
            context.endFetching(); 
            context.disableGray();
            sendMessage("success", "フィードバックを受け取りました。", 3000, context)
            }, 500);
            return
        })
        .catch((err) => {
            console.error(err)
            return
        })
}

export function deleteDraft(id, context) {
    axios.post("/api/draft/delete", {subject: id})
        .then(res => {
            context.endFetching();
            context.disableGray();
            context.fetchDraft() // this certainly isnt the optimal because req is sent to server again
            sendMessage("success", "下書きを削除しました。", 3000, context)
            return
        })
        .catch(err => {
            console.log(err)
            context.endFetching()
            context.disableGray();
            return
        })
}

export function uploadDraft(value, context) {
    const promises = []

    for(var key in value) {
        promises.push(
            axios.post("/api/draft/upload", {value: value[key]})
        )
    }

    Promise.all(promises).then(() => {
        context.disableGray();
        context.endFetching();
        context.draftUpdated();
        sendMessage("success", "ポストをアップロードしました。", 4000, context)
        return
    })
}

export function deleteRef(id, context) {
    axios.delete(`/api/draft/${id.draftId}/ref/${id.refId}`)
        .then(res => {
            context.disableGray()
            sendMessage("success", "参照を削除しました。", 3000, context)
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}


export function signUp(value, context) {
    axios.post("/api/login", value)
        .then(user => {
            context.disableGray()
            context.endFetching()
            sendMessage("success", `"${user.data.email}"に確認メールを送信しました。`, 7000, context)
            context.fetchUser();
            return
        })
        .catch(err => {
            console.log(err)
            return
        })     
}

export function logIn(value, context) {
    axios.post("/api/login", value)
        .then(user => {
            if(!user.data.userName) { // if user is not found, return error message
                context.endFetching()
                this.setState({ logInError: true })
                return
            }
            context.disableGray()
            context.endFetching()
            sendMessage("success", `${user.data.userName}さん、お帰りなさい。`, 3000, context)
            context.fetchUser();
            return
        })
        .catch(err => {
            console.log(err)
            return
        })
}

export function updateImage(value, context) {
    axios.post(`/api/profile/${context.auth.info._id}/photo`, {photo: value})
    .then(() => {
        context.disableGray()
        context.fetchProfile(context.auth.info._id)
        context.fetchUser();
        sendMessage("success", "プロフィール画像を変更しました。", 3000, context)
        return
    })
    .catch(err => {
        context.disableGray()
        console.log(err)
        return
    })
}

export function updateIntro(value, context) {
    axios.post(`/api/profile/${context.auth.info._id}/intro`, {intro: value})
    .then(() => {
        context.disableGray()
        context.fetchProfile(context.auth.info._id)
        context.fetchUser();
        sendMessage("success", "プロフィールの内容を変更しました。", 3000, context)
        return
    })
    .catch(err => {
        context.disableGray()
        console.log(err)
        return
    })
}