const User = require("../../models/user")
const bcrypt = require("bcrypt")
const GenerateToken = require("../../helpers/GenerateToken")
const sendEmail = require("../../helpers/mail")
const {Op} = require("sequelize");

// ------ LOGIN USER ------
const login = async (req, res) => {
    try{
        if (req.method === "POST"){
            const { username, password } = req.body
            if (!username || !password){
                req.session.message = {
                    type: "warning",
                    message: "Please fill all fields",
                }
                return res.status(409).redirect("/")
            }
            else {
                const user = await User.findOne({
                    where: {
                        [Op.or]: [
                            {username: username},
                            {email: username}
                        ]
                    }
                })
                if(! await bcrypt.compare(password, user.password)){
                    req.session.message = {
                        type: "warning",
                        message: "Invalid credentials",
                    }
                    return res.status(409).redirect("/")
                }
                else {
                    if(user.status === "pending"){
                        req.session.message = {
                            type: "warning",
                            message: "Please verify your account",
                        }
                        return res.status(409).redirect("/")
                    }
                    else {
                        req.session.user = {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            is_admin: user.is_admin,
                        }
                        return res.status(200).redirect("/home")
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


// ------ REGISTER USER ------
const register = async (req, res) => {
    try{
        if (req.method === "POST"){
            const { username, email, password, confirm_password } = req.body
            const user_email = await User.findOne({ where: { email } })
            if(!username || !email || !password || !confirm_password){
                req.session.message = {
                    type: "warning",
                    message: "Please fill all fields",
                }
                return res.status(409).redirect("/register")
            }
            else if(user_email){
                req.session.message = {
                    type: "warning",
                    message: "Email already exists",
                }
                return res.status(409).redirect("/register")
            }
            else {
                const user_username = await User.findOne({ where: { username } })
                if(user_username){
                    req.session.message = {
                        type: "warning",
                        message: "Username already exists",
                    }
                    return res.status(409).redirect("/register")
                }
                else {
                    if(password !== confirm_password){
                        req.session.message = {
                            type: "warning",
                            message: "Passwords do not match",
                        }
                        return res.status(409).redirect("/register")
                    }
                    else {
                        const hashed_password = await bcrypt.hash(password, 10)
                        const token = GenerateToken(10)
                        const new_user = await User.create({
                            username: username,
                            email: email,
                            password: hashed_password,
                            verify_token: token,
                        })
                        if(new_user){
                            const url = `http://localhost:5000/verify-account?token=${token}`
                            await sendEmail(email, url)
                            req.session.message = {
                                type: "success",
                                message: "User created successfully",
                            }
                            return res.status(201).redirect("/")
                        }
                        else {
                            req.session.message = {
                                type: "warning",
                                message: "User not created",
                            }
                            return res.status(409).redirect("/register")
                        }
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


module.exports = {
    register,
    login
}