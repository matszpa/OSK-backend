"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("answers", {
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
    queryInterface.removeConstraint("answers", {
      fields: ["answerId"],
      type: "foreign key",
      name: "question_answear_associations",
      references: {
        table: "questions",
        field: "id",
      },
    });
  },
};
