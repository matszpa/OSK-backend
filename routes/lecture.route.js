const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const lectureController = require("../controllers/lecture.controller");

router.get("/getLectures", lectureController.getLectures);
router.post("/addNewLecture", lectureController.addNewLecture);
router.put("/changeStatusLectureStatus/:id", lectureController.changeStatusLectureStatus)

module.exports = router;