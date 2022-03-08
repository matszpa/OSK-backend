const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const examController = require("../controllers/examHistory.controller");

router.get("/getHistoryForUser", auth.verifyToken, examController.getHistoryForUser)
router.post("/addExamResult", auth.verifyToken, examController.addExamResult)

module.exports = router;