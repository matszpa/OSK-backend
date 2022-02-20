const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const drivingController = require("../controllers/driving.controller");

router.get("/drivingList", drivingController.drivingList)
router.post("/addDriving", drivingController.addDriving);
router.put("/changeStatus/:id", drivingController.changeStatus);

module.exports = router;
