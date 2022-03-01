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
    let where = {}
    if (req.role === 'STUDENT')
        where['$training.studentId$'] = req.user_id
    if (req.role === 'INSTRUCTOR')
        where['instructorId'] = req.user_id;

    try {
        var list = await db.driving.findAll({
            attributes: {exclude: ['trainingId', 'instructorId']},
            where,
            include: [
                {
                    model: db.user,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: db.training,
                    include: [{
                        model: db.user,
                        attributes: ['id', 'firstName', 'lastName'],

                    },
                        {model: db.licenceCategory}], required: false
                },
            ],
            order: [['day', 'DESC'], 'hour']

        })
        res.send(list)
    } catch (err) {
        res.send(err)
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const body = {
            status: req.body.status,
            comment: req.body.comment
        }
        var driving = await db.driving.findOne({where: {id: req.params.id}});
        await driving.set(body)
        await driving.save();
        if (req.body.status === "Odbyta") {
            var training = await db.training.findOne({where: {id: driving.trainingId}})
            await training.set({drivingHours: training.drivingHours + 1})
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

exports.cancelDriving = async (req, res) => {
    try {
        const id = req.params.id;
        db.driving.destroy({where: {id}});
        res.send(id)
    } catch (err) {
        res.send(err)
    }
}
