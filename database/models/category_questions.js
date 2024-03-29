"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class category_questions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            category_questions.belongsTo(models.question, {
                through: "category_questions",
            });
            category_questions.belongsTo(models.licenceCategory, {
                through: "category_questions",
            });
            // category_questions.belongsTo(models.question, {
            //   foreignKey: "questionId",
            // });
            // category_questions.belongsTo(models.licenceCategory, {
            //   foreignKey: "licenceCategoryId",
            // });
        }
    }

    category_questions.init(
        {
            questionId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            licenceCategoryId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: "category_question",
            timestamps: false,
        }
    );
    return category_questions;
};
