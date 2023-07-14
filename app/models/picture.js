const db = require("../../config/dbConfig");
const { Sequelize, Model, DataTypes } = require("sequelize");
const User = require("./user")

const Picture = db.define("pictures",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
        },
        is_profile_picture: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);


module.exports = Picture;
