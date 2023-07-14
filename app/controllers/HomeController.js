const Profile = require("../models/profile")
const Picture = require("../models/picture")
const Post = require("../models/post")
const Comment = require("../models/comment")
const Like = require("../models/like")
const Follow = require("../models/follow")
const Notification = require("../models/notification")
const { Op } = require("sequelize")
const User = require("../models/user");

const index = async (req, res) => {
    const id = req.session.user.id

    const user = await User.findOne({
        where: { id: id }
    })
    const user_profile = await Profile.findOne({
        where: { user_id: id}
    })
    const user_profile_picture = await Picture.findOne({
        where: {
            [Op.and]: [
                { user_id: id },
                { is_profile_picture: true }
            ]
        }
    })
    const posts = await Post.findAll({})

    res.render('home',{
        user: user,
        user_profile: user_profile,
        user_profile_picture: user_profile_picture,
        posts: posts
    })
}

module.exports = {
    index
}