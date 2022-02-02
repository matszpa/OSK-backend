"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("answers", {
      fields: ["answerId"],
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
    queryInterface.removeConstraint("answers", "questionanswearassociations");
  },
};
