import React from "react"
import BraftEditor from 'braft-editor'

import response from "../../images/response.png";
import dissapointed from "../../images/dissapointed.png";
import love from "../../images/love.png";
import good from "../../images/good.png";
import nerd from "../../images/nerd.png";
import hmm from "../../images/hmm.png";

export function getBraftSummary(content, length){
    BraftEditor.createEditorState(content).toText().replace(/a\s/g, "").substring(0, length)
}

export function validateEmail(value){
    // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){ <- これだと、長いinputだと死ぬ
    if(/(.+)@(.+){2,}\.(.+){2,}/.test(value)){
        return true;
    }
        return false;
}

export function fmtDate(time) {
    const date = new Date(time)
    const now = new Date()

    const daysInMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const y = now.getFullYear() - date.getFullYear()
    const m = now.getMonth() - date.getMonth()
    const overM = now.getMonth() + 12 - date.getMonth()
    const d = now.getDate() - date.getDate()
    const overD = now.getDate() + daysInMonth - date.getDate()
    const h = now.getHours() - date.getHours()
    const overH = now.getHours() + 24 - date.getHours()
    const mi = now.getMinutes() - date.getMinutes()
    const overMi = now.getMinutes() + 60 - date.getMinutes()
    
    const yearDiff = y === 0
    const yearOverDiff = y === 1
    const monthDiff = m === 0
    const monthOverDiff = m === 1
    const dateDiff = d === 0
    const dateOverDiff = d === 1
    const hourDiff = h === 0
    const hourOverDiff = h === 1

    if (yearDiff && monthDiff && dateDiff && hourDiff && (mi <= 3)) {
        return "たった今"
    } else if(yearDiff && monthDiff && dateDiff && hourDiff) {
        return String(mi) + "分前"
    } else if(yearDiff && monthDiff && dateDiff && hourOverDiff && (overMi < 60)) {
        return String(overMi) + "分前"
    } else if (yearDiff && monthDiff && dateDiff) {
        return String(h) + "時間前"
    } else if (yearDiff && monthDiff && dateOverDiff && (overH < 24)){
        return String(overH) + "時間前"
    } else if (yearDiff && monthDiff) {
        return String(d) + "日前"
    } else if (yearDiff && monthOverDiff && (overD < daysInMonth)) {
        return String(overD) + "日前"
    } else if (yearDiff) {
        return String(m) + "ヶ月前"
    } else if (yearOverDiff && (overM < 12)) {
        return String(overM) + "ヶ月前"
    } else {
        const fmtDate = String(date.getFullYear()) + "年" + String(date.getMonth() + 1) + "月" + String(date.getDate()) + "日"
        return fmtDate
    }
}

// onClick event
export function checkAuth(e, context) {
    const isAuthenticated = context.auth.loggedIn
    if(!isAuthenticated) {
        e.preventDefault()
        context.showLogin()
        return false
    }
    return true
}

export function arrObjLookUp(obj, field, attr){
    for(var i=0; i < obj.length; i++){
        if(obj[i][field] === attr){
            return obj[i]
        }
    }
    return
}

export function deepCopyArrOfObj(obj){
    const newObj = JSON.parse(JSON.stringify(obj))
    return newObj
}

export function renderType(type){
    switch(type){
        case "Edit":
            return "編集"
        case "Zero":
            return "編集"
        case "New":
            return "新規作成"
    }
}

export function getEmoji(emojiNum){
    switch(emojiNum){
        case "5":
        case 5:
            return <img className="post-feed-response"　alt={"ものすごく良い"} src={love}/>
        case "4":
        case 4:
            return <img className="post-feed-response"　alt={"とても良い"}src={good}/>
        case "3":
        case 3:
            return <img className="post-feed-response"　alt={"かなり良い"} src={nerd}/>
        case "2":
        case 2:
            return <img className="post-feed-response"　alt={"まぁまぁ"} src={hmm}/>
        case "1":
        case 1:
            return <img className="post-feed-response"　alt={"残念"} src={dissapointed}/>
        default:
            return <img className="post-feed-response"　alt={"フィードバックのアイコンを表示する"} src={response}/>
    }
}