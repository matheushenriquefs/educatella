//Exportando o controller
const { Aluno, Professor, Classe, Recado, Tarefa, Classe_Aluno, Usuario,Tarefa_Aluno } = require("../models")
const { check, validationResult } = require('express-validator');
const { CustomValidation } = require("express-validator/src/context-items");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = {
    // inicio view
    profInicio: async (req, res) => {

        const idUsuario = req.usuario.id
        let feedbackInicio = "inicio";

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
                            res.render('professor/inicio', { usuario: req.usuario, professor: professorClasses, feedbackInicio })
                        }
                    )
            }
        )
    },

    // Classes - criar, acessar, alterar e deletar
    criarClasse: async (req, res) => {

        const { nome, id_professor } = req.body
        let feedbackInicio = "Classe criada com sucesso!";
        let codigo = [];
        const idUsuario = req.usuario.id

        const generateCode = () => {

            const list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for(let i = list.length; i > list.length - 8; i--){

                let randomIndex = Math.floor(Math.random() * i);
                
                codigo.push(list[randomIndex]);

            }

            codigo = codigo.join("");

        }

        generateCode();

        const criar = await Classe.create(
            {
                nome,
                codigo,
                id_professor
            })
            .catch(error => res.status(500).send(error))

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
                                res.render('professor/inicio', { usuario: req.usuario, professor: professorClasses, feedbackInicio })
                            }
                        )
                }
            )
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

        res.render('professor/recados', { acessarClasse, professor, usuario: req.usuario })

    },

    updateClasse: async (req, res) => {

        const { id_classe, nome, codigo } = req.body;
        const idUsuario = req.usuario.id
        let feedbackInicio = "Classe editada com sucesso!";
        const alterar = await Classe.update({
            nome,
            codigo,
        },
            {
                where: { 
                    id: id_classe
                }
            });

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
                            res.render('professor/inicio', { usuario: req.usuario, professor: professorClasses, feedbackInicio })
                        }
                    )
            }
        )

    },

    destroyClasse: async (req, res) => {
        
        const { id_classe } = req.body
        const idUsuario = req.usuario.id
        let feedbackInicio = "Classe excluída com sucesso!";
        const deletar = await Classe.destroy({
            where: {
                id: id_classe
            }
        })
        
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
                            res.render('professor/inicio', { usuario: req.usuario, professor: professorClasses, feedbackInicio })
                        }
                    )
            }
        )

    },


    //olhar recados////////////////////////////////////////////////////////////////
    profRecados: async (req, res) => {
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        let feedbackRecado = "inicio";
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
        
       
       
        res.render('professor/recados', {usuario,acessarClasse, feedbackRecado});
    },
     //criar Recados////////////////////////////////////////////////////////////////
    profRecadosCriar: async (req, res) => {
       
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        let feedbackRecado = "Recado criado com sucesso!";
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
        
        res.render('professor/criar-recado', { recadosDB, usuario,acessarClasse, feedbackRecado});

    },
    //criar Recados////////////////////////////////////////////////////////////////
    profRecadosCriar2: async (req, res) => {
        let errors = validationResult(req);
        const { titulo, descricao } = req.body
        let feedbackRecado = "Recado criado com sucesso!";
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
        
        res.render('professor/recados', { recadosDB, usuario,acessarClasse, feedbackRecado});
    },
    //apagar recados////////////////////////////////////////////////////////////////
    profRecadosApagar: async (req, res) => {
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        const { id_classe } = req.query
        let feedbackRecado = "Recado apagado com sucesso!"

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
    
        res.render('professor/apagar-recado', {usuario,acessarClasse, feedbackRecado});
    },
        //apagar Recados////////////////////////////////////////////////////////////////
    profRecadosApagar2: async (req, res) => {
        const id  = req.params.id
        let usuario = req.usuario
        let id_classe = req.body.id_classe;

        const resultado = await Recado.destroy({
            where: {id_recados: id}
        })

        let feedbackRecado = "Recado apagado com sucesso!"

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

        res.render('professor/recados', {usuario,acessarClasse, feedbackRecado});
    },
    //Editar Recados////////////////////////////////////////////////////////////////
    profRecadosEditar: async (req, res) => {
        
        let usuario = req.usuario
        const idUsuario = req.usuario.id
        let feedbackRecado = "Recado alterado com sucesso!"
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

     
    res.render('professor/editar-recado', { usuario,acessarClasse, feedbackRecado});
    },
        //Editar Recados////////////////////////////////////////////////////////////////
    profRecadosEditar2: async (req, res) => {
        const { id } = req.params
        const { titulo, descricao, id_classe } = req.body
        let usuario = req.usuario

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

        let feedbackRecado = "Recado alterado com sucesso!"

        
        res.render('professor/recados', { usuario, acessarClasse, feedbackRecado});
        
    },

    gerenciarNota: async (req, res) => {
       
        const { tituloTarefa, descricaoTarefa } = req.body;
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
           
        res.render('professor/gerenciar-nota-aluno',{gerenciarDB, usuario,acessarClasse,classeDb,tarefas, aluno, feedbackNota});
     
    },
    ponerNotaAluno : async (req,res)=>{
        
        const { id_classe, id_aluno, nota } = req.body
        let usuario = req.usuario
        let id = req.params.id
        let classeDb = await Classe.findAll();
        feedbackNota = "Você aplicou a nota com sucesso!";
        
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
       
 
        res.render('professor/gerenciar-nota-aluno',{gerenciarDB, usuario,acessarClasse,classeDb,tarefas, aluno, feedbackNota});
    },

    ponerNotaAlunoTarefa: async (req,res) => {

        const { id_classe, id_tarefa, nota } = req.body;
        let usuario = req.usuario;
        let id = req.params.id;
        let feedbackNota = "Você aplicou a nota com sucesso!";

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

        res.render('professor/gerenciar-nota-tarefa',{usuario, acessarClasse, tarefasAlunos, tarefaProfessor, feedbackNota});

    },

    //Tarefas

    tarefaMenu: async (req, res) => {

        const idUsuario = req.usuario.id

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
    
    
        res.render('professor/postar-tarefa', { acessarClasse, professor, usuario: req.usuario, posts, feedbackTarefa })
        
    },

    addTarefa: async (req, res) => {

        const idUsuario = req.usuario.id
        const { tituloTarefa, descricaoTarefa, id_classe, data_entrega } = req.body;
        const { files } = req;
        let classeDb = await Classe.findAll();
        let feedbackTarefa = "Tarefa criada com sucesso!";

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
    
        res.render('professor/postar-tarefa', { acessarClasse, posts, professor, usuario:req.usuario, feedbackTarefa})
    
    },

    update: async (req, res) => {

        const idUsuario = req.usuario.id
        const { id_classe, id_tarefa, titulo, descricao } = req.body;

        let feedbackTarefa = "Tarefa alterada com sucesso!";
    
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
    
        res.render('professor/postar-tarefa', { acessarClasse, posts, professor, usuario:req.usuario, feedbackTarefa})
    },

    destroy: async (req, res) => {

        const idUsuario = req.usuario.id
        const {id, id_classe} = req.body;
        let feedbackTarefa = "Tarefa excluída com sucesso!";
    
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
    
        res.render('professor/postar-tarefa', { acessarClasse, posts, professor, usuario:req.usuario, feedbackTarefa})

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

    gerenciarNotasTarefas: async (req, res) => {

        const { id_classe, id_tarefa } = req.body
        let usuario = req.usuario
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

        res.render('professor/gerenciar-nota-tarefa',{usuario, acessarClasse, tarefasAlunos, tarefaProfessor, feedbackNota});
    
    
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
        
        await Usuario.update({
			nome:nomeUsuario
		},
		{
			where:{
				id:idUsuario
			}
		});

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
