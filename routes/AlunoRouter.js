var express = require('express');
var router = express.Router();

// Controllers
const AlunoController = require('../controllers/AlunoController');

// Middlewares
const authUser = require("../middlewares/authUser");

// Rotas GET
router.post('/aluno/recados', authUser, AlunoController.recadosAlunos);
router.post('/aluno/tarefas', authUser, AlunoController.tarefasAlunos);
router.post('/aluno/notas', authUser, AlunoController.notasAlunos);
router.get('/aluno/inicio', authUser, AlunoController.inicioAlunos);
router.post('/aluno/adicionarClasse', authUser, AlunoController.adicionarClasse);
router.post('/aluno/acessarClasse', authUser, AlunoController.acessarClasse);

module.exports = router;