'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addConstraint(
                "drivings",
                {
                    fields: ["instructorId"],
                    type: "foreign key",
                    name: "instructorIdDrivingFK",
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
                "drivings",
                {
                    fields: ["trainingId"],
                    type: "foreign key",
                    name: "trainingIdDrivingFK",
                    references: {
                        table: "trainings",
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
                "drivings",
                "trainingIdDrivingFK"
            );
            await queryInterface.removeConstraint(
                "drivings",
                "instructorIdDrivingFK"
            );
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
        }
    },
};
