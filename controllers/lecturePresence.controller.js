const db = require("../database/models")
const Sequelize = require("sequelize");
const {Op} = require("sequelize");
exports.postPresence = async (req, res) => {
    try {
        let tmp = req.body.presenceList

        var list = await db.lecturePresence.bulkCreate([...tmp]);
        // var list = await db.lecturePresence.findAll()
        res.send(list);
    } catch (err) {
        res.send(err)
    }
}

exports.userPresenceList = async (req, res) => {
    try {
        console.log("CHUj")
        //przygotowane pod jazdy
        var list2 = await db.lecture.findAll({
            attributes: ['lecturepresences.trainingId', [Sequelize.fn('sum', Sequelize.col('duration')), 'total']],
            include: [{model: db.lecturePresence, attributes: [], where: {isPresent: true}}],
            group: ['lecturepresences.trainingId'],
            having: {'total': {[Op.gte]: 15}},
            raw: true,
            order: Sequelize.literal('total DESC')
        })
        var trainingIdList = list2.map((el) => el.trainingId)
        // const filteredArray = idList.filter(value => array2.includes(value));
        console.log(trainingIdList)
        res.send(list2);
    } catch (err) {
        res.send(err)
    }
}