const db = require("../database/models");
const {Op} = require("sequelize");

exports.categoryList = async (req, res) => {
    try {
        var list = await db.licenceCategory.findAll();
        res.send(list);
    } catch (err) {
        res.send(err);
    }
};

exports.categoryListForStudent = async (req, res) => {
    try {
        var userTrainings = await db.training.findAll({attributes: ['categoryId'], where: {studentId: req.user_id}})
        const catIds = userTrainings.map((t) => t.categoryId);
        var list = await db.licenceCategory.findAll({
            where: {
                id: {
                    [Op.in]: catIds
                }
            }
        });
        res.send(list);
    } catch (err) {
        res.send(err);
    }
};
