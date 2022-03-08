'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addConstraint(
                "lectures",
                {
                    fields: ["instructorId"],
                    type: "foreign key",
                    name: "instructorIdLectureFK",
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
                "lectures",
                {
                    fields: ["categoryId"],
                    type: "foreign key",
                    name: "categoryIdLectureFK",
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
                "lectures",
                "instructorIdLectureFK"
            );
            await queryInterface.removeConstraint(
                "lectures",
                "categoryIdLectureFK"
            );
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
        }
    }
};
