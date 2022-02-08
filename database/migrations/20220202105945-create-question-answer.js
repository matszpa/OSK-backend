"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "answers",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          content: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          correct: {
            type: Sequelize.BOOLEAN,
          },
          questionId: {
            type: Sequelize.INTEGER,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        "questions",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          question: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          image: {
            type: Sequelize.STRING,
          },
          type: Sequelize.STRING,
          points: Sequelize.INTEGER,
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("questions");
      await queryInterface.dropTable("answers");
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
};
