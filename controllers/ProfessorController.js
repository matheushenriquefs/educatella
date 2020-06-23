//Exportando o controller
const { Aluno, Professor, Classe, Recado, Tarefa, Classe_Aluno, Usuario,Tarefa_Aluno } = require("../models")
const { check, validationResult } = require('express-validator');
const { CustomValidation } = require("express-validator/src/context-items");


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
            
        res.redirect('/professor/inicio');
    },

    destroyClasse: async (req, res) => {
        
        const { id } = req.params

        const deletar = await Classe.destroy({
            where: {
                id: id
            }
        })

        res.redirect('/professor/inicio');
    },


    //olhar recados////////////////////////////////////////////////////////////////
    profRecados: async (req, res) => {
        let usuario = req.usuario
        const idUsuario = req.usuario.id

        const { id_classe } = req.query

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
        console.log(acessarClasse)
        
       
       
        res.render('professor/recados', {usuario,acessarClasse});
    },
     //criar Recados////////////////////////////////////////////////////////////////
    profRecadosCriar: async (req, res) => {
       
        let usuario = req.usuario
        const idUsuario = req.usuario.id
      

        const { id_classe } = req.query

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
        let recadosDB = await Recado.findAll()
        
        res.render('professor/criar-recado', { recadosDB, usuario,acessarClasse});

    },
    //criar Recados////////////////////////////////////////////////////////////////
    profRecadosCriar2: async (req, res) => {
        let errors = validationResult(req);
        const { titulo, descricao } = req.body
        console.log(errors)
        let usuario = req.usuario
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
        if (!errors.isEmpty()){ return res.redirect ('back') }

        const resultado = await Recado.create({

            titulo,
            descricao,
            id_classe

        }).catch(err => { console.log(err) })

        
        
        
        return res.redirect('back');
    },
    //apagar recados////////////////////////////////////////////////////////////////
    profRecadosApagar: async (req, res) => {
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        const { id_classe } = req.query

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
        return res.redirect('back');
    },
    //Editar Recados////////////////////////////////////////////////////////////////
    profRecadosEditar: async (req, res) => {
        
        let usuario = req.usuario
        const idUsuario = req.usuario.id

        const { id_classe } = req.query
        
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
     
        res.render('professor/editar-recado', { usuario,acessarClasse });
    },
        //Editar Recados////////////////////////////////////////////////////////////////
    profRecadosEditar2: async (req, res) => {
        const { id } = req.params
        let errors = validationResult(req);
        const { titulo, descricao } = req.body
        console.log(titulo + "consola numero 2" + descricao)
        if (!errors.isEmpty()){ return res.redirect ('back') }
        const resultado = await Recado.update({
            titulo: titulo,
            descricao: descricao,
            updatedAt: Date.now()
        },
            {
                where: { id_recados: id }
            })
        console.log(resultado)
        

        return res.redirect('back');
        
    },

    gerenciarNota: async (req, res) => {
       
        const { tituloTarefa, descricaoTarefa } = req.body;
        const { id_classe } = req.query
        console.log(id_classe + "**************************")
        const { files } = req;
        let classeDb = await Classe.findAll();
        let usuario = req.usuario
        const idUsuario = req.usuario.id

       

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
      
        let gerenciarDB = await Classe.findByPk(id_classe,{

            
            include:{

              model: Aluno,
              as: 'aluno',
              include:"usuarioAluno"

            }

        }).catch(err => { console.log(err) })
             
        res.render('professor/gerenciar-nota',{gerenciarDB, usuario,acessarClasse,classeDb});
    },
    gerenciarNotaAluno: async (req, res) => {
       
        const { tituloTarefa, descricaoTarefa } = req.body;
        const { id_classe } = req.body
        
        const { files } = req;
        let classeDb = await Classe.findAll();
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        const id = req.params.id
       
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

        let gerenciarDB = await Classe.findByPk(id_classe,{
            include:[{
              model: Aluno,
              as: 'aluno',
              include:"usuarioAluno"

            },{
               model:Tarefa,
                as: 'tarefa'
            }]

        }).catch(err => { console.log(err) })

        let tarefas = await Tarefa.findAll(
			{
				include:{
					model: Tarefa_Aluno, 
					as:'tarefasAlunos'
				},
				where: {
					id_classe : id_classe
				}
			}
		);

		//percorre o array de tarefas
		for(var contador = 0; contador < tarefas.length; contador++){
			//percorre o array de tarefasAlunos
			for(var contador2 = 0; contador2 < tarefas[contador].tarefasAlunos.length; contador2++){
				//Se alguma tarefa não pertencer ao aluno, ela é removida
				if(tarefas[contador].tarefasAlunos[contador2].id_aluno != id){
					tarefas[contador].tarefasAlunos.splice(contador2, 1);
				}
			}
		}

        
       
             
        res.render('professor/gerenciar-nota-aluno',{gerenciarDB, usuario,acessarClasse,classeDb,tarefas});
     
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
            },
            where:{
                id_classe
            }
        })
    
    
        let professor = await Professor.findOne({ where: { id_usuario: idUsuario } });
    
    
        res.render('professor/postar-tarefa', { acessarClasse, professor, usuario: req.usuario, posts })
        
    },

    addTarefa: async (req, res) => {

        const idUsuario = req.usuario.id
        const { tituloTarefa, descricaoTarefa, id_classe, data_entrega } = req.body;
        const { files } = req;
        let classeDb = await Classe.findAll();

        const resultado = await Tarefa.create(
            {
                titulo: tituloTarefa,
                descricao: descricaoTarefa,
                arquivo: files[0].originalname,
                data_entrega: data_entrega,
                id_classe: id_classe
            })
            .catch(error => res.status(500).send(error));
    
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
            },
            where:{
                id_classe
            }
        })
    
        let professor = await Professor.findOne({ where: { id_usuario: idUsuario } });
    
        res.render('professor/postar-tarefa', { acessarClasse, posts, professor, usuario:req.usuario})
    
        res.redirect('/professor/postar-tarefa');
    
    },

    update: async (req, res) => {

        const idUsuario = req.usuario.id
    
        const { id_classe, id_tarefa, titulo, descricao } = req.body;
    
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
            },
            where:{
                id_classe
            }
        })
    
        let professor = await Professor.findOne({ where: { id_usuario: idUsuario } });
    
        res.render('professor/postar-tarefa', { acessarClasse, posts, professor, usuario:req.usuario})
    },

    destroy: async (req, res) => {

        const idUsuario = req.usuario.id
        const {id, id_classe} = req.body;
    
        const deletar = await Tarefa.destroy({
            where: { 
                id: id
            }
        });
    
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
            },
            where:{
                id_classe
            }
        })
    
        let professor = await Professor.findOne({ where: { id_usuario: idUsuario } });
    
        res.render('professor/postar-tarefa', { acessarClasse, posts, professor, usuario:req.usuario})

    },

    //Gerenciar aluno////////////////////////////////////////////////////////////////
    profGerenciarAluno: async (req, res) => {
        let { page = 1 } = req.query
        const { tituloTarefa, descricaoTarefa } = req.body;
        let feedbackExcluirAluno = "inicio";
        const { id_classe } = req.query
     
        const { files } = req;
        let classeDb = await Classe.findAll();
        let usuario = req.usuario
        const idUsuario = req.usuario.id
       

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
      
        let gerenciarDB = await Classe.findByPk(id_classe,{

            
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
        
      res.render('professor/gerenciar-aluno', { gerenciarDB, totalPagina,usuario,acessarClasse,classeDb, feedbackExcluirAluno});
    },
    ///Gerenciar aluno////////////////////////////////////////////////////////////////
    profGerenciarAluno1: async (req, res) => {
        const id = req.params.id;
        let feedbackExcluirAluno = "Aluno excluído da classe com sucesso!";
        let usuario = req.usuario
        const { id_classe } = req.body;

        await Classe_Aluno.destroy({
            where: { id_aluno: id }
        })

        let gerenciarDB = await Classe.findByPk(id_classe,{

            include:{
              model: Aluno,
              as: 'aluno',
              include:"usuarioAluno"
            }

        });

        let acessarClasse = await Classe.findByPk(id_classe,{
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
        });

        let totalPagina = "hola"
            
        res.render('professor/gerenciar-aluno', { gerenciarDB, totalPagina, acessarClasse, usuario, feedbackExcluirAluno});
    },

    //Alterar usuário
	alterarImagem: async (req,res)=> {

		const idUsuario = req.usuario.id;
		let img = req.file.filename;

		await Usuario.update({
			imagem:img
		},
		{
			where:{
				id:idUsuario
			}
		});

		res.redirect("back");

	},

	alterarNome: async (req,res)=> {
		
		const idUsuario = req.usuario.id;
		let nomeUsuario = req.body.nome;

		await Usuario.update({
			nome:nomeUsuario
		},
		{
			where:{
				id:idUsuario
			}
		});

		res.redirect("/professor/inicio");

	},

	alterarEmail: async (req,res)=> {

		const idUsuario = req.usuario.id;
		let email = req.body.email;
		let senha = req.body.senhaEmail;

		let usuarioBanco = await Usuario.findOne(
		{
			where:{
				id:idUsuario
			}
		});

		if(bcrypt.compareSync(senha, usuarioBanco.senha)){

			await Usuario.update({
				email
			},
			{
				where:{
					id:idUsuario
				}
			});	

		}

		res.redirect("/professor/inicio");

	},

	alterarSenha: async (req,res)=> {

		const idUsuario = req.usuario.id;
		let senhaAntiga = req.body.senhaAntiga;
		let senhaNova = req.body.senhaNova;

		let usuarioBanco = await Usuario.findOne(
		{
			where:{
				id:idUsuario
			}
		});

		if(bcrypt.compareSync(senhaAntiga, usuarioBanco.senha)){

			await Usuario.update({
				senha: bcrypt.hashSync(senhaNova, 10)
			},
			{
				where:{
					id:idUsuario
				}
			});	
		}

		res.redirect("/professor/inicio");

	}
}
