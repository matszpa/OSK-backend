"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "licencecategories",
      [
        {
          id: 1,
          name: "A",
        },
        {
          id: 2,
          name: "B",
        },
        {
          id: 3,
          name: "C",
        },
        {
          id: 4,
          name: "D",
        },
        {
          id: 5,
          name: "T",
        },
        {
          id: 6,
          name: "AM",
        },
        {
          id: 7,
          name: "A1",
        },
        {
          id: 8,
          name: "A2",
        },
        {
          id: 9,
          name: "B1",
        },
        {
          id: 10,
          name: "C1",
        },
        {
          id: 11,
          name: "D1",
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
