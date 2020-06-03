//Exportando o controller
const { Aluno, Professor, Classe, Recado, Tarefa, Classe_Aluno, Usuario } = require("../models")


module.exports = {
    // inicio view
    profInicio: async (req, res) => {

        const idUsuario = req.usuario.id

        Professor.findOne({ where: { id_usuario: idUsuario } }).then(
            professor => {
                Professor.findByPk(professor.id,
                    {
                        include: {
                            model: Classe,
                            as: 'classes'
                        }
                    }).then(
                        professorClasses => {
                            res.render('professor/inicio', { usuario: req.usuario, professor: professorClasses })
                        }
                    )
            }
        )
    },

    // Classes - criar, acessar, alterar e deletar
    criarClasse: async (req, res) => {

        const { nome, codigo, id_professor } = req.body

        const criar = await Classe.create(
            {
                nome,
                codigo,
                id_professor
            })
            .catch(error => res.status(500).send(error))

        console.log(criar)

        return res.redirect('/professor/inicio')

    },

    acessarClasse: async (req, res) => {

        const idUsuario = req.usuario.id
        const { id_classe } = req.body

        let acessarClasse = await Classe.findByPk(id_classe,
            {
                include: [
                    {
                        model: Professor,
                        as: 'professor'
                    },
                    {
                        model: Recado,
                        as: 'recado'
                    }
                ]
            }
        );

        let professor = await Professor.findOne({ where: { id_usuario: idUsuario } });

        res.render('professor/recados', { acessarClasse, professor, usuario: req.usuario })

    },

    updateClasse: async (req, res) => {

        const idUsuario = req.usuario.id

        const { nome, codigo, id_professor } = req.body;

        await Classe.update({
            nome,
            codigo,
            id_professor
        },
            {
                where: {
                    id: idUsuario
                }
            })

        res.redirect('/professor/inicio');
    },

    destroyClasse: async (req, res) => {
        
        const idUsuario = req.usuario.id

        const deletar = await Classe.destroy({
            where: {
                id: idUsuario
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
    tarefaMenu: async (req, res) => {

        const idUsuario = req.usuario.id

        const { id_classe } = req.body

        let acessarClasse = await Classe.findByPk(id_classe,
            {
                include: [
                    {
                        model: Professor,
                        as: 'professor'
                    },
                    {
                        model: Recado,
                        as: 'recado'
                    }
                ]
            }
        );

        let posts = await Tarefa.findAll({
            include: {
                model: Classe,
                as: 'classe',
                required: true
            }
        })


        let professor = await Professor.findOne({ where: { id_usuario: idUsuario } });


        res.render('professor/postar-tarefa', { acessarClasse, professor, usuario: req.usuario, posts })

    },

    addTarefa: async (req, res) => {

        const idUsuario = req.usuario.id
        const { tituloTarefa, descricaoTarefa, id_classe } = req.body;
        const { files } = req;
        let classeDb = await Classe.findAll();

        let acessarClasse = await Classe.findByPk(id_classe,
            {
                include: [
                    {
                        model: Professor,
                        as: 'professor'
                    },
                    {
                        model: Recado,
                        as: 'recado'
                    }
                ]
            }
        );

        let posts = await Tarefa.findAll({
            include: {
                model: Classe,
                as: 'classe',
                required: true
            }
        });

        const resultado = await Tarefa.create(
            {
                titulo: tituloTarefa,
                descricao: descricaoTarefa,
                arquivo: files[0].originalname,
                id_classe: id_classe
            })
            .catch(error => res.status(500).send(error));

        let professor = await Professor.findOne({ where: { id_usuario: idUsuario } });

        res.render('professor/postar-tarefa', { classeDb, acessarClasse, professor, usuario: req.usuario, posts });

        res.redirect('/professor/postar-tarefa');

    },

    update: async (req, res) => {

        const idUsuario = req.usuario.id

        const { titulo, descricao, arquivo, id_classe } = req.body;

       const resultado = await Tarefa.update({
             titulo: titulo,
             descricao: descricao,
             arquivo: arquivo,
             id_classe: id_classe,
         },
             {
                 where: {
                     id: idUsuario
                 }
             });

             console.log(resultado)

        res.redirect('/professor/inicio');
    },

    destroy: async (req, res) => {

        const {id} = req.params;

        const deletar = await Tarefa.destroy({
            where: {
                id: id
            }
        })

        res.redirect('/professor/inicio');
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
