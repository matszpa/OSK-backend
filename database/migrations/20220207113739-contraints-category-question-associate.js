"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint(
        "category_questions",
        {
          fields: ["questionId"],
          type: "foreign key",
          name: "questionManytoMany",
          references: {
            table: "questions",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        { transaction }
      );
      await queryInterface.addConstraint(
        "category_questions",
        {
          fields: ["licenceCategoryId"],
          type: "foreign key",
          name: "licenceCategoryManytoMany",
          references: {
            table: "licenceCategories",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
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
      await queryInterface.removeConstraint(
        "category_questions",
        "questionManytoMany"
      );
      await queryInterface.removeConstraint(
        "category_questions",
        "licenceCategoryManytoMany"
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
};
