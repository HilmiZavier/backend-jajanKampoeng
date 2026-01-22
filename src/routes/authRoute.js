const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const upload = require("../middleware/uploads/upload");

router.post("/login", upload.none(), authController.loginUser);

module.exports = router;
