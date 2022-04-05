"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {
        }
    }

    user.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.INTEGER,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM("ADMIN", "INSTRUCTOR", "STUDENT"),
                defaultValue: "STUDENT",
            },
        },
        {
            sequelize,
            modelName: "user",
            timestamps: false,
        }
    );
    return user;
};
