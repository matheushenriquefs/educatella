const express = require("express");
const router = express.Router();

const controller = require("../controllers/LogoutController");

router.get("/logout", controller.logout);

module.exports = router;