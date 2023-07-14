const db = require("../../config/dbConfig")
const { DataTypes } = require("sequelize")
const User = require("./user")

const Post = db.define("posts", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
            onDelete: "cascade",
            onUpdate: "cascade",
        },
    },
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

User.hasMany(Post, {foreignKey: "user_id", as: "posts"})
Post.belongsTo(User, {foreignKey: "user_id", as: "user"})


module.exports = Post