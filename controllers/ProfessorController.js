//Exportando o controller
const  {Recados} = require("../models")


module.exports = {
    profInicio:  (req, res) => {
        res.render('professor/inicio');
    },

    profRecados: async  (req, res) => {
        let {page=1} = req.query 
        let {count:total, rows:recadosDB} = await Recados.findAndCountAll({
            limit:5,
            offset:(page -1)* 5
        })
        let totalPagina= Math.round(total/5)
        res.render('professor/recados',{recadosDB,totalPagina});
    },
    profRecadosCriar :async  (req, res) => {
        let recadosDB = await Recados.findAll()
        res.render('professor/criar-recado',{recadosDB});
        
    },profRecadosCriar2 :async  (req, res) => {
        const {titulo,descricao}= req.body
        console.log(titulo,descricao)
        
     const resultado = await Recados.create({
       
         titulo,
         descricao
        
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
