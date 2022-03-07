const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const categoryController = require("../controllers/category.controller");

router.get("/categories", categoryController.categoryList);
router.get("/categoryListForStudent", auth.verifyToken, categoryController.categoryListForStudent);

module.exports = router;
