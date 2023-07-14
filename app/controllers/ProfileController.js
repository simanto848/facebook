const User = require("../models/user")
const Profile = require("../models/profile")
const Picture = require("../models/picture")
const Post = require("../models/post")
const Comment = require("../models/comment")
const Like = require("../models/like")
const Follow = require("../models/follow")
const Notification = require("../models/notification")
const { Op } = require("sequelize")

const { logged_user } = req.session.user

const user = await User.findOne({
    where: { id: logged_user}
})
const user_profile = await Profile.findOne({
    where: { user_id: logged_user }
})
const user_profile_picture = await Picture.findOne({
    where: {
        [Op.and]: [
            { user_id: user.id },
            { is_profile_picture: true }
        ]
    }
})
const user_posts = await Post.findAll({})