"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      type: Sequelize.STRING,
      points: Sequelize.INTEGER,
    },
    {
      sequelize,
      modelName: "question",
    }
  );
  return question;
};
