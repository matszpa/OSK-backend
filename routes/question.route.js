const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const questionController = require("../controllers/question.controller");

router.get("/getSingle/:cat", questionController.singleQuestion);

router.get("/getSingleQ/:cat", questionController.singleQuestionWithAnswears);
module.exports = router;
