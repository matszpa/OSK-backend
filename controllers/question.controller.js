const db = require("../database/models");
const sequelize = require("../dbconfig");
const {Sequelize} = require("sequelize");
const {uploadNewImage} = require("../services/uploadService")
const fs = require('fs')
exports.singleQuestion = async (req, res) => {
    try {
        //proba z odpowiedziami
        const question = await db.category_question.findOne({
            // attributes: { exclude: ["questionId", "licenceCategoryId"] },
            attributes: [],
            include: [
                {
                    model: db.question,
                    include: [{model: db.answer}],
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
        });
        if (question.question.image !== null) {
            var host = `http://${req.get("host")}`;
            question.question.image = `${host}${question.question.image}`;
        }

        res.send(question);
    } catch (err) {
        res.send(err);
    }
};
exports.questionList = async (req, res) => {
    try {
        var list = await db.question.findAll({
            include: [{model: db.answer}],
            limit: parseInt(req.query.limit),
            offset: parseInt(req.query.offset),
            // order: [['id', 'DESC']]
        })
        list.map((q) => {
            if (q.image)
                q.image = `http://${req.get("host")}${q.image}`;
        });
        res.send(list);
    } catch (err) {
        res.send(err)
    }
}
exports.checkSingleQuestion = async (req, res) => {
    try {
        var question = await db.question.findOne({
            where: {id: req.body.question_id},
            include: [{model: db.answer}]
        })
        var yourAnswer = question.answers.find(a => a.id === req.body.answer_id);
        if (!yourAnswer.correct) {
            var correctAnswerId = question.answers.find(a => a.correct === true)
            var id = correctAnswerId.id
            res.json(id)
        } else
            res.send(true)
    } catch (err) {
        res.send(err)
    }
}
exports.singleQuestionWithAnswears = async (req, res) => {
    try {
        var categories = await db.category_question.findAll({
            attributes: ['licenceCategoryId'],
            where: {questionId: req.params.id},
        });
        var cats = categories.map(c => c.licenceCategoryId)
        var question = await db.question.findOne({
            where: {id: req.params.id},
            include: [
                {model: db.answer},
                // {
                //     subQuery: db.category_question.findAll({
                //         attributes: ['licenceCategoryId'],
                //         where: {questionId: req.params.id},
                //     })
                // }
            ],

        });
        var newQ = {
            question,
            cattegory_question: cats
        }
        res.send(newQ);
    } catch (err) {
        res.send(err);
    }
};
exports.addQuestion = async (req, res) => {
    const bodyData = req.body;
    const parse = (data) => {
        var tmp = [];
        data.forEach((e) => tmp.push(JSON.parse(e)))
        return tmp;
    }
    var fixedQuestion = {};
    Object.entries(bodyData).forEach(([key, value]) => {
        if (Array.isArray(value))
            fixedQuestion[key] = parse(value);
        else
            fixedQuestion[key] = value
    });
    if (req.files) {
        var filePath =
            await uploadNewImage(req.files.file, Date.now().toString(), "tmp")
    }
    try {
        const question = {
            question: fixedQuestion.question,
            image: filePath || null,
            type: fixedQuestion.type,
            points: parseInt(fixedQuestion.points)
        }
        const insertedQuestion = await db.question.create(question);
        var answers = fixedQuestion.answers;
        answers.map((a) => a.questionId = insertedQuestion.id);
        await db.answer.bulkCreate([...answers]);
        var questionToCategory = fixedQuestion.cattegory_question;
        questionToCategory.map((q) => q.questionId = insertedQuestion.id);
        await db.category_question.bulkCreate([...questionToCategory]);
        res.json(insertedQuestion.id)
    } catch (err) {
        res.send(err);
    }
}
exports.deleteQuestion = async (req, res) => {
    try {
        const id = req.params.id
        db.question.findByPk(id).then(data => {
            if (!data) {
                res.send("Nie znaleziono takiego pytania")
                return;
            }
            if (data.image) {
                fs.unlink(`.${data.image}`, () => {
                })
            }
            db.question.destroy({where: {id: req.params.id}});
            res.send(id)
        })
    } catch (err) {
        res.send(err)
    }
}
exports.generateExam = async (req, res) => {
    const getQuestions = async (pointValue, amount, questionType) => {
        try {
            const questions = await db.category_question.findAll({
                attributes: [],
                include: [
                    {
                        model: db.question,
                        where: {points: pointValue, type: questionType},
                        include: [{model: db.answer, attributes: {exclude: ["correct"]}}],
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
                limit: amount,
            });
            return questions;
        } catch (err) {
            res.send(err);
        }
    };
    const P3 = await getQuestions(3, 10, "PODSTAWOWY");
    const P2 = await getQuestions(2, 6, "PODSTAWOWY");
    const P1 = await getQuestions(1, 4, "PODSTAWOWY");
    const S3 = await getQuestions(3, 6, "SPECJALISTYCZNY");
    const S2 = await getQuestions(2, 4, "SPECJALISTYCZNY");
    const S1 = await getQuestions(1, 2, "SPECJALISTYCZNY");
    var examArray = P3.concat(P2, P1, S3, S2, S1);
    // let examArray = S1;
    var i = 0;
    examArray.map((q) => {
        if (q.question.image)
            q.question.image = `http://${req.get("host")}${q.question.image}`;
    });
    res.send(examArray);
};

exports.checkExam = async (req, res) => {
    const pytania = req.body;
    try {
        const questionArray = await db.question.findAll({
            where: {id: {[Sequelize.Op.in]: pytania.map((x) => x.question_id)}},
            include: [{model: db.answer}],
        })
        var data = [];
        pytania.forEach((element, index, array) => {
                var question = questionArray.find(q => q.id === element.question_id)
                var yourAnswer = question.answers.find(a => a.id === element.answer);
                if (!yourAnswer.correct) {
                    var correctAnswer = question.answers.find(a => a.correct);
                    if (correctAnswer) {
                        data.push({
                            "question_id": question.id,
                            "answer": correctAnswer.id
                        })
                    }
                } else {
                    data.push({
                        "question_id": question.id,
                        "answer": true
                    })
                }

            }
        )
        res.send(data)
    } catch
        (err) {
        res.send(err)
    }
}

exports.test = async (req, res) => {

    if (req.files) {
        console.log(req.files.file.name)

    } else {
        console.log("nie ma pliku")
        console.log(req.body)
    }

    res.send("Dzialas")
}

