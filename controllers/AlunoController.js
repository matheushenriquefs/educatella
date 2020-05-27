const {Aluno, Professor, Classe, Recado, Tarefa, Classe_Aluno} = require("../models");
// Exportando o Controller
module.exports = {

	recadosAlunos: async (req, res)=>{

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

		let todasClasses = await Classe.findAll();

		res.render("aluno/recados", {classe, classes:todasClasses, usuario: req.usuario});
	},

	tarefasAlunos: async (req, res)=>{

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

		let todasClasses = await Classe.findAll();

		res.render("aluno/tarefas", {classe, classes:todasClasses, usuario: req.usuario});
	},

	notasAlunos: async (req, res)=>{

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

		let todasClasses = await Classe.findAll();

		res.render("aluno/notas", {classe, classes:todasClasses, usuario: req.usuario});
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

		let todasClasses = await Classe.findAll();

		res.render("aluno/recados", {classe, classes:todasClasses, usuario: req.usuario});

	}
}