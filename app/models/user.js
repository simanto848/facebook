const db = require("../../config/dbConfig")
const { DataTypes } = require("sequelize")

const User = db.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verify_token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        allowNull: false,
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

module.exports = User