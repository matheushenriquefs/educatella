//Exportando o controller
const  {Recados} = require("../models")


module.exports = {
    profInicio:  (req, res) => {
        res.render('professor/inicio');
    },

    profRecados: async  (req, res) => {
        let recadosDB = await Recados.findAll()
        res.render('professor/recados',{recadosDB});
    },
    profRecadosCriar :async  (req, res) => {
        let recadosDB = await Recados.findAll()
        res.render('professor/criar-recado',{recadosDB});
        
    },profRecadosCriar2 :async  (req, res) => {
        const {titulo,descricao}= req.body
        console.log(titulo,descricao)

     const resultado = await Recados.create({
         titulo,
         descricao,
         data_criacao: Date.now()
    }).catch(err=>{console.log(err)})

        console.log(resultado)
        
       return res.redirect('recados');
    },
    profRecadosApagar: async (req,res)=> {

        let recadosDB = await Recados.findAll()
        res.render('professor/apagar-recado',{recadosDB});
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

    profGerenciarAluno: (req, res) => {
        res.render('professor/gerenciar-aluno');
    }
}
