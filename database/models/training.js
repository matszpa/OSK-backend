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
            // define association here
        }
    }

    training.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        coursantId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        drivingHours: DataTypes.INTEGER,
        paid: DataTypes.INTEGER,
        totalCost: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'training',
        timestamps: false,
    });
    return training;
};