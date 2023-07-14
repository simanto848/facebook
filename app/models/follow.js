const db = require("../../config/dbConfig")
const { Sequelize, Model, DataTypes } = require("sequelize")
const User = require("./user")
const Profile = require("./profile")

const Follow = db.define("follows", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
            onDelete: "cascade",
            onUpdate: "cascade",
        },
    },
    following_id: {
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
    updatedAt: "updated_at",
})

User.hasMany(Follow, {foreignKey: "follower_id", as: "followers"})
Follow.belongsTo(User, {foreignKey: "follower_id", as: "followers"})

User.hasMany(Follow, {foreignKey: "following_id", as: "followings"})
Follow.belongsTo(User, {foreignKey: "following_id", as: "followings"})

Profile.hasMany(Follow, {foreignKey: "follower_id", as: "followerProfiles"})
Follow.belongsTo(Profile, {foreignKey: "follower_id", as: "followerProfiles"})

Profile.hasMany(Follow, {foreignKey: "following_id", as: "followingProfiles"})
Follow.belongsTo(Profile, {foreignKey: "following_id", as: "followingProfiles"})


module.exports = Follow