const db = require("../database/models")

exports.getLectures = async (req, res) => {
    try {
        var list = await db.lecture.findAll({
            include: [{
                model: db.user,
                attributes: ['firstName', 'lastName']
            },
                {model: db.licenceCategory}
            ]
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
exports.lectureStatusList = async(req,res)=>{
    try{
        var list = await db.lecture.rawAttributes.status.values;
        res.send(list);
    }catch(err){
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

