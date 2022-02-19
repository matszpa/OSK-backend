'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('drivings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            coursantId: {
                type: Sequelize.INTEGER
            },
            trainingId: {
                type: Sequelize.INTEGER
            },
            instructorId: {
                type: Sequelize.INTEGER
            },
            startDate: {
                type: Sequelize.DATE
            },
            numberHours: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING
            },
            comment: {
                type: Sequelize.STRING
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('drivings');
    }
};