const {Aluno, Professor, Classe, Recado, Usuario, Tarefa, Classe_Aluno, Tarefa_Aluno} = require("../models");

let bcrypt = require("bcrypt");

// Exportando o Controller
module.exports = {

	recadosAlunos: async (req, res)=>{

		const idUsuario = req.usuario.id;
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

		const idUsuario = req.usuario.id;
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

		res.render("aluno/tarefas", {classe, classes:classesAluno.classes, usuario: req.usuario});
	},

	notasAlunos: async (req, res)=>{

		const idUsuario = req.usuario.id;
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

	inicioAlunos: (req, res)=>{

		const idUsuario = req.usuario.id;

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
						res.render("aluno/inicio", {usuario:req.usuario, aluno:alunoClasses});
					}
				)
			}
		) 

	},

	adicionarClasse: async (req, res)=>{

		const codigo = req.body.codigo;
		const idAluno = req.body.idAluno;

        let classe = await Classe.findOne(
			{
				where:{
					codigo:codigo
				}
			},
		);
			
		//Código da Classe não existe!
		if(classe == null){
			res.redirect("/aluno/inicio");

		// Código da Classe existe!
		}else{
			await Classe_Aluno.create({
				id_aluno: idAluno,
				id_classe: classe.id
			});
			res.redirect("/aluno/inicio");
		}
	},

	acessarClasse: async (req,res)=> {

		const idUsuario = req.usuario.id;
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

		const idUsuario = req.usuario.id;
		const idClasse = req.body.idClasse;

		let aluno = await Aluno.findOne({where:{id_usuario:idUsuario}});

		await Classe_Aluno.destroy({
			where:{
				id_aluno:aluno.id,
				id_classe:idClasse
			}
		});

		res.redirect("/aluno/inicio");

	},

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

		res.redirect("/aluno/inicio");

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

		res.redirect("/aluno/inicio");

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

		res.redirect("/aluno/inicio");

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

		res.redirect("/aluno/inicio");

	}
}