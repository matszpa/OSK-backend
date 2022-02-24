const db = require("../database/models");

exports.instructors = async (req, res) => {
    try {
        var list = await db.user.findAll({
            include: [{
                model: db.instructor,
                attributes: [],
                where: {categoryId: req.params.catId}
            }],
            // where: {categoryId: req.params.catId}
        })
        res.send(list);
    } catch (err) {
        res.send(err)
    }

}