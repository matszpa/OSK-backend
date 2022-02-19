const db = require("../database/models");

exports.categoryList = async (req, res) => {
    try {
        var list = await db.licenceCategory.findAll();
        res.send(list);
    } catch (err) {
        res.send(err);
    }
};
