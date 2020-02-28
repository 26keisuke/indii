export function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("NOT AUTHENTICATED")
    return res.send("NO_AUTH")
}