const db = require("../../config/dbConfig")
const { Model, DataTypes } = require("sequelize")
const Profile = require("./profile");

const share_post = db.define("share_post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    image: {
        type: DataTypes.STRING
    },
    is_profile_picture: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Profile,
            key: "id",
            onDelete: "cascade",
            onUpdate: "cascade",
        },
    },
},{
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

module.exports = share_post