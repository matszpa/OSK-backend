'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addConstraint(
                "examHistories",
                {
                    fields: ["studentId"],
                    type: "foreign key",
                    name: "studentIdHistoryFK",
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
                "examHistories",
                {
                    fields: ["categoryId"],
                    type: "foreign key",
                    name: "categoryIdHistoryFK",
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
                "examHistories",
                "studentIdHistoryFK"
            );
            await queryInterface.removeConstraint(
                "examHistories",
                "categoryIdHistoryFK"
            );
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
        }
    }
};
