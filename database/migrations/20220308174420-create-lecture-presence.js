'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('lecturePresences', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            lectureId: {
                type: Sequelize.INTEGER
            },
            trainingId: {
                type: Sequelize.INTEGER
            },
            isPresent: {
                type: Sequelize.BOOLEAN
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('lecturePresences');
    }
};