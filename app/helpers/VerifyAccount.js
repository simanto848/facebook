const User = require("../models/user")

// -------- Verify Account --------
const verify_account = async (req, res) => {
    try{
        const token = req.query.token
        const status = "active"
        const verified = "verified"
        const verify_user = await User.update({
            verify_token: verified,
            status: status
        },{
            where: { verify_token: token }
        })
        if (verify_user){
            req.session.message = {
                type: "success",
                intro: "Account verified",
                message: "Your account has been verified. You can now login."
            }
            res.redirect("/")
        }
        else {
            req.session.message = {
                type: "warning",
                intro: "Invalid link",
                message: "The link you followed is invalid or expired."
            }
            return res.redirect("/")
        }
    } catch (error) {
        req.session.message = {
            type: "warning",
            intro: "Invalid link",
            message: "The link you followed is invalid or expired."
        }
        return res.redirect("/")
    }
}

module.exports = verify_account