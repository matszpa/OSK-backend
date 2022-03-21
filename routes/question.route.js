const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const questionController = require("../controllers/question.controller");


router.post("/addQuestion", questionController.addQuestion);
router.delete("/deleteQuestion/:id", questionController.deleteQuestion);
router.get("/questionList", questionController.questionList);
router.get("/exam/:cat", questionController.generateExam);

router.post("/checkExam", questionController.checkExam);
router.post("/test", questionController.test);
module.exports = router;
