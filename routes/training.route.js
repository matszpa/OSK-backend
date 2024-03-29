const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const trainingController = require("../controllers/training.controller");

router.get("/test", trainingController.test);

router.post("/addTraining", trainingController.addTraining);
router.get("/getTrainingInCategory/:cat", trainingController.getTrainingInCategory);
router.get("/allTrainings", auth.verifyToken, trainingController.allTrainings);

router.get("/getAvalibleStudents/:catId", trainingController.getAvalibleStudents)
router.get("/userTrainingList/:catId", trainingController.userTrainingList);

router.post("/addPay/:trainingId", trainingController.addPay)
router.get("/endTraining/:trainingId", trainingController.endTraining)

router.get("/getDataForReport/:trainingId", trainingController.getDataForReport)

router.get("/getTrainingListForLecture/:catId", trainingController.getTrainingListForLecture)
module.exports = router;
