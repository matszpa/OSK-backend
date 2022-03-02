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
            trainingId: {
                type: Sequelize.INTEGER
            },
            instructorId: {
                type: Sequelize.INTEGER
            },
            day: {
                type: Sequelize.DATE
            },
            hour: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.ENUM("Nowa", "Zrealizowana", "Anulowana"),
                defaultValue: "Nowa",
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