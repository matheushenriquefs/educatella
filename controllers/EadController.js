module.exports = {
    profInicio: (req, res) => {
        res.render('professor/inicio');
    },

    profNotas: (req, res) => {
        res.render('professor/postar-nota');
    },

    profPostarTarefa: (req, res) => {
        res.render('professor/postar-tarefa');
    },

    profPostarPresenca: (req, res) => {
        res.render('professor/postar-presenca');
    },

    profCriarSala: (req, res) => {
        res.render('professor/criar-sala');
    },

    profCadastrarAluno: (req, res) => {
        res.render('professor/cadastrar-aluno');
    }
}
