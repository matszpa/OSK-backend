'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('lectures', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE
            },
            instructorId: {
                type: Sequelize.INTEGER
            },
            categoryId: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.ENUM("Zaplanowany", "Odwołany", "Ukończony"),
                defaultValue: "Zaplanowany",
            },
            topic: {
                type: Sequelize.STRING
            },
            duration: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('lectures');
    }
};