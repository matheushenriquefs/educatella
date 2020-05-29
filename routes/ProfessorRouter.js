var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

 

// diskStorage multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
var upload = multer({ storage: storage }) 

var ProfessorController = require('../controllers/ProfessorController');

// Middlewares
const authUser = require("../middlewares/authUser");

/* Rotas Professor */ /*tirar authUser pra desenvolver*/

//Início e criar classe
router.get('/professor/inicio', authUser, ProfessorController.profInicio);
router.post('/professor/inicio', authUser, ProfessorController.criarClasse);
router.post('/professor/acessar-classe/:id', authUser, ProfessorController.acessarClasse);
router.get('/professor/editar-classe/:id', authUser, ProfessorController.updateClasse);
router.post('/professor/editar-classe/:id', authUser, ProfessorController.updateClasse);
router.post('/professor/delete-classe/:id', authUser, ProfessorController.destroyClasse);

router.get('/professor/recados', authUser,  ProfessorController.profRecados);
router.get('/professor/criar-recado', authUser, ProfessorController.profRecadosCriar);
router.post('/professor/criar-recado', authUser, ProfessorController.profRecadosCriar2);
router.get('/professor/apagar-recado', authUser,  ProfessorController.profRecadosApagar);
router.post('/professor/apagar-recado/:id', authUser,  ProfessorController.profRecadosApagar2);
router.get('/professor/editar-recado', authUser,  ProfessorController.profRecadosEditar);
router.post('/professor/editar-recado/:id', authUser,  ProfessorController.profRecadosEditar2);
router.get('/professor/postar-nota', authUser, ProfessorController.profNotas);

//TAREFAS
router.get('/professor/postar-tarefa', authUser, ProfessorController.profPostarTarefa);
router.post('/professor/postar-tarefa', upload.any(), ProfessorController.addTarefa);
router.get('/professor/editar/:id', authUser, ProfessorController.edit);
router.post('/professor/editar/:id', authUser, ProfessorController.update);
router.post('/professor/delete/:id', authUser, ProfessorController.destroy);

router.get('/professor/gerenciar-aluno',  ProfessorController.profGerenciarAluno);
router.post('/professor/gerenciar-aluno',  ProfessorController.profGerenciarAluno1);

module.exports = router; 