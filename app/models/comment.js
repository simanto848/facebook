const db = require("../../config/dbConfig")
const { Model, DataTypes } = require("sequelize")
const User = require("./user")

const Comment = db.define("comments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: require("./post"),
            key: "id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: require("./user"),
            key: "id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

User.hasMany(Comment, {foreignKey: "user_id", as: "comments"})
Comment.belongsTo(User, {foreignKey: "user_id", as: "user"})


module.exports = Comment