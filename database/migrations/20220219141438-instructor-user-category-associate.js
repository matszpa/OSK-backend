'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addConstraint(
                "instructors",
                {
                    fields: ["instructorId"],
                    type: "foreign key",
                    name: "instructorIdFK",
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
                "instructors",
                {
                    fields: ["categoryId"],
                    type: "foreign key",
                    name: "categoryIdForInstructorFK",
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
                "instructors",
                "categoryIdForInstructorFK"
            );
            await queryInterface.removeConstraint(
                "instructors",
                "instructorIdFK"
            );
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
        }
    },
};
