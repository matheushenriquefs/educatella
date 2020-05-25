const express = require("express");
const router = express.Router();

const controller = require("../controllers/ErrorController");

router.get("/error/401", controller.renderError401);

module.exports = router;