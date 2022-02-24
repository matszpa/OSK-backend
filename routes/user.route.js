const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/user.controller");
router.post("/login", userController.userLogin);
router.get('/user', auth.verifyToken, userController.currentUser);
router.get('/allUsers', userController.allUsers);
router.post("/newUser", userController.newUser);
router.get("/userTrainingList", userController.userTrainingList);
module.exports = router;
