const Post = require("../models/post")
const User = require("../models/user")
const FileUpload = require("../helpers/FileUpload")

const create = async (req, res) => {
    try{
        const { text } = req.body
        const { user } = req.session
        if (!text) {
            return res.status(400).json({ message: "Text is required" })
        }
        const image_file = req.files
        const image_name = await FileUpload(image_file, "uploads/posts/", "post_image")
        console.log("image_name", image_name)
        const post = await Post.create({ text, image: image_name, user_id: user.id })
        return res.status(201).redirect("/home")
    } catch (error){
        return res.status(500).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try{
        const { text } = req.body
        const post_id = req.params
        const { user } = req.session.user

        const post = await Post.findOne(
            { where: { id: post_id } }
        )
        if(post){
            if(post.user_id === user.id){
                const update_post = await  Post.update(
                    { text: text }, {
                        where: { id: post_id }
                    })
                return res.status(200).json({ message: "Post updated successfully" })
            }
        }
        else {
            return res.status(404).json({ message: "Post not found" })
        }
    } catch (error){
        return res.status(500).json({ message: error.message })
    }
}

const destroy = async (req, res) => {
    try {
        const post_id = req.params
        const { user } = req.session.user

        const post = await Post.findOne({
            where: {id: post_id}
        })
        if(post) {
            if(post.user_id === user.id){
                const destroy_post = await Post.destroy({
                    where: {id: post_id}
                })
                return res.status(200).json({ message: "Post deleted successfully" })
            }
            else {
                return res.status(403).json({message: "You are not authorized to delete this post"})
            }
        }
        else {
            return res.status(404).json({message: "Post not found"})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    create,
    update,
    destroy
}