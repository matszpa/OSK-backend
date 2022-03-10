const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const lecturePresenceController = require("../controllers/lecturePresence.controller");

router.get("/userPresenceList", lecturePresenceController.userPresenceList);
router.post("/postPresence", lecturePresenceController.postPresence);


module.exports = router;