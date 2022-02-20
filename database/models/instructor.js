'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class instructor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.user.belongsToMany(models.licenceCategory, {
                through: instructor,
                foreignKey: "instructorId",
                targetKey: "id"
            })

            models.licenceCategory.belongsToMany(models.user, {
                through: instructor,
                foreignKey: "categoryId",
                targetKey: "id"
            })
        }
    }

    instructor.init({
        instructorId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
    }, {
        sequelize,
        modelName: 'instructor',
        timestamps: false,
    });
    return instructor;
};