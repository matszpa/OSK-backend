"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("category_questions", {
      questionId: {
        type: Sequelize.INTEGER,
      },
      licenceCategoryId: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("category_questions");
  },
};
