'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class examHistory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            examHistory.belongsTo(models.user, {
                foreignKey: "studentId", targetKey: "id",
            })
            models.user.hasMany(examHistory, {foreignKey: "studentId"});
            examHistory.belongsTo(models.licenceCategory, {
                foreignKey: "categoryId", targetKey: "id",
            })
            models.licenceCategory.hasMany(examHistory, {foreignKey: "categoryId"})
        }
    }

    examHistory.init({
        studentId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        scoredPoints: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'examHistory',
    });
    return examHistory;
};