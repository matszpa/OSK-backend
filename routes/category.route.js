const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const categoryController = require("../controllers/category.controller");

router.get("/categories", categoryController.categoryList);

module.exports = router;
