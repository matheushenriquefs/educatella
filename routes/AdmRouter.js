const express = require("express");
const router = express.Router();

const AdmController = require("../controllers/AdmController");

router.get("/adm/salaAdm", AdmController.salaAdm);
router.get("/adm/classesAdm", AdmController.classesAdm);

module.exports = router;