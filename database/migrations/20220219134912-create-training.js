'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('trainings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            coursantId: {
                type: Sequelize.INTEGER
            },
            categoryId: {
                type: Sequelize.INTEGER
            },
            startDate: {
                type: Sequelize.DATE
            },
            endDate: {
                type: Sequelize.DATE
            },
            drivingHours: {
                type: Sequelize.INTEGER
            },
            paid: {
                type: Sequelize.INTEGER
            },
            totalCost: {
                type: Sequelize.INTEGER
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('trainings');
    }
};