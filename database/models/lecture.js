'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class lecture extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            lecture.belongsTo(models.user, {
                foreignKey: "instructorId", targetKey: "id",
            })
            models.user.hasMany(lecture, {foreignKey: "studentId"});
            lecture.belongsTo(models.licenceCategory, {
                foreignKey: "categoryId", targetKey: "id",
            })
            models.licenceCategory.hasMany(lecture, {foreignKey: "categoryId"})
        }
    }

    lecture.init({
        date: DataTypes.DATE,
        instructorId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        status: DataTypes.STRING,
        topic: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'lecture',
    });
    return lecture;
};