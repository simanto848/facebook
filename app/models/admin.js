const db = require("../../config/dbConfig")
const { DataTypes} = require("sequelize")

const Admin = db.define("admins", {
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
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    }
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

module.exports = Admin