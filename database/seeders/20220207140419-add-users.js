"use strict";

const bcrypt = require("bcryptjs/dist/bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("users", [
            {
                firstName: "Adam",
                lastName: "Zielony",
                password: await bcrypt.hash("adminadmin", 10),
                email: "admin@admin.pl",
                role: "ADMIN",
            }
        ]);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
