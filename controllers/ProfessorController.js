//Exportando o controller
const { Aluno, Professor, Classe, Recado, Tarefa, Classe_Aluno, Usuario,Tarefa_Aluno } = require("../models")
const { check, validationResult } = require('express-validator');
const { CustomValidation } = require("express-validator/src/context-items");
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = {
    // inicio view
    profInicio: async (req, res) => {

        const idUsuario = req.usuario.id
        let feedbackAlterarDados = "inicio";

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
                            res.render('professor/inicio', { usuario: req.usuario, professor: professorClasses, feedbackAlterarDados })
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

        return res.redirect('/professor/inicio')

    },

    acessarClasse: async (req, res) => {

        let feedbackAlterarDados = "inicio";

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

        res.render('professor/recados', { acessarClasse, professor, usuario: req.usuario, feedbackAlterarDados })

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
        
        const { id_classe } = req.body

        const deletar = await Classe.destroy({
            where: {
                id: id_classe
            }
        })
        console.log(deletar)

        res.redirect('/professor/inicio'); 
    },


    //olhar recados////////////////////////////////////////////////////////////////
    profRecados: async (req, res) => {
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        let feedbackRecado = "inicio";
        let feedbackAlterarDados = "inicio";
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
        
       
       
        res.render('professor/recados', {usuario,acessarClasse, feedbackRecado, feedbackAlterarDados});
    },
     //criar Recados////////////////////////////////////////////////////////////////
    profRecadosCriar: async (req, res) => {
       
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        let feedbackRecado = "Recado Criado com Sucesso!";
        let feedbackAlterarDados = "inicio";
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
        
        res.render('professor/criar-recado', { recadosDB, usuario,acessarClasse, feedbackRecado, feedbackAlterarDados});

    },
    //criar Recados////////////////////////////////////////////////////////////////
    profRecadosCriar2: async (req, res) => {
        let errors = validationResult(req);
        const { titulo, descricao } = req.body
        let feedbackRecado = "Recado Criado com Sucesso!";
        let feedbackAlterarDados = "inicio";
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        const { id_classe } = req.body

        const resultado = await Recado.create({

            titulo,
            descricao,
            id_classe

        }).catch(err => { console.log(err) })
        
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

        let recadosDB = await Recado.findAll()
        
        res.render('professor/recados', { recadosDB, usuario,acessarClasse, feedbackRecado, feedbackAlterarDados});
    },
    //apagar recados////////////////////////////////////////////////////////////////
    profRecadosApagar: async (req, res) => {
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        const { id_classe } = req.query
        let feedbackRecado = "Recado Apagado com Sucesso!"
        let feedbackAlterarDados = "inicio";

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
    
        res.render('professor/apagar-recado', {usuario,acessarClasse, feedbackRecado, feedbackAlterarDados});
    },
        //apagar Recados////////////////////////////////////////////////////////////////
    profRecadosApagar2: async (req, res) => {
        const id  = req.params.id
        let usuario = req.usuario
        let id_classe = req.body.id_classe;
        let feedbackAlterarDados = "inicio";

        const resultado = await Recado.destroy({
            where: {id_recados: id}
        })

        let feedbackRecado = "Recado Apagado com Sucesso!"

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

        res.render('professor/recados', {usuario,acessarClasse, feedbackRecado, feedbackAlterarDados});
    },
    //Editar Recados////////////////////////////////////////////////////////////////
    profRecadosEditar: async (req, res) => {
        
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        let feedbackRecado = "Recado Alterado com Sucesso!"
        let feedbackAlterarDados = "inicio";
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

     
    res.render('professor/editar-recado', { usuario,acessarClasse, feedbackRecado, feedbackAlterarDados});
    },
        //Editar Recados////////////////////////////////////////////////////////////////
    profRecadosEditar2: async (req, res) => {
        const { id } = req.params
        const { titulo, descricao, id_classe } = req.body
        let usuario = req.usuario

        let feedbackAlterarDados = "inicio";

        const resultado = await Recado.update({
            titulo: titulo,
            descricao: descricao,
            updatedAt: Date.now()
        },
            {
                where: { id_recados: id }
            })

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

        let feedbackRecado = "Recado Alterado com Sucesso!"

        
        res.render('professor/recados', { usuario, acessarClasse, feedbackRecado, feedbackAlterarDados});
        
    },

    gerenciarNota: async (req, res) => {
       
        const { tituloTarefa, descricaoTarefa } = req.body;
        const { id_classe } = req.query

        let feedbackAlterarDados = "inicio";

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
             
        res.render('professor/gerenciar-nota',{gerenciarDB, usuario,acessarClasse,classeDb, feedbackAlterarDados});
    },
    gerenciarNotaAluno: async (req, res) => {
       
        const { tituloTarefa, descricaoTarefa } = req.body;
        const { id_classe } = req.body
        let feedbackAlterarDados = "inicio";
        const { files } = req;
        let classeDb = await Classe.findAll();
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        const id = req.params.id
        feedbackNota = "inicio";
       
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

        let aluno = await Aluno.findByPk(id, {
           include:{
               model: Usuario,
               as: 'usuarioAluno'
           } 
        });

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

        function verificaidAluno(tarefaAluno){
            return tarefaAluno.id_aluno == id;
        }
        
        for(let contador = 0; contador < tarefas.length; contador++){
            tarefas[contador].tarefasAlunos = tarefas[contador].tarefasAlunos.filter(verificaidAluno);
        }
           
        res.render('professor/gerenciar-nota-aluno',{gerenciarDB, usuario,acessarClasse,classeDb,tarefas, aluno, feedbackNota, feedbackAlterarDados});
     
    },
    ponerNotaAluno : async (req,res)=>{
        
        const { id_classe, id_aluno, nota } = req.body
        let usuario = req.usuario
        let id = req.params.id
        let classeDb = await Classe.findAll();
        let feedbackAlterarDados = "inicio";
        feedbackNota = "Você Aplicou a Nota com Sucesso!";
        
        let gerenciarDB = await Classe.findByPk(id_classe,{

            include:{

              model: Aluno,
              as: 'aluno',
              include:"usuarioAluno"

            }

        }).catch(err => { console.log(err) })
        
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

        let aluno = await Aluno.findByPk(id_aluno, {
            include:{
                model: Usuario,
                as: 'usuarioAluno'
            } 
        });

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

		function verificaidAluno(tarefaAluno){
            return tarefaAluno.id_aluno == id_aluno;
        }
        
        for(let contador = 0; contador < tarefas.length; contador++){
            tarefas[contador].tarefasAlunos = tarefas[contador].tarefasAlunos.filter(verificaidAluno);
        }

        const porNota = await Tarefa_Aluno.update({
           nota
        },
            {
                where: { 
                    id
                }
            });
       
 
        res.render('professor/gerenciar-nota-aluno',{gerenciarDB, usuario,acessarClasse,classeDb,tarefas, aluno, feedbackNota, feedbackAlterarDados});
    },

    ponerNotaAlunoTarefa: async (req,res) => {

        const { id_classe, id_tarefa, nota } = req.body;
        let usuario = req.usuario;
        let id = req.params.id;
        let feedbackAlterarDados = "inicio";
        let feedbackNota = "Você Aplicou a Nota com Sucesso!";

        await Tarefa_Aluno.update({
            nota
         },
         {
            where: { 
                id
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
        
        let tarefasAlunos = await Tarefa_Aluno.findAll(
			{
				include:{
					model: Aluno, 
                    as:'aluno',
                    include: 'usuarioAluno'
				},
				where: {
					id_tarefa : id_tarefa
				}
			}
        );
        
        let tarefaProfessor = await Tarefa.findByPk(id_tarefa);

        res.render('professor/gerenciar-nota-tarefa',{usuario, acessarClasse, tarefasAlunos, tarefaProfessor, feedbackAlterarDados, feedbackNota});

    },

    //Tarefas

    tarefaMenu: async (req, res) => {

        const idUsuario = req.usuario.id
        
        let feedbackAlterarDados = "inicio";

        const { id_classe } = req.body

        let feedbackTarefa = "inicio";
    
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
    
    
        res.render('professor/postar-tarefa', { acessarClasse, professor, usuario: req.usuario, posts, feedbackTarefa, feedbackAlterarDados })
        
    },

    addTarefa: async (req, res) => {

        const idUsuario = req.usuario.id
        const { tituloTarefa, descricaoTarefa, id_classe, data_entrega } = req.body;
        const { files } = req;
        let classeDb = await Classe.findAll();
        let feedbackTarefa = "Tarefa Criada com Sucesso!";
        let feedbackAlterarDados = "inicio";

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
    
        res.render('professor/postar-tarefa', { acessarClasse, posts, professor, usuario:req.usuario, feedbackTarefa, feedbackAlterarDados})
    
    },

    update: async (req, res) => {

        const idUsuario = req.usuario.id
        let feedbackAlterarDados = "inicio";
        const { id_classe, id_tarefa, titulo, descricao } = req.body;

        let feedbackTarefa = "Tarefa Alterada com Sucesso!";
    
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
    
        res.render('professor/postar-tarefa', { acessarClasse, posts, professor, usuario:req.usuario, feedbackTarefa, feedbackAlterarDados})
    },

    destroy: async (req, res) => {

        const idUsuario = req.usuario.id
        const {id, id_classe} = req.body;
        let feedbackAlterarDados = "inicio";
        let feedbackTarefa = "Tarefa Excluída com Sucesso!";
    
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
    
        res.render('professor/postar-tarefa', { acessarClasse, posts, professor, usuario:req.usuario, feedbackTarefa, feedbackAlterarDados})

    },

    //Gerenciar aluno////////////////////////////////////////////////////////////////
    profGerenciarAluno: async (req, res) => {
        let { page = 1 } = req.query
        const { tituloTarefa, descricaoTarefa } = req.body;
        let feedbackExcluirAluno = "inicio";
        const { id_classe } = req.query
        let feedbackAlterarDados = "inicio";
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
        
      res.render('professor/gerenciar-aluno', { gerenciarDB, totalPagina,usuario,acessarClasse,classeDb, feedbackExcluirAluno, feedbackAlterarDados});
    },
    ///Gerenciar aluno////////////////////////////////////////////////////////////////
    profGerenciarAluno1: async (req, res) => {
        const id = req.params.id;
        let feedbackExcluirAluno = "Aluno excluído da classe com sucesso!";
        let usuario = req.usuario
        const { id_classe } = req.body;
        let feedbackAlterarDados = "inicio";
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
            
        res.render('professor/gerenciar-aluno', { gerenciarDB, totalPagina, acessarClasse, usuario, feedbackExcluirAluno, feedbackAlterarDados});
    },

    gerenciarNotasTarefas: async (req, res) => {

        const { id_classe, id_tarefa } = req.body
        let usuario = req.usuario
        let feedbackAlterarDados = "inicio";
        let feedbackNota = "inicio";
        
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
        
        let tarefasAlunos = await Tarefa_Aluno.findAll(
			{
				include:{
					model: Aluno, 
                    as:'aluno',
                    include: 'usuarioAluno'
				},
				where: {
					id_tarefa : id_tarefa
				}
			}
        );
        
        let tarefaProfessor = await Tarefa.findByPk(id_tarefa);

        res.render('professor/gerenciar-nota-tarefa',{usuario, acessarClasse, tarefasAlunos, tarefaProfessor, feedbackAlterarDados, feedbackNota});
    
    
    },

    //Alterar usuário
	alterarImagem: async (req,res)=> {

        const { name, email, type } = req.usuario;
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

        const token = jwt.sign({
			id: idUsuario,
			name,
			email,
			imagem: img,
			type
		}, 
		process.env.JWT_KEY,
		{
			expiresIn: "3h"
		});

		res.cookie("token", token, { httpOnly: true });

        return res.redirect('inicio');

	},

	alterarNome: async (req,res)=> {
        
        const { email, imagem, type } = req.usuario; 
		const idUsuario = req.usuario.id;
		let nomeUsuario = req.body.nome;

        
		const token = jwt.sign({
			id: idUsuario,
			name: nomeUsuario,
			email,
			imagem,
			type
		}, 
		process.env.JWT_KEY,
		{
			expiresIn: "3h"
		});

		res.cookie("token", token, { httpOnly: true });

		res.redirect("inicio");

		return;

	},

	alterarEmail: async (req,res)=> {

        const { name, emailUsuario, imagem, type } = req.usuario;
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
        
        const token = jwt.sign({
			id: idUsuario,
			name,
			email: emailUsuario,
			imagem,
			type
		}, 
		process.env.JWT_KEY,
		{
			expiresIn: "3h"
		});

		res.cookie("token", token, { httpOnly: true });

		res.redirect("inicio");

		return;

	},

	alterarSenha: async (req,res)=> {

        const { name, email, imagem, type } = req.usuario;
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

		const token = jwt.sign({
			id: idUsuario,
			name,
			email,
			imagem,
			type
		}, 
		process.env.JWT_KEY,
		{
			expiresIn: "3h"
		});

		res.cookie("token", token, { httpOnly: true });

		res.redirect("inicio");

		return;

	}
}
