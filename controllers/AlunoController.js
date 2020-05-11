// Exportando o Controller
module.exports = {
	recadosAlunos: (req, res)=>{
		res.render("aluno/recados");
	},
	tarefasAlunos: (req, res)=>{
		res.render("aluno/tarefas");
	},
	notasAlunos: (req, res)=>{
		res.render("aluno/notas");
	},
	inicioAlunos: (req, res)=>{
		res.render("aluno/inicio");
	}
}