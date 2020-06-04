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


        const { id_classe, nome, codigo } = req.body;

        const alterar = await Classe.update({
            nome,
            codigo,
        },
            {
                where: {
                    id: id_classe
                }
            });
        console.log(alterar);
        res.redirect('/professor/inicio');
    },

    destroyClasse: async (req, res) => {
        
        const { id } = req.params

        const deletar = await Classe.destroy({
            where: {
                id: id
            }
        })
        console.log(deletar);
        res.redirect('/professor/inicio');
    },
    //olhar recados////////////////////////////////////////////////////////////////
    profRecados: async (req, res) => {
        let usuario = req.usuario
        const idUsuario = req.usuario.id

        const { id_classe } = req.body

        let acessarClasse = await Classe.findByPk(idUsuario,
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
        console.log(acessarClasse.recado)
        
       
       
        res.render('professor/recados', { usuario,acessarClasse, });
    },
     //criar Recados////////////////////////////////////////////////////////////////
    profRecadosCriar: async (req, res) => {
        let usuario = req.usuario
        const idUsuario = req.usuario.id

        const { id_classe } = req.body

        let acessarClasse = await Classe.findByPk(idUsuario,
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
        let recadosDB = await Recado.findAll()
        
        res.render('professor/criar-recado', { recadosDB, usuario,acessarClasse});

    },
    //criar Recados////////////////////////////////////////////////////////////////
    profRecadosCriar2: async (req, res) => {
        const { titulo, descricao } = req.body
        console.log(titulo, descricao)
        let usuario = req.usuario
        const idUsuario = req.usuario.id

        const { id_classe } = req.body
        console.log (id_classe + "******************************")
        let acessarClasse = await Classe.findByPk(idUsuario,
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
        const resultado = await Recado.create({

            titulo,
            descricao,
            id_classe

        }).catch(err => { console.log(err) })

        console.log(resultado)

        return res.redirect('recados');
    },
    //apagar recados////////////////////////////////////////////////////////////////
    profRecadosApagar: async (req, res) => {
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        const { id_classe } = req.body

        let acessarClasse = await Classe.findByPk(idUsuario,
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
    
        res.render('professor/apagar-recado', {usuario,acessarClasse });
    },
        //apagar Recados////////////////////////////////////////////////////////////////
    profRecadosApagar2: async (req, res) => {
        const id  = req.params.id
    console.log(id)
        const resultado = await Recado.destroy({
            where: {id_recados: id}
        })
        console.log(resultado)
        res.redirect('/professor/apagar-recado');
    },
    //Editar Recados////////////////////////////////////////////////////////////////
    profRecadosEditar: async (req, res) => {
        
        let usuario = req.usuario
        const idUsuario = req.usuario.id

        const { id_classe } = req.body

        let acessarClasse = await Classe.findByPk(idUsuario,
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
     
        res.render('professor/editar-recado', { usuario,acessarClasse });
    },
        //Editar Recados////////////////////////////////////////////////////////////////
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

        res.render('professor/postar-tarefa', { acessarClasse, posts, professor, usuario:req.usuario})

        res.redirect('/professor/postar-tarefa');

    },

    update: async (req, res) => {

        const { id_tarefa, titulo, descricao } = req.body;

        const alterar = await Tarefa.update({
            titulo,
            descricao,
        },
            {
                where: {
                    id: id_tarefa
                }
            });
        console.log(alterar);

        res.redirect('/professor/inicio');
    },

    destroy: async (req, res) => {

        const {id} = req.params;

        const deletar = await Tarefa.destroy({
            where: {
                id: id
            }
        });

        res.redirect('/professor/inicio');
    },

    //Gerenciar aluno////////////////////////////////////////////////////////////////
    profGerenciarAluno: async (req, res) => {
        let { page = 1 } = req.query
        const { tituloTarefa, descricaoTarefa, id_classe } = req.body;
        const { files } = req;
        let classeDb = await Classe.findAll();
        let usuario = req.usuario
        const idUsuario = req.usuario.id

       

        let acessarClasse = await Classe.findByPk(idUsuario,
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
      
        let recadosDB = await Classe.findByPk(1,{

            
            include:{

              model: Aluno,
              as: 'aluno',
              include:"usuarioAluno"

            }

        }, {
            limit: 5,
            offset: (page - 1) * 5
        }).catch(err => { console.log(err) })
        let totalPagina = "hola"
        //Math.round(total/5)
        
        console.log(recadosDB.aluno[2].usuarioAluno.nome)
    



      res.render('professor/gerenciar-aluno', { recadosDB, totalPagina,usuario,acessarClasse,classeDb });
    },
    ///Gerenciar aluno////////////////////////////////////////////////////////////////
    profGerenciarAluno1: async (req, res) => {
        const id  = req.params.id
        console.log(id +" consola *****************************************************")
            const resultado = await Classe_Aluno.destroy({
                where: { id_aluno: id }
            })
            console.log(resultado)
        res.redirect('/professor/gerenciar-aluno');
    }
}
