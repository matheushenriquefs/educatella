const express = require("express");
const router = express.Router();

const controller = require("../controllers/AdmController");

router.get("/salaAdm", controller.salaAdm);
router.get("/classesAdm", controller.classesAdm);

module.exports = router;