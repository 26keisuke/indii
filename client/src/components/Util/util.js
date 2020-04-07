import React, { useMemo } from "react"
import { Node } from 'slate'

import response from "../../images/response.png";
import dissapointed from "../../images/dissapointed.png";
import love from "../../images/love.png";
import good from "../../images/good.png";
import nerd from "../../images/nerd.png";
import hmm from "../../images/hmm.png";

import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedOutlinedIcon from '@material-ui/icons/FormatUnderlinedOutlined';
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';
import { FaSuperscript } from "react-icons/fa"
import LooksOneOutlinedIcon from '@material-ui/icons/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@material-ui/icons/LooksTwoOutlined';
import FormatQuoteOutlinedIcon from '@material-ui/icons/FormatQuoteOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import FunctionsOutlinedIcon from '@material-ui/icons/FunctionsOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

export function getEditorContent(content, length){

    if(!content) return ""

    const nodes = JSON.parse(content).children
    const text = nodes.map(n => Node.string(n))

    const paragraph = text.join("\t")

    if(length) return paragraph.substring(0, length)

    return paragraph
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

// 後でこいつを消すこと
export function checkAuth(e, context, loggedIn) {
    var isAuthenticated;

    if(typeof(loggedIn) === "boolean"){
        isAuthenticated = loggedIn
    } else {
        isAuthenticated = context.auth.loggedIn
    }

    if(!isAuthenticated) {
        e.preventDefault() // こいつはこのbranchの中！！
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

export const renderIcon = (icon) => {
    switch(icon){
        case "bold":
            return <FormatBoldIcon/>
        case "italic":
            return <FormatItalicIcon/>
        case "underline":
            return <FormatUnderlinedOutlinedIcon/>
        case "code":
            return <CodeOutlinedIcon/>
        case "superscript":
            return <FaSuperscript/>
        case "heading-one":
            return <LooksOneOutlinedIcon/>
        case "heading-two":
            return <LooksTwoOutlinedIcon/>
        case "block-quote":
            return <FormatQuoteOutlinedIcon/>
        case "numbered-list":
            return <FormatListNumberedOutlinedIcon/>
        case "bulleted-list":
            return <FormatListBulletedOutlinedIcon/>
        case "katex":
            return <FunctionsOutlinedIcon/>
        case "image":
            return <ImageOutlinedIcon/>
        case "table":
            return <TableChartOutlinedIcon/>
        default:
            return ""
    }
}


export const renderTitle = (format) => {
    switch(format){
        case "bold":
            return "太字"
        case "italic":
            return "イタリック体"
        case "underline":
            return "下線"
        case "code":
            return "コード"
        case "superscript":
            return "上付き文字"
        case "heading-one":
            return "見出し"
        case "heading-two":
            return "小見出し"
        case "block-quote":
            return "引用"
        case "numbered-list":
            return "順序付きリスト"
        case "bulleted-list":
            return "リスト"
        default:
            return ""
    }
}
// customFoundAction:: [ifFound::function(found, set){ return newSet }, ifNotFound::function(set){ return newSet }]
// fmt:: function(found){ return any }
export const useUpdater = (loggedIn, lookUpArr, idLookUp, targetId, storageName, postAction, customFoundAction, fmtValue) => {
    const find = () => {
        var res;

        lookUpArr.map((obj,index) => {
            if(obj[idLookUp] === targetId){
                res = {
                    data: obj,
                    index: index,
                }
            }
        })

        if(!!res) return res

        return ""
    }

    const handleClick = (e) => {
        e && e.preventDefault()

        var set = lookUpArr.slice()

        const found = find()
        if(!!found){
            if(customFoundAction && customFoundAction[0]){
                set = customFoundAction[0](found, set)
            } else {
                set.splice(found.index, 1)
            }
        } else {
            if(customFoundAction && customFoundAction[1]){
                set = customFoundAction[1](set)
            } else {
                set.push({timeStamp: Date.now(), [idLookUp]: targetId})
            }
        }

        postAction(set)
        localStorage.setItem(storageName, JSON.stringify(set))
    }

    const isTrue = useMemo(() => loggedIn && fmtValue ? fmtValue(find()) : !!(find()), [loggedIn, lookUpArr, idLookUp])

    return [isTrue, handleClick]
}