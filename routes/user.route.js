const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/user.controller");
router.post("/login", userController.userLogin);
router.get('/user', auth.verifyToken, userController.currentUser);
router.get('/userInfo', auth.verifyToken, userController.userInfo);
router.get('/allUsers', userController.allUsers);
router.post("/newUser", userController.newUser);
router.put("/changePassword", auth.verifyToken, userController.changePassword)
router.put("/changeEmail", auth.verifyToken, userController.changeEmail)
router.put("/changeProfileData", auth.verifyToken, userController.changeProfileData)
router.get("/adminInfo", userController.adminInfo);
module.exports = router;
