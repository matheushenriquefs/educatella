var express = require('express');
var router = express.Router();

var ProfessorController = require('../controllers/ProfessorController');

/* Rotas Professor */

router.get('/professor/inicio', ProfessorController.profInicio);
router.get('/professor/recados', ProfessorController.profRecados);
router.get('/professor/postar-nota', ProfessorController.profNotas);
router.get('/professor/postar-tarefa', ProfessorController.profPostarTarefa);
router.get('/professor/postar-presenca', ProfessorController.profPostarPresenca);
router.get('/professor/criar-sala', ProfessorController.profCriarSala);
router.get('/professor/gerenciar-aluno', ProfessorController.profGerenciarAluno);

module.exports = router; 