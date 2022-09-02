'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('instructors', {
            instructorId: {
                type: Sequelize.INTEGER
            },
            categoryId: {
                type: Sequelize.INTEGER
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('instructors');
    }
};