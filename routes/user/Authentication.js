const router = require("express").Router()
const UserController = require("../../app/controllers/users/UserController")
const AuthenticationController = require("../../app/controllers/users/AuthenticationController")
const VerifyAccount = require("../../app/helpers/VerifyAccount")


router.get("/", UserController.login)
router.post("/", AuthenticationController.login)
router.get("/register", UserController.register)
router.post("/register", AuthenticationController.register)
router.get("/verify-account", VerifyAccount)

module.exports = router