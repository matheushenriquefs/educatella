var express = require('express');
var router = express.Router();

var ProfessorController = require('../controllers/ProfessorController');

// Middlewares
const authUser = require("../middlewares/authUser");

/* Rotas Professor */

router.get('/professor/inicio', authUser, ProfessorController.profInicio);
router.get('/professor/recados', authUser, ProfessorController.profRecados);
router.get('/professor/criar-recado', authUser, ProfessorController.profRecadosCriar);
router.get('/professor/recados/apagar', authUser, ProfessorController.profRecadosApagar);
router.get('/professor/postar-nota', authUser, ProfessorController.profNotas);
router.get('/professor/postar-tarefa', authUser, ProfessorController.profPostarTarefa);
router.get('/professor/postar-presenca', authUser, ProfessorController.profPostarPresenca);
router.get('/professor/criar-sala', authUser, ProfessorController.profCriarSala);
router.get('/professor/gerenciar-aluno', authUser, ProfessorController.profGerenciarAluno);

module.exports = router; 