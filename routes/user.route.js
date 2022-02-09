const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/user.controller");
router.post("/login", userController.userLogin);
router.post("/register", userController.newUser);
module.exports = router;
