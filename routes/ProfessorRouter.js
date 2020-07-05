var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const { check, validationResult } = require('express-validator');

 

// diskStorage multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
var upload = multer({ storage: storage })  

const uploadImagem = require("../lib/upload");

// controllers
var ProfessorController = require('../controllers/ProfessorController');

// Middlewares
const authUser = require("../middlewares/authUser");
const authUserType = require("../middlewares/authUserTypeProfessor");

/* Rotas Professor */ /*tirar authUser pra desenvolver*/

//Início e criar classe
router.get('/professor/inicio', authUser, authUserType, ProfessorController.profInicio);
router.post('/professor/inicio', authUser, authUserType, ProfessorController.criarClasse);
router.post('/professor/acessar-classe', authUser, authUserType, ProfessorController.acessarClasse);
router.post('/professor/editar-classe', authUser, authUserType, ProfessorController.updateClasse);
router.post('/professor/delete-classe', authUser, authUserType, ProfessorController.destroyClasse);

//RECADOS 
router.get('/professor/recados', authUser, authUserType,  ProfessorController.profRecados);
//RECADOS CRIAR
router.get('/professor/criar-recado', authUser, authUserType,ProfessorController.profRecadosCriar);

router.post('/professor/criar-recado', authUser, authUserType,
          [check ("titulo").isLength({min:1}),
          check ("descricao").isLength({min:1})]
          ,ProfessorController.profRecadosCriar2);
//apagar Recados          
router.get('/professor/apagar-recado', authUser, authUserType, ProfessorController.profRecadosApagar);
router.post('/professor/apagar-recado/:id', authUser, authUserType, ProfessorController.profRecadosApagar2);

//Editar Recados
router.get('/professor/editar-recado', authUser, authUserType, ProfessorController.profRecadosEditar);
router.post('/professor/editar-recado/:id', authUser, authUserType,
            [check ("titulo").isLength({min:1}),
            check ("descricao").isLength({min:1})]
            ,ProfessorController.profRecadosEditar2);

//Gerenciar Notas            
router.get('/professor/gerenciar-nota', authUser, authUserType, ProfessorController.gerenciarNota);
router.post('/professor/gerenciar-nota-aluno/:id', authUser, authUserType, ProfessorController.gerenciarNotaAluno);
router.post('/professor/poner-nota-aluno/:id', authUser, authUserType, ProfessorController.ponerNotaAluno);
router.post('/professor/poner-nota-aluno-tarefa/:id', authUser, authUserType, ProfessorController.ponerNotaAlunoTarefa);
//TAREFAS
router.post('/professor/postar', authUser, authUserType, upload.any(), ProfessorController.addTarefa);
router.post('/professor/editar', authUser, authUserType, ProfessorController.update);
router.post('/professor/delete', authUser, authUserType, ProfessorController.destroy);
router.post('/professor/tarefa', authUser, authUserType, ProfessorController.tarefaMenu); //rota para acessar classes
//GERENCIAR Aluno
router.get('/professor/gerenciar-aluno', authUser, authUserType, ProfessorController.profGerenciarAluno);
router.post('/professor/gerenciar-aluno/:id', authUser, authUserType, ProfessorController.profGerenciarAluno1);
//Alterar informações usuário
router.post('/professor/alterarImagem', uploadImagem.single("img"), authUser, authUserType, ProfessorController.alterarImagem);
router.post('/professor/alterarNome', authUser, authUserType, ProfessorController.alterarNome);
router.post('/professor/alterarEmail', authUser, authUserType, ProfessorController.alterarEmail);
router.post('/professor/alterarSenha', authUser, authUserType, ProfessorController.alterarSenha);
router.post('/professor/gerenciarNotasTarefas', authUser, authUserType, ProfessorController.gerenciarNotasTarefas);


module.exports = router; 