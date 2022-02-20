const db = require("../database/models");


exports.test = async (req, res) => {
    try {
        //wywołanie instruktorów z kategoriami do ktorych naleza
        // var list = await db.user.findAll({
        //     include: [{model: db.licenceCategory, through: {attributes: []}}],
        //     where: {role: "INSTRUCTOR"}
        // });
        // res.send(list)
        var list = await db.training.findAll({
            include: [{model: db.licenceCategory}],
        })
        res.send(list)
    } catch
        (err) {
        res.send(err)
    }

}

exports.addTraining = async (req, res) => {
    var training = {
        studentId: req.body.studentId,
        categoryId: req.body.categoryId,
        paid: req.body.paid,
        totalCost: req.body.totalCost
    }
    try {
        const createdTraining = await db.training.create(training);
        res.send(createdTraining);
    } catch (err) {
        res.send(err)
    }
}

exports.getTrainingInCategory = async (req, res) => {
    try {
        var users = await db.training.findAll({
            // attributes: ['id'],
            include: [
                {
                    model: db.user,
                    attributes: ['id', 'firstName', 'lastName'],
                    where: {role: "STUDENT"}
                }
            ],
            where: {categoryId: req.params.cat}

        })
        // users = users.map((u) => u.user)
        res.send(users)
    } catch (err) {
        res.send(err)
    }
}



