"use strict";

const bcrypt = require("bcryptjs/dist/bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert("users", [
            {
                firstName: "Adam",
                lastName: "Zielony",
                password: await bcrypt.hash("admin", 10),
                email: "admin@admin.pl",
                role: "ADMIN",
            },
            {
                firstName: "Tomek",
                lastName: "Niebieski",
                password: await bcrypt.hash("admin", 10),
                email: "kursant@kursant.pl",
                role: "STUDENT",
            },
            {
                firstName: "Marcin",
                lastName: "Fioletowy",
                password: await bcrypt.hash("admin", 10),
                email: "instruktor@instruktor.pl",
                role: "INTRUCTOR",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("users", null, {});
    },
};
