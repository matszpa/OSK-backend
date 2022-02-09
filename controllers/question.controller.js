const db = require("../database/models");
const sequelize = require("../dbconfig");
exports.singleQuestion = async (req, res) => {
  try {
    // const question = await db.category_question.findOne({
    //   include: { model: db.question },
    //   where: { licenceCategoryId: 1 },
    // });
    // const question = await db.licenceCategory.findOne({
    //   where: { id: 3 },
    //   include: {
    //     model: db.question,
    //     // where: {
    //     //   language_id: {$col: 'licenceCategory.language_id'}
    //     // }
    //   },
    // });\

    //id kategori przypisuje do id pytania przy join
    // const question = await db.question.findAll({
    //   include: {
    //     model: db.licenceCategory,
    //     through: { attributes: [] },
    //     //   where: { id: 1 },
    //   },
    //   order: [sequelize.random()],
    //   limit: 1,
    // });
    //dziala
    // const question = await db.category_question.findAll({
    //   include: [
    //     { model: db.question },
    //     {
    //       model: db.licenceCategory,
    //       where: {
    //         name: req.params.cat,
    //       },
    //     },
    //   ],
    //   order: [sequelize.random()],
    //   limit: 1,
    // });
    //proba z odpowiedziami
    const question = await db.category_question.findOne({
      attributes: { exclude: ["questionId", "licenceCategoryId"] },
      include: [
        {
          model: db.question,
          include: [{ model: db.answer }],
        },
        {
          model: db.licenceCategory,
          attributes: [],
          where: {
            name: req.params.cat,
          },
        },
      ],
      order: sequelize.random(),
      limit: 1,
    });
    res.send(question);
  } catch (err) {
    res.send(err);
  }
};

exports.singleQuestionWithAnswears = async (req, res) => {
  try {
    const question = await db.question.findAll({
      //   where: { id: 1 },
      include: [{ model: db.answer }],
    });
    res.send(question);
  } catch (err) {
    res.send(err);
  }
};
