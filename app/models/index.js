const db = require("../../config/dbConfig")
const Admin = require("./admin")
const User = require("./user")
const Profile = require("./profile")
const Picture = require("./picture")
const Post = require("./post")
const Comment = require("./comment")
const Like = require("./like")
const Follow = require("./follow")
const Notification = require("./notification")

const models = db
    .sync({alter: true})
    .then((result) => {
        console.log("Database synced")
    })
    .catch((error) => {
        console.log(error)
    })

module.exports = models