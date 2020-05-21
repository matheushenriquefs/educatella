//Exportando o controller
const  {Recados} = require("../models")


module.exports = {
    profInicio:  (req, res) => {
        res.render('professor/inicio');
    },

    profRecados: async  (req, res) => {
        

       let recadosDB = await Recados.findAll(
    //        {
    //     where:{
    //         titulo:"Buen Dia",
       
    //     }
         
        
    //    }
       )
             
     
     

 
        res.render('professor/recados',{recadosDB});
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
