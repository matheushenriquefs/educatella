var express = require('express');
var router = express.Router();

// Controllers
const AlunoController = require('../controllers/AlunoController')

// Rotas GET
router.get('/recadosAlunos', AlunoController.recadosAlunos);
router.get('/tarefasAlunos', AlunoController.tarefasAlunos);
router.get('/notasAlunos', AlunoController.notasAlunos);
router.get('/salasAlunos', AlunoController.salasAlunos);

module.exports = router;