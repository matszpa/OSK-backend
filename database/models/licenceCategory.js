"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class licenceCategory extends Model {
    static associate(models) {
      licenceCategory.belongsToMany(models.question, {
        foreignKey: "questionId",
        through: "category_questions",
      });
    }
  }
  licenceCategory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "licenceCategory",
      timestamps: false,
    }
  );
  return licenceCategory;
};
