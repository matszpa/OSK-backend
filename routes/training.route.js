const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const trainingController = require("../controllers/training.controller");

router.get("/test", trainingController.test);

router.post("/addTraining", trainingController.addTraining);
router.get("/getTrainingInCategory/:cat", trainingController.getTrainingInCategory);

module.exports = router;
