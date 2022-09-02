'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class lecturePresence extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            lecturePresence.belongsTo(models.lecture, {
                foreignKey: "lectureId", targetKey: "id",
            })
            models.lecture.hasMany(lecturePresence, {foreignKey: "lectureId"});
            lecturePresence.belongsTo(models.training, {
                foreignKey: "trainingId", targetKey: "id",
            })
            models.training.hasMany(lecturePresence, {foreignKey: "trainingId"})
        }
    }

    lecturePresence.init({
        lectureId: DataTypes.INTEGER,
        trainingId: DataTypes.INTEGER,
        isPresent: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'lecturePresence',
        timestamps: false,
    });
    return lecturePresence;
};