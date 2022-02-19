'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addConstraint(
                "trainings",
                {
                    fields: ["coursantId"],
                    type: "foreign key",
                    name: "coursantIdFK",
                    references: {
                        table: "users",
                        field: "id",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                },
                {transaction}
            );
            await queryInterface.addConstraint(
                "trainings",
                {
                    fields: ["categoryId"],
                    type: "foreign key",
                    name: "categoryIdFK",
                    references: {
                        table: "licencecategories",
                        field: "id",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
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
            await queryInterface.removeConstraint(
                "trainings",
                "categoryIdFK"
            );
            await queryInterface.removeConstraint(
                "trainings",
                "coursantIdFK"
            );
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
        }
    },
};
