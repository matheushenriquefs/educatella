//Exportando o controller
const { Aluno, Professor, Classe, Recado, Tarefa, Classe_Aluno, Usuario } = require("../models")


module.exports = {
    // inicio view
    profInicio: async (req, res) => {
        const criarSalas = await Classe.findAll();

        const profId = req.params;


        res.render('professor/inicio', { criarSalas, profId });
    },

    // Classes 
    criarClasse: async (req, res) => {
        const { nome, codigo, id_professor } = req.body;

        const criar = await Classe.create(
            {
                nome: nome,
                codigo: codigo,
                id_professor: id_professor
            })
            .catch(error => res.status(500).send(error))

        console.log(criar)

        return res.redirect('/professor/inicio')

    },

    acessarClasse: async (req, res) => {

        const { id } = req.params;

        res.render('/professor/postar-tarefa', { id })

    },

    updateClasse: async (req, res) => {
        o
        res.render('professor/inicio');
    },

    updateClasse: async (req, res) => {
        const { id } = req.params;

        const { nome, codigo, id_professor } = req.body;

        const alterarModal = await Classe.update({
            nome,
            codigo,
            id_professor
        },
            {
                where: {
                    id: id
                }
            })

        console.log(alterarModal);
        o
        res.redirect('/professor/inicio');
    },

    destroyClasse: async (req, res) => {
        const { id } = req.params;

        const deletar = await Classe.destroy({
            where: {
                id: id
            }
        })

        res.redirect('/professor/inicio');
    },

    profRecados: async (req, res) => {
        let { page = 1 } = req.query
        let { count: total, rows: recadosDB } = await Recado.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5
        })
        let totalPagina = Math.round(total / 5)
        res.render('professor/recados', { recadosDB, totalPagina });
    },
    profRecadosCriar: async (req, res) => {
        let recadosDB = await Recado.findAll()
        res.render('professor/criar-recado', { recadosDB });

    },
    profRecadosCriar2: async (req, res) => {
        const { titulo, descricao } = req.body
        console.log(titulo, descricao)
        const resultado = await Recado.create({

            titulo,
            descricao

        }).catch(err => { console.log(err) })

        console.log(resultado)

        return res.redirect('recados');
    }, profRecadosApagar: async (req, res) => {
        let { page = 1 } = req.query
        let { count: total, rows: recadosDB } = await Recado.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5
        })
        let totalPagina = Math.round(total / 5)
        res.render('professor/apagar-recado', { recadosDB, totalPagina });
    },
    profRecadosApagar2: async (req, res) => {
        const { id } = req.params
        console.log(id)
        const resultado = await Recado.destroy({
            where: { id_recados: id }
        })
        console.log(resultado)
        res.redirect('/professor/apagar-recado');
    },
    profRecadosEditar: async (req, res) => {
        let { page = 1 } = req.query
        let { count: total, rows: recadosDB } = await Recado.findAndCountAll({
            limit: 2,
            offset: (page - 1) * 2
        })
        let totalPagina = Math.round(total / 2)
        res.render('professor/editar-recado', { recadosDB, totalPagina });
    },
    profRecadosEditar2: async (req, res) => {
        const { id } = req.params
        console.log('soy consola' + id)
        const { titulo, descricao } = req.body
        console.log(titulo + "consola numero 2" + descricao)
        const resultado = await Recado.update({
            titulo: titulo,
            descricao: descricao,
            updatedAt: Date.now()
        },
            {
                where: { id_recados: id }
            })
        console.log(resultado)
        res.redirect('/professor/editar-recado');
    },

    profNotas: (req, res) => {
        res.render('professor/postar-nota');
    },

    //Tarefas
    // view tarefas
    profPostarTarefa: async (req, res) => {
        let posts = await Tarefa.findAll()
        let prof = await Professor.findAll()
        let classeDb = await Classe.findAll()

        res.render('professor/postar-tarefa', { posts, prof, classeDb });

    },

    addTarefa: async (req, res) => {

        const { tituloTarefa, descricaoTarefa, id_classe } = req.body;
        const { files } = req
        let classeDb = await Classe.findAll()


        const resultado = await Tarefa.create(
            {
                titulo: tituloTarefa,
                descricao: descricaoTarefa,
                arquivo: files[0].originalname,
                id_classe: id_classe
            })
            .catch(error => res.status(500).send(error))

        res.render('/professor/tarefa', { classeDb })

        res.redirect('/professor/postar-tarefa');

    },

    edit: async (req, res) => {

        res.render('professor/postar-tarefa')
    },

    update: async (req, res) => {
        const { id } = req.params;

        const { titulo, descricao, arquivo, id_classe } = req.body;

        const alterar = await Tarefa.update({
            titulo: titulo,
            descricao: descricao,
            arquivo: arquivo,
            id_classe: id_classe,
        },
            {
                where: {
                    id: id
                }
            })

        console.log(alterar);

        res.redirect('/professor/postar-tarefa');
    },

    destroy: async (req, res) => {
        const { id } = req.params;

        const deletar = await Tarefa.destroy({
            where: {
                id: id
            }
        })

        res.redirect('/professor/postar-tarefa');
    },


    profGerenciarAluno: async (req, res) => {
        let { page = 1 } = req.query


        let recadosDB = await Usuario.findAll({


            include: [{

                model: Aluno,
                as: 'usuarioAluno',
                include: 'usuarioAluno'

            },
            {
                model: Professor,
                as: 'usuarioProfessor'
            }]

        }, {
            limit: 5,
            offset: (page - 1) * 5
        }).catch(err => { console.log(err) })
        let totalPagina = "hola"
        //Math.round(total/5)

        res.render('professor/gerenciar-aluno', { recadosDB, totalPagina });
    },
    profGerenciarAluno1: (req, res) => {
        res.redirect('/professor/gerenciar-aluno');
    }
}
