const express = require("express");
const router = express.Router();

const controller = require("../controllers/ErrorController");

router.get("/error/401", controller.renderError401);
router.get("/error/401/aluno", controller.renderError401Aluno);
router.get("/error/401/professor", controller.renderError401Professor);

module.exports = router;