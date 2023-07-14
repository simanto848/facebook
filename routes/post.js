const router = require("express").Router()
const { ensure_auth, ensure_guest } = require("../app/middlewares/auth")
const PostController = require("../app/controllers/PostController")

router.post("/create", ensure_auth, PostController.create)

module.exports = router