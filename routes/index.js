var express = require('express');
var router = express.Router();

var EadController = require('../controllers/EadController');

/* GET home page - index */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page - professor*/

router.get('/professor/inicio', EadController.profInicio);
router.get('/professor/postar-nota', EadController.profNotas);
router.get('/professor/postar-tarefa', EadController.profPostarTarefa);
router.get('/professor/postar-presenca', EadController.profPostarPresenca);
router.get('/professor/criar-sala', EadController.profCriarSala);
router.get('/professor/cadastrar-aluno', EadController.profCadastrarAluno);



module.exports = router; 
