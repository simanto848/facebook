const router = require("express").Router()
const User = require("./user/index")
const Home = require("./home")
const Post = require("./post")
const Logout = require("../app/middlewares/logout")

router.use("/", User)
router.use("/home", Home)
router.use("/post", Post)
router.get("/logout", Logout)

module.exports = router