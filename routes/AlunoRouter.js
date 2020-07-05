var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

// Controllers
const AlunoController = require('../controllers/AlunoController');

const upload = require("../lib/upload");

// diskStorage multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
   
var uploadTarefa = multer({ storage: storage });

// Middlewares
const authUser = require("../middlewares/authUser");
const AuthUserType = require("../middlewares/AuthUserTypeAluno");

// Rotas GET
router.post('/aluno/recados', authUser, AuthUserType, AlunoController.recadosAlunos);
router.post('/aluno/tarefas', authUser, AuthUserType, AlunoController.tarefasAlunos);
router.post('/aluno/enviarTarefa', uploadTarefa.any(), authUser, AuthUserType, AlunoController.enviarTarefaAlunos);
router.post('/aluno/notas', authUser, AuthUserType, AlunoController.notasAlunos);
router.get('/aluno/inicio', authUser, AuthUserType, AlunoController.inicioAlunos);
router.post('/aluno/adicionarClasse', authUser, AuthUserType, AlunoController.adicionarClasse);
router.post('/aluno/acessarClasse', authUser, AuthUserType, AlunoController.acessarClasse);
router.post('/aluno/excluirClasse', authUser, AuthUserType, AlunoController.excluirClasse);
router.post('/aluno/alterarImagem', upload.single("img"), authUser, AuthUserType, AlunoController.alterarImagem);
router.post('/aluno/alterarNome', authUser, AuthUserType, AlunoController.alterarNome);
router.post('/aluno/alterarEmail', authUser, AuthUserType, AlunoController.alterarEmail);
router.post('/aluno/alterarSenha', authUser, AuthUserType, AlunoController.alterarSenha);

module.exports = router;