var express = require('express');
var router = express.Router();

// Controllers
const AlunoController = require('../controllers/AlunoController')

// Rotas GET
router.get('/aluno', AlunoController.acessarAluno);
router.get('/classe', AlunoController.acessarClasse);
router.get('/situacao', AlunoController.acessarSituacao);
router.get('/atividade', AlunoController.acessarAtividade);

module.exports = router;