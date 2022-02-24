const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const instructorController = require("../controllers/instructor.controller");

router.get("/instructors/:catId", instructorController.instructors);


module.exports = router;