const db = require("../database/models");
const {Op} = require("sequelize");
const Sequelize = require("sequelize");

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
        startDate: req.body.startDate,
        totalCost: req.body.totalCost
    }
    try {
        const createdTraining = await db.training.create(training);
        const trainingTosend = await db.training.findOne({
            where: {id: createdTraining.id}, include: [
                {
                    model: db.user,
                    attributes: ['id', 'firstName', 'lastName'],
                    where: {role: "STUDENT"}
                },
                {
                    model: db.licenceCategory
                }]
        })
        res.send(trainingTosend);
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
                },
                {
                    model: db.licenceCategory
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
exports.allTrainings = async (req, res) => {
    let where = {}
    if (req.role === "STUDENT")
        where['studentId'] = req.user_id
    try {
        var list = await db.training.findAll({
            // attributes: ['id'],
            include: [
                {
                    model: db.user,
                    attributes: ['id', 'firstName', 'lastName'],
                    where: {role: "STUDENT"}
                },
                {
                    model: db.licenceCategory
                }
            ],
            where
        })
        res.send(list)
    } catch (err) {
        res.send(err)
    }
}

exports.getAvalibleStudents = async (req, res) => {
    try {
        //id studentow ktorzy maja juz 15godzin na wykladzie
        var list2 = await db.lecture.findAll({
            attributes: ['lecturepresences.trainingId', [Sequelize.fn('sum', Sequelize.col('duration')), 'total']],
            include: [{model: db.lecturePresence, attributes: [], where: {isPresent: true}}],
            group: ['lecturepresences.trainingId'],
            having: {'total': {[Op.gte]: 15}},
            raw: true,
            order: Sequelize.literal('total DESC')
        })
        var trainingIdList = list2.map((el) => parseInt(el.trainingId))

        //id studentow ktorzy maja w tym dniu jazdy
        var notAvailable = await db.driving.findAll({
            include: [{model: db.training}],
            where: {hour: parseInt(req.query.hour), day: new Date(req.query.day)}
        })
        const idList = notAvailable.map((training) => training.training.studentId)

        var list = await db.training.findAll({
            where: {
                id: {
                    [Op.in]: trainingIdList,
                },
                studentId: {
                    [Op.notIn]: idList,
                },
                categoryId: req.params.catId,
                endDate: {
                    [Op.or]: {
                        [Op.gte]: Date.now(),
                        [Op.eq]: null
                    }
                }
            },
            include: [{model: db.user, attributes: ['firstName', 'lastName']}]
        })
        res.send(list);
    } catch
        (err) {
        res.send(err);
    }
}

exports.userTrainingList = async (req, res) => {
    try {
        var activeTraining = await db.training.findAll({
            attributes: ['studentId'],
            where: {
                endDate: {
                    [Op.or]: {
                        [Op.gte]: Date.now(),
                        [Op.eq]: null
                    }
                },
                categoryId: req.params.catId
            }
        })
        const userIdList = activeTraining.map((student) => student.studentId);
        var list = await db.user.findAll({
            attributes: ['id', 'firstName', 'lastName'],
            where: {
                role: "STUDENT",
                id: {
                    [Op.notIn]: userIdList
                }
            }
        })
        res.send(list)
    } catch (err) {
        res.send(err)
    }
}

exports.addPay = async (req, res) => {
    try {
        var training = await db.training.findOne({where: {id: req.params.trainingId}})
        await training.set({paid: training.paid + req.body.pay});
        await training.save();
        res.send(training);
    } catch (err) {
        res.send(err)
    }
}
exports.endTraining = async (req, res) => {
    try {
        var training = await db.training.findOne({where: {id: req.params.trainingId}})
        await training.set({endDate: Date.now()});
        await training.save();
        res.send(training);
    } catch (err) {
        res.send(err)
    }
}
exports.getDataForReport = async (req, res) => {
    try {
        var training = await db.training.findOne({
            include: [
                {
                    model: db.driving,
                    include: [{model: db.user, attributes: ['firstName', 'LastName']}]
                },
                {model: db.licenceCategory},
                {model: db.user, attributes: ['firstName', 'lastName', 'phoneNumber', 'email']},
                {
                    model: db.lecturePresence,
                    include: [{model: db.lecture}]
                }
            ],
            where: {id: req.params.trainingId},
        })
        res.send(training);
    } catch (err) {
        res.send(err)
    }
}

exports.getTrainingListForLecture = async (req, res) => {
    try {
        //lista userow ktorzy maja mniej niz 15h na wykladzie
        var list2 = await db.lecture.findAll({
            attributes: ['lecturepresences.trainingId', [Sequelize.fn('sum', Sequelize.col('duration')), 'total']],
            include: [{model: db.lecturePresence, attributes: []}],
            group: ['lecturepresences.trainingId'],
            having: {'total': {[Op.gte]: 15}},
            raw: true,
            order: Sequelize.literal('total DESC')
        })
        var trainingIdList = list2.map((el) => el.trainingId)

        var activeTraining = await db.training.findAll({
            // attributes: ['studentId'],
            include: [{
                model: db.user,
                attributes: ['firstName', 'lastName']
            }],
            where: {
                endDate: {
                    [Op.or]: {
                        [Op.gte]: Date.now(),
                        [Op.eq]: null
                    }
                },
                studentId: {
                    [Op.notIn]: trainingIdList
                },
                categoryId: req.params.catId
            }
        })
        res.send(activeTraining);
    } catch (err) {
        res.send(err);
    }
}

