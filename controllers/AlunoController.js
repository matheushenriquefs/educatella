const {Aluno, Professor, Classe, Recado, Usuario, Tarefa, Classe_Aluno, Tarefa_Aluno} = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let bcrypt = require("bcrypt");

// Exportando o Controller
module.exports = {

	recadosAlunos: async (req, res)=>{

		const idUsuario = req.usuario.id;
		const idClasse = req.body.idClasse;
		let feedbackAlterarDados = "inicio";
		
		let classe = await Classe.findByPk(idClasse,
			{
				include:[
                    {
                        model: Professor, 
						as:'professor', 
						include: 'usuarioProfessor'
                    },
                    { 
                        model: Recado, 
                        as:'recado'
                    }
                ]
			}
		);

		let aluno = await Aluno.findOne({where:{id_usuario:idUsuario}});

		let classesAluno = await Aluno.findByPk(aluno.id,
			{
				include:{
					model: Classe, 
					as:'classes', 
					include:{
						model: Professor,
						as:'professor',
						include: 'usuarioProfessor'
					}
				}
			}
		)

		res.render("aluno/recados", {classe, classes:classesAluno.classes, usuario: req.usuario, feedbackAlterarDados});
	},

	tarefasAlunos: async (req, res)=>{

		const idUsuario = req.usuario.id;
		const idClasse = req.body.idClasse;
		let feedbackAlterarDados = "inicio";

		let feedbackTarefa = "inicio";
		
		let classe = await Classe.findByPk(idClasse,
			{
				include:[
                    {
                        model: Professor, 
						as:'professor', 
						include: 'usuarioProfessor'
                    },
                    {
                        model: Tarefa, 
                        as:'tarefa'
                    }
                ]
			}
		);

		let aluno = await Aluno.findOne({where:{id_usuario:idUsuario}});

		let tarefas = await Tarefa.findAll(
			{
				include:{
					model: Tarefa_Aluno, 
					as:'tarefasAlunos'
				},
				where: {
					id_classe:idClasse
				}
			}
		);

		function verificaidAluno(tarefaAluno){
            return tarefaAluno.id_aluno == aluno.id;
        }
        
        for(let contador = 0; contador < tarefas.length; contador++){
            tarefas[contador].tarefasAlunos = tarefas[contador].tarefasAlunos.filter(verificaidAluno);
        }

		let classesAluno = await Aluno.findByPk(aluno.id,
			{
				include:{
					model: Classe, 
					as:'classes', 
					include:{
						model: Professor,
						as:'professor',
						include: 'usuarioProfessor'
					}
				}
			}
		)

		res.render("aluno/tarefas", {classe, tarefas, classes:classesAluno.classes, usuario: req.usuario, feedbackTarefa, feedbackAlterarDados});
	},

	enviarTarefaAlunos: async (req, res) => {

		const idUsuario = req.usuario.id;
		const idClasse = req.body.idClasse;
		const idTarefa = req.body.idTarefa;
		const { files } = req;
		let feedbackAlterarDados = "inicio";
		let feedbackTarefa = "inicio";

		let aluno = await Aluno.findOne({where:{id_usuario:idUsuario}});

		let tarefaCriada = await Tarefa_Aluno.findOne({
			where:{
				id_tarefa: idTarefa,
				id_aluno: aluno.id
			}
		});

		if(tarefaCriada == null){

			await Tarefa_Aluno.create({
				id_tarefa: idTarefa,
				id_aluno: aluno.id,
				arquivo: files[0].originalname
			});
	
			feedbackTarefa = "Tarefa enviada com sucesso!";
		}else{

			await Tarefa_Aluno.update({
				arquivo: files[0].originalname
			}, 
			{
				where:{
					id_tarefa: idTarefa,
					id_aluno: aluno.id
				}
			});
	
			feedbackTarefa = "Tarefa editada com sucesso!";
		}

		
		
		let classe = await Classe.findByPk(idClasse,
			{
				include:[
                    {
                        model: Professor, 
						as:'professor', 
						include: 'usuarioProfessor'
                    },
                    {
                        model: Tarefa, 
                        as:'tarefa'
                    }
                ]
			}
		);

		let tarefas = await Tarefa.findAll(
			{
				include:{
					model: Tarefa_Aluno, 
					as:'tarefasAlunos'
				},
				where: {
					id_classe:idClasse
				}
			}
		);

		function verificaidAluno(tarefaAluno){
            return tarefaAluno.id_aluno == aluno.id;
        }
        
        for(let contador = 0; contador < tarefas.length; contador++){
            tarefas[contador].tarefasAlunos = tarefas[contador].tarefasAlunos.filter(verificaidAluno);
        }

		let classesAluno = await Aluno.findByPk(aluno.id,
			{
				include:{
					model: Classe, 
					as:'classes', 
					include:{
						model: Professor,
						as:'professor',
						include: 'usuarioProfessor'
					}
				}
			}
		)

		res.render("aluno/tarefas", {classe, tarefas, classes:classesAluno.classes, usuario: req.usuario, feedbackTarefa, feedbackAlterarDados});

	},

	notasAlunos: async (req, res)=>{

		const idUsuario = req.usuario.id;
		const idClasse = req.body.idClasse;
		let feedbackAlterarDados = "inicio";
		
		let classe = await Classe.findByPk(idClasse,
			{
				include:[
                    {
                        model: Professor, 
						as:'professor', 
						include: 'usuarioProfessor'
                    },
                    {
                        model: Tarefa, 
                        as:'tarefa'
                    }
                ]
			}
		);

		let aluno = await Aluno.findOne({where:{id_usuario:idUsuario}});

		let tarefas = await Tarefa.findAll(
			{
				include:{
					model: Tarefa_Aluno, 
					as:'tarefasAlunos'
				},
				where: {
					id_classe:idClasse
				}
			}
		);

		function verificaidAluno(tarefaAluno){
            return tarefaAluno.id_aluno == aluno.id;
        }
        
        for(let contador = 0; contador < tarefas.length; contador++){
            tarefas[contador].tarefasAlunos = tarefas[contador].tarefasAlunos.filter(verificaidAluno);
        }

		let classesAluno = await Aluno.findByPk(aluno.id,
			{
				include:{
					model: Classe, 
					as:'classes', 
					include:{
						model: Professor,
						as:'professor',
						include: 'usuarioProfessor'
					}
				}
			}
		)

		res.render("aluno/notas", {classe, classes:classesAluno.classes, usuario: req.usuario, tarefas, feedbackAlterarDados});
	},

	inicioAlunos: (req, res)=>{

		const idUsuario = req.usuario.id;
		let feedbackAlterarDados = "inicio";

		//feedback ao tentar acessar uma classe
		let feedback = "inicio";

		Aluno.findOne({where:{id_usuario:idUsuario}}).then(
			aluno => {
				Aluno.findByPk(aluno.id,
					{
						include:{
							model: Classe, 
							as:'classes', 
							include:{
								model: Professor,
								as:'professor',
								include: 'usuarioProfessor'
							}
						}
					}
				).then(
					alunoClasses => {
						res.render("aluno/inicio", {usuario:req.usuario, aluno:alunoClasses, feedback, feedbackAlterarDados});
					}
				)
			}
		);

	},

	adicionarClasse: async (req, res)=>{

		const codigo = req.body.codigo;
		const idAluno = req.body.idAluno;
		let feedback = "inicio";
		let feedbackAlterarDados = "inicio";

        let classe = await Classe.findOne(
			{
				where:{
					codigo:codigo
				}
			},
		);
			
		//Código da Classe não existe!
		if(classe == null){

			feedback = "Código Incorreto!"
			
		// Código da Classe existe!
		}else{

			await Classe_Aluno.create({
				id_aluno: idAluno,
				id_classe: classe.id
			});

			feedback = "Classe Acessada com sucesso!"
		}

		let aluno = await Aluno.findByPk(idAluno, {
			include:{
				model: Classe, 
				as:'classes', 
				include:{
					model: Professor,
					as:'professor',
					include: 'usuarioProfessor'
				}
			}
		});

		res.render("aluno/inicio", {usuario:req.usuario, aluno, feedback, feedbackAlterarDados});
	},

	acessarClasse: async (req,res)=> {

		const idUsuario = req.usuario.id;
		const idClasse = req.body.idClasse;
		let feedbackAlterarDados = "inicio";
		

		let classe = await Classe.findByPk(idClasse,
			{
				include:[
                    {
                        model: Professor, 
						as:'professor', 
						include: 'usuarioProfessor'
                    },
                    {
                        model: Recado, 
                        as:'recado'
                    }
                ]
			}
		);

		let aluno = await Aluno.findOne({where:{id_usuario:idUsuario}});

		let classesAluno = await Aluno.findByPk(aluno.id,
			{
				include:{
					model: Classe, 
					as:'classes', 
					include:{
						model: Professor,
						as:'professor',
						include: 'usuarioProfessor'
					}
				}
			}
		)

		res.render("aluno/recados", {classe, classes:classesAluno.classes, usuario: req.usuario, feedbackAlterarDados});

	},

	excluirClasse: async (req,res)=> {

		const idUsuario = req.usuario.id;
		const idClasse = req.body.idClasse;
		let feedbackAlterarDados = "inicio";
		//feedback ao tentar acessar uma classe
		let feedback = "inicio";

		let aluno = await Aluno.findOne({where:{id_usuario:idUsuario}});

		await Classe_Aluno.destroy({
			where:{
				id_aluno:aluno.id,
				id_classe:idClasse
			}
		});

		let dadosAluno = await Aluno.findOne({
			include:{
				model: Classe, 
				as:'classes', 
				include:{
					model: Professor,
					as:'professor',
					include: 'usuarioProfessor'
				}
			}, 
			where:{
				id_usuario:idUsuario
			}
		});

		res.render("aluno/inicio", {usuario:req.usuario, aluno:dadosAluno, feedback, feedbackAlterarDados});

	},

	alterarImagem: async (req,res)=> {

		const idUsuario = req.usuario.id;
		let img = req.file.filename;
		let feedbackAlterarDados = "Imagem Alterada com sucesso!";
		//feedback ao tentar acessar uma classe
		let feedback = "inicio";

		await Usuario.update({
			imagem:img
		},
		{
			where:{
				id:idUsuario
			}
		});

		let aluno = await Aluno.findOne({
			include:{
				model: Classe, 
				as:'classes', 
				include:{
					model: Professor,
					as:'professor',
					include: 'usuarioProfessor'
				}
			}, 
			where:{
				id_usuario:idUsuario
			}
		});

		res.render("aluno/inicio", {usuario:req.usuario, aluno, feedback, feedbackAlterarDados});

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