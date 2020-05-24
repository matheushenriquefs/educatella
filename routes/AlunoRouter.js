var express = require('express');
var router = express.Router();

// Controllers
const AlunoController = require('../controllers/AlunoController');

// Middlewares
const authUser = require("../middlewares/authUser");

// Rotas GET
router.get('/aluno/recados', authUser, AlunoController.recadosAlunos);
router.get('/aluno/tarefas', authUser, AlunoController.tarefasAlunos);
router.get('/aluno/notas', authUser, AlunoController.notasAlunos);
router.get('/aluno/inicio', authUser, AlunoController.inicioAlunos);

module.exports = router;