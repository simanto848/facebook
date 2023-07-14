const router = require("express").Router()
const Authentication = require("./Authentication")

router.use("/", Authentication)

module.exports = router