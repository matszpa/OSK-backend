"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable(
                "users",
                {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                    },
                    firstName: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    lastName: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    phoneNumber: {
                        type: Sequelize.INTEGER,
                    },
                    password: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    email: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    role: {
                        type: Sequelize.ENUM("ADMIN", "INTRUCTOR", "STUDENT"),
                        defaultValue: "STUDENT",
                    },
                    createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                    },
                    updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                    },
                },
                {transaction}
            );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
        }
    },
    async down(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.dropTable("users");
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
        }
    },
};
