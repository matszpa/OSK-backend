'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class driving extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    driving.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        coursantId: DataTypes.INTEGER,
        trainingId: DataTypes.INTEGER,
        instructorId: DataTypes.INTEGER,
        startDate: DataTypes.DATE,
        numberHours: DataTypes.INTEGER,
        status: DataTypes.STRING,
        comment: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'driving',
        timestamps: false
    });
    return driving;
};