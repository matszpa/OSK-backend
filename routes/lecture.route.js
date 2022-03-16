const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const lectureController = require("../controllers/lecture.controller");

router.get("/getLectures", auth.verifyToken, lectureController.getLectures);
router.get("/lectureStatusList", lectureController.lectureStatusList);
router.post("/addNewLecture", lectureController.addNewLecture);
router.put("/changeStatusLectureStatus/:id", lectureController.changeStatusLectureStatus)

module.exports = router;