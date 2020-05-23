var express = require('express');
var router = express.Router();

var ProfessorController = require('../controllers/ProfessorController');

// Middlewares
const authUser = require("../middlewares/authUser");

/* Rotas Professor */ /*tirar authUser pra desenvolver*/

router.get('/professor/inicio', ProfessorController.profInicio);
router.get('/professor/recados',  ProfessorController.profRecados);
router.get('/professor/criar-recado', ProfessorController.profRecadosCriar);
router.post('/professor/criar-recado', ProfessorController.profRecadosCriar2);
router.get('/professor/apagar-recado',  ProfessorController.profRecadosApagar);
router.post('/professor/apagar-recado/:id',  ProfessorController.profRecadosApagar2);
router.get('/professor/editar-recado',  ProfessorController.profRecadosEditar);
router.post('/professor/editar-recado/:id',  ProfessorController.profRecadosEditar2);
router.get('/professor/postar-nota', authUser, ProfessorController.profNotas);
router.get('/professor/postar-tarefa', authUser, ProfessorController.profPostarTarefa);
router.get('/professor/postar-presenca', authUser, ProfessorController.profPostarPresenca);
router.get('/professor/criar-sala', authUser, ProfessorController.profCriarSala);
router.get('/professor/gerenciar-aluno', authUser, ProfessorController.profGerenciarAluno);

module.exports = router; 