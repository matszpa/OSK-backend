const db = require("../database/models");

exports.getHistoryForUser = async (req, res) => {
    try {
        var list = await db.examHistory.findAll({
            include: [{model: db.licenceCategory}]
            , where: {studentId: req.user_id}
        })
        res.send(list);
    } catch (err) {
        res.send(err)
    }
}

exports.addExamResult = async (req, res) => {
    try {
        var result = {
            scoredPoints: req.body.scoredPoints,
            studentId: req.user_id
        };
        var categoryId = await db.licenceCategory.findOne({where: {name: req.body.catName}, attributes: ['id']})
        result.categoryId = categoryId.id;
        var created = await db.examHistory.create(result);
        res.send(created)
    } catch (err) {
        res.send(err)
    }
}