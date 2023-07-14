const ensure_auth = (req, res, next) => {
    if(req.session.user){
        next()
    }
    else {
        req.session.message = {
            type: "warning",
            message: "Please login first",
        }
        return res.status(409).redirect("/")
    }
}

const ensure_guest = (req, res, next) => {
    if(req.session.user){
        req.session.message = {
            type: "warning",
            message: "You are already logged in",
        }
        return res.status(409).redirect("/home")
    }
    else {
        next()
    }
}

module.exports = {
    ensure_auth,
    ensure_guest
}