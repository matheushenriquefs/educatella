var express = require('express');
var router = express.Router();

// Controllers
const AlunoController = require('../controllers/AlunoController');

const upload = require("../lib/upload");

// Middlewares
const authUser = require("../middlewares/authUser");

// Rotas GET
router.post('/aluno/recados', authUser, AlunoController.recadosAlunos);
router.post('/aluno/tarefas', authUser, AlunoController.tarefasAlunos);
router.post('/aluno/notas', authUser, AlunoController.notasAlunos);
router.get('/aluno/inicio', authUser, AlunoController.inicioAlunos);
router.post('/aluno/adicionarClasse', authUser, AlunoController.adicionarClasse);
router.post('/aluno/acessarClasse', authUser, AlunoController.acessarClasse);
router.post('/aluno/excluirClasse', authUser, AlunoController.excluirClasse);
router.post('/aluno/alterarImagem', upload.single("img"), authUser, AlunoController.alterarImagem);
router.post('/aluno/alterarNome', authUser, AlunoController.alterarNome);
router.post('/aluno/alterarEmail', authUser, AlunoController.alterarEmail);
router.post('/aluno/alterarSenha', authUser, AlunoController.alterarSenha);

module.exports = router;