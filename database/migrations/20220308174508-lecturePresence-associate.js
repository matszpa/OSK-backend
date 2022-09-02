'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addConstraint(
                "lecturePresences",
                {
                    fields: ["lectureId"],
                    type: "foreign key",
                    name: "lectureIdPresenceFK",
                    references: {
                        table: "lectures",
                        field: "id",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                },
                {transaction}
            );
            await queryInterface.addConstraint(
                "lecturePresences",
                {
                    fields: ["trainingId"],
                    type: "foreign key",
                    name: "trainingIdPresenceFK",
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
                "lecturePresences",
                "lectureIdPresenceFK"
            );
            await queryInterface.removeConstraint(
                "lecturePresences",
                "trainingIdPresenceFK"
            );
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
        }
    }
};
