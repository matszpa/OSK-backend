const db = require("../database/models")
const {Op} = require("sequelize");

exports.getLectures = async (req, res) => {
    try {
        let where = {}
        if (req.role === 'STUDENT') {
            var activeTrainings = await db.training.findAll({
                where: {
                    studentId: req.user_id,
                    endDate: null
                }
            })
            var catIds = activeTrainings.map((t) => t.categoryId);
            where['categoryId'] = {[Op.in]: catIds}
            where['$lecturePresences.training.studentId$'] = req.user_id
        } else if (req.role === "INSTRUCTOR") {
            where['instructorId'] = req.user_id
        }
        var list = await db.lecture.findAll({
            where,
            include: [{
                model: db.user,
                attributes: ['firstName', 'lastName']
            },
                {model: db.licenceCategory},
                {
                    model: db.lecturePresence,
                    include: [{
                        model: db.training,
                    }],

                }
            ],
            order: [['date', 'desc']]
        })
        res.send(list);
    } catch (err) {
        res.send(err)
    }
}

exports.addNewLecture = async (req, res) => {
    try {
        let lecture = req.body;
        const addedLecture = await db.lecture.create(lecture);
        res.send(addedLecture);
    } catch (err) {
        res.send(err)
    }
}
exports.lectureStatusList = async (req, res) => {
    try {
        var list = await db.lecture.rawAttributes.status.values;
        res.send(list);
    } catch (err) {
        res.send(err)
    }
}
exports.changeStatusLectureStatus = async (req, res) => {
    try {

        const lecture = await db.lecture.findOne({where: {id: req.params.id}});
        await lecture.set(req.body);
        await lecture.save();
        res.send(lecture);
    } catch (err) {
        res.send(err)
    }
}

