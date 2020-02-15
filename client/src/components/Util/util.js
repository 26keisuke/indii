export function validateEmail(value){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
        return true;
    }
        return false;
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

export function checkOwnership(context) {
    
}