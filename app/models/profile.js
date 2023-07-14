const db = require("../../config/dbConfig")
const { Sequelize, Model, DataTypes } = require("sequelize")
// const Picture = require("./picture");

const Profile = db.define("profiles", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING
    },
    relationship: {
        type: DataTypes.STRING,
    },
    dob: {
        type: DataTypes.DATEONLY,
    },
    bio: {
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: require("./user"),
            key: "id",
            onDelete: "cascade",
            onUpdate: "cascade",
        },
    },
    picture_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: require("./picture"),
            key: "id",
            onDelete: "cascade",
            onUpdate: "cascade",
        }
    }
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

module.exports = Profile