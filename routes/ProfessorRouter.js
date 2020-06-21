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

/* Rotas Professor */ /*tirar authUser pra desenvolver*/

//Início e criar classe
router.get('/professor/inicio', authUser, ProfessorController.profInicio);
router.post('/professor/inicio', authUser, ProfessorController.criarClasse);
router.post('/professor/acessar-classe', authUser, ProfessorController.acessarClasse);
router.post('/professor/editar-classe', authUser, ProfessorController.updateClasse);
router.post('/professor/delete-classe/:id', authUser, ProfessorController.destroyClasse);
//RECADOS 
router.get('/professor/recados', authUser,  ProfessorController.profRecados);
//RECADOS CRIAR
router.get('/professor/criar-recado', authUser,ProfessorController.profRecadosCriar);

router.post('/professor/criar-recado', authUser,
          [check ("titulo").isLength({min:1}),
          check ("descricao").isLength({min:1})]
          ,ProfessorController.profRecadosCriar2);
//apagar Recados          
router.get('/professor/apagar-recado', authUser, ProfessorController.profRecadosApagar);
router.post('/professor/apagar-recado/:id', authUser, ProfessorController.profRecadosApagar2);

//Editar Recados
router.get('/professor/editar-recado', authUser, ProfessorController.profRecadosEditar);
router.post('/professor/editar-recado/:id', authUser,
            [check ("titulo").isLength({min:1}),
            check ("descricao").isLength({min:1})]
            ,ProfessorController.profRecadosEditar2);

//Gerenciar Notas            
router.get('/professor/gerenciar-nota', authUser, ProfessorController.gerenciarNota);
router.post('/professor/gerenciar-nota-aluno/:id', authUser, ProfessorController.gerenciarNotaAluno);
//TAREFAS
router.post('/professor/postar', authUser, upload.any(), ProfessorController.addTarefa);
router.post('/professor/editar', authUser, ProfessorController.update);
router.post('/professor/delete', authUser, ProfessorController.destroy);
router.post('/professor/tarefa', authUser, ProfessorController.tarefaMenu); //rota para acessar classes
//GERENCIAR Aluno
router.get('/professor/gerenciar-aluno', authUser, ProfessorController.profGerenciarAluno);
router.post('/professor/gerenciar-aluno/:id', authUser, ProfessorController.profGerenciarAluno1);
//Alterar informações usuário
router.post('/professor/alterarImagem', uploadImagem.single("img"), authUser, ProfessorController.alterarImagem);
router.post('/professor/alterarNome', authUser, ProfessorController.alterarNome);
router.post('/professor/alterarEmail', authUser, ProfessorController.alterarEmail);
router.post('/professor/alterarSenha', authUser, ProfessorController.alterarSenha);



module.exports = router; 