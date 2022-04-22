'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('examHistories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            studentId: {
                type: Sequelize.INTEGER
            },
            categoryId: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            scoredPoints: {
                type: Sequelize.INTEGER
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('examHistories');
    }
};