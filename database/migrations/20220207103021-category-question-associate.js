"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Product belongsToMany Tag
    return queryInterface.createTable("CategoryQuestions", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      licenceCategoryId: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      questionId: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable("CategoryQuestions");
  },
};
