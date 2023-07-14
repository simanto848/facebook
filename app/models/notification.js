const db = require("../../config/dbConfig")
const { Model, DataTypes} = require("sequelize")
const User = require("./user")

const Notification = db.define("notifications", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
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
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

User.hasMany(Notification, { foreignKey: "user_id", as: "notifications" })
Notification.belongsTo(User, { foreignKey: "user_id", as: "user" })

module.exports = Notification