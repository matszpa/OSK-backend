const db = require("../database/models");

exports.addDriving = async (req, res) => {
    var newDriving = {
        trainingId: req.body.trainingId,
        instructorId: req.body.instructorId,
    }
    try {
        const created = await db.driving.create(newDriving)
        res.send(created);
    } catch (err) {
        res.send(err)
    }
}

exports.drivingList = async (req, res) => {
    try {
        var list = await db.driving.findAll({
            attributes: {exclude: ['trainingId', 'instructorId']},
            include: [
                {
                    model: db.user,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: db.training,
                    include: {model: db.user, attributes: ['id', 'firstName', 'lastName']}
                }
            ]
        })
        res.send(list)
    } catch (err) {
        res.send(err)
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const body = req.body
        var driving = await db.driving.findOne({where: {id: req.params.id}});
        await driving.set(body)
        await driving.save();
        if (req.body.status === "Odbyta") {
            var training = await db.training.findOne({where: {id: driving.trainingId}})
            await training.set({drivingHours: driving.numberHours + training.drivingHours})
            await training.save();
        }
        res.send(driving);
    } catch (err) {
        res.send(err)
    }
}