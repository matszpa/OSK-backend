"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class question extends Model {
        static associate(models) {
            question.belongsToMany(models.licenceCategory, {
                foreignKey: "licenceCategoryId",
                through: "category_questions",
            });

        }
    }
    question.init(
        {
            question: DataTypes.STRING,
            image: DataTypes.STRING,
            type: DataTypes.STRING,
            points: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "question",
            timestamps: false,
        }
    );
    return question;
};
