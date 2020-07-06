const express = require("express");
const router = express.Router();

const controller = require("../controllers/PasswordController");

router.get("/redefinir-senha", controller.renderRedefinirSenha);
router.post("/redefinir-senha", controller.redefinirSenha);

module.exports = router;