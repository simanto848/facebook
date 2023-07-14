const router = require("express").Router()
const { ensure_auth, ensure_guest } = require("../app/middlewares/auth")
const HomeController = require("../app/controllers/HomeController")

router.get("/", ensure_auth, HomeController.index)

module.exports = router