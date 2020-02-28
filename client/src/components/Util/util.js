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

    const y = now.getFullYear() - date.getFullYear()
    const m = now.getMonth() - date.getMonth()
    const d = now.getDate() - date.getDate()
    const h = now.getHours() - date.getHours()
    const mi = now.getMinutes() - date.getMinutes()

    const yearDiff = y === 0
    const monthDiff = m === 0
    const dateDiff = d === 0
    const hourDiff = h === 0

    if (yearDiff && monthDiff && dateDiff && hourDiff && (mi <= 3)) {
        return "たった今"
    } else if(yearDiff && monthDiff && dateDiff && hourDiff) {
        return String(mi) + "分前"
    } else if (yearDiff && monthDiff && dateDiff) {
        return String(h) + "時間前"
    } else if (yearDiff && monthDiff) {
        return String(d) + "日前"
    } else if (yearDiff) {
        return String(m) + "ヶ月前"
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

export function sendMessage(type, message, duration, context) {
    context.updateMessage(type, message);
    setTimeout(() => context.resetMessage(), duration)
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