const {Aluno, Professor, Classe, Recado, Usuario, Tarefa, Classe_Aluno, Tarefa_Aluno} = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let bcrypt = require("bcrypt");

// Exportando o Controller
module.exports = {

	recadosAlunos: async (req, res)=>{

		const idUsuario = req.usuario.idAluno;
		const idClasse = req.body.idClasse;
		
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

		res.render("aluno/recados", {classe, classes:classesAluno.classes, usuario: req.usuario});
	},

	tarefasAlunos: async (req, res)=>{

		const idUsuario = req.usuario.idAluno;
		const idClasse = req.body.idClasse;

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
		
		//filtra as tarefas que não possuem o id do aluno
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

		res.render("aluno/tarefas", {classe, tarefas, classes:classesAluno.classes, usuario: req.usuario, feedbackTarefa});
	},

	enviarTarefaAlunos: async (req, res) => {

		const idUsuario = req.usuario.idAluno;
		const idClasse = req.body.idClasse;
		const idTarefa = req.body.idTarefa;
		const { files } = req;
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
		
		//filtra as tarefas que não possuem o id do aluno
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

		res.render("aluno/tarefas", {classe, tarefas, classes:classesAluno.classes, usuario: req.usuario, feedbackTarefa});

	},

	notasAlunos: async (req, res)=>{

		const idUsuario = req.usuario.idAluno;
		const idClasse = req.body.idClasse;
		
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
		
		//filtra as tarefas que não possuem o id do aluno
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

		res.render("aluno/notas", {classe, classes:classesAluno.classes, usuario: req.usuario, tarefas});
	},

	inicioAlunos: async (req, res)=>{

		const idUsuario = req.usuario.idAluno;

		//feedback ao tentar acessar uma classe
		let feedback = "inicio";

		let aluno = await Aluno.findOne({where:{id_usuario:idUsuario}});
			
		let alunoClasses = await Aluno.findByPk(aluno.id,
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
			});
					
		res.render("aluno/inicio", {usuario:req.usuario, aluno:alunoClasses, feedback});

	},

	adicionarClasse: async (req, res)=>{

		const codigo = req.body.codigo;
		const idAluno = req.body.idAluno;
		let feedback = "inicio";

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

		res.render("aluno/inicio", {usuario:req.usuario, aluno, feedback});
	},

	acessarClasse: async (req,res)=> {

		const idUsuario = req.usuario.idAluno;
		const idClasse = req.body.idClasse;

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

		res.render("aluno/recados", {classe, classes:classesAluno.classes, usuario: req.usuario});

	},

	excluirClasse: async (req,res)=> {

		const idUsuario = req.usuario.idAluno;
		const idClasse = req.body.idClasse;
		//feedback ao tentar acessar uma classe
		let feedback = "Você saiu da classe com sucesso!";

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

		res.render("aluno/inicio", {usuario:req.usuario, aluno:dadosAluno, feedback});

	},

	alterarImagem: async (req,res)=> {

		const { nameAluno, email, type } = req.usuario;
		const idUsuario = req.usuario.idAluno;
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
			idAluno: idUsuario,
			nameAluno,
			email,
			imagemAluno: img,
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

	alterarNome: async (req,res)=> {
		
		const { email, imagemAluno, type } = req.usuario;
		const idUsuario = req.usuario.idAluno;
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
			idAluno: idUsuario,
			nameAluno: nomeUsuario,
			email,
			imagemAluno,
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

		const { nameAluno, emailUsuario, imagemAluno, type } = req.usuario;
		const idUsuario = req.usuario.idAluno;
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
			idAluno: idUsuario,
			nameAluno,
			email: emailUsuario,
			imagemAluno,
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

		const { nameAluno, email, imagemAluno, type } = req.usuario;
		const idUsuario = req.usuario.idAluno;
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
			idAluno: idUsuario,
			nameAluno,
			email,
			imagemAluno,
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