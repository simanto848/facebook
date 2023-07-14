const db = require("../../config/dbConfig")
const { Model, DataTypes } = require("sequelize")
const Post = require("./post")
const User = require("./user")

const React = db.define("reacts", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    react: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    love: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    haha: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    wow: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    sad: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    angry: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: "id",
            onDelete: "cascade",
            onUpdate: "cascade",
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
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
    updatedAt: "updated_at",
})

Post.hasMany(React, { foreignKey: "post_id", as: "reacts" })
React.belongsTo(Post, { foreignKey: "post_id", as: "post" })

module.exports = React