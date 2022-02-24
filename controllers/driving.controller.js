const db = require("../database/models");

exports.addDriving = async (req, res) => {
    var drivingList = req.body.drivingList;
    console.log(req.body)
    drivingList = drivingList.map((d) => {
        d.day = new Date(req.body.day);
        d.instructorId = parseInt(req.body.instructorId);
        return d;
    })
    console.log(drivingList)
    try {
        const created = await db.driving.bulkCreate(drivingList)
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

exports.getAvalibleHoursForInstructor = async (req, res) => {
    try {
        var allHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        var list = await db.driving.findAll({
            attributes: ['hour'],
            where: {instructorId: req.params.id, day: new Date(req.query.day)}
        })
        // list.map((obj)=>allHours.some(x=>x===obj.hour)?)
        allHours = allHours.map((h) => list.some((obj) => obj.hour === h) ? h = false : h)
        console.log(allHours)
        res.send(allHours);
    } catch (err) {
        res.send(err)
    }
}
