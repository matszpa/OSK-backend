"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("answers", {
      fields: ["questionId"],
      type: "foreign key",
      name: "questionanswearassociations",
      references: {
        table: "questions",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "answers",
      "questionanswearassociations"
    );
  },
};
