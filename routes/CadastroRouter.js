const express = require("express");
const router = express.Router();

const controller = require("../controllers/CadastroController");

router.get("/aluno", controller.cadastroAluno);
router.get("/professor", controller.cadastroProfessor);
router.post("/aluno", controller.cadastrarAluno);
router.post("/professor", controller.cadastrarProfessor);

module.exports = router;