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
            driving.belongsTo(models.training, {foreignKey: "trainingId"})
            models.training.hasMany(driving, {foreignKey: "trainingId"})
            driving.belongsTo(models.user, {foreignKey: "instructorId"})
            models.user.hasMany(driving, {foreignKey: "instructorId"})
        }
    }

    driving.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        trainingId: DataTypes.INTEGER,
        instructorId: DataTypes.INTEGER,
        day: DataTypes.DATE,
        hour: DataTypes.INTEGER,
        status: {
            type: DataTypes.ENUM("Nowa", "Zrealizowana", "Anulowana"),
            defaultValue: "Nowa",
        },
        comment: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'driving',
        timestamps: false
    });
    return driving;
};