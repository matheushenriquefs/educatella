var express = require('express');
var router = express.Router();

var ProfessorController = require('../controllers/ProfessorController');

// Middlewares
const authUser = require("../middlewares/authUser");

/* Rotas Professor */ /*tirar authUser pra desenvolver*/

router.get('/professor/inicio', authUser, ProfessorController.profInicio);
router.get('/professor/recados', authUser,  ProfessorController.profRecados);
router.get('/professor/criar-recado', authUser, ProfessorController.profRecadosCriar);
router.post('/professor/criar-recado', authUser, ProfessorController.profRecadosCriar2);
router.get('/professor/apagar-recado', authUser,  ProfessorController.profRecadosApagar);
router.post('/professor/apagar-recado/:id', authUser,  ProfessorController.profRecadosApagar2);
router.get('/professor/editar-recado', authUser,  ProfessorController.profRecadosEditar);
router.post('/professor/editar-recado/:id', authUser,  ProfessorController.profRecadosEditar2);
router.get('/professor/postar-nota', authUser, ProfessorController.profNotas);
router.get('/professor/postar-tarefa', authUser, ProfessorController.profPostarTarefa);
router.get('/professor/presenca',  ProfessorController.profPresenca);
router.get('/professor/postar-presenca',  ProfessorController.profPostarPresenca);
router.get('/professor/criar-sala', authUser, ProfessorController.profCriarSala);
router.get('/professor/gerenciar-aluno',  ProfessorController.profGerenciarAluno);

module.exports = router; 