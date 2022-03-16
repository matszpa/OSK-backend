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
        var data = req.body;
        data.studentId = req.user_id;
        var created = await db.examHistory.create(data);
        res.send(created)
    } catch (err) {
        res.send(err)
    }
}