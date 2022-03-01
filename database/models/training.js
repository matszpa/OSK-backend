'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class training extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            training.belongsTo(models.user, {
                foreignKey: "studentId", targetKey: "id", through: training,
            })
            training.belongsTo(models.licenceCategory, {
                foreignKey: "categoryId", targetKey: "id", through: training,
            })
            models.user.hasMany(training, {foreignKey: "studentId"});
            models.licenceCategory.hasMany(training, {foreignKey: "categoryId"});
            // models.user.belongsToMany(models.licenceCategory, {
            //     through: training,
            //     foreignKey: "studentId",
            //     targetKey: "id"
            // })
            // models.licenceCategory.belongsToMany(models.user, {
            //     through: training,
            //     foreignKey: "categoryId",
            //     targetKey: "id"
            // })
        }
    }

    training.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        studentId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        drivingHours: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        paid: DataTypes.INTEGER,
        totalCost: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'training',
        timestamps: false,
    });
    return training;
};