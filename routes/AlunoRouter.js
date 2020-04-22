var express = require('express');
var router = express.Router();

// Controllers
const AlunoController = require('../controllers/AlunoController')

// Rotas GET
router.get('/aluno/recados', AlunoController.recadosAlunos);
router.get('/aluno/tarefas', AlunoController.tarefasAlunos);
router.get('/aluno/notas', AlunoController.notasAlunos);
router.get('/aluno/salas', AlunoController.salasAlunos);

module.exports = router;