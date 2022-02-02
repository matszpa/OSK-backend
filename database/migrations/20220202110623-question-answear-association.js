"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("answers", {
      fields: ["answerId"],
      type: "foreign key",
      name: "question_answear_associations",
      references: {
        table: "questions",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("answers", {
      fields: ["answerId"],
      type: "foreign key",
      name: "question_answear_associations",
      references: {
        table: "questions",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
};
