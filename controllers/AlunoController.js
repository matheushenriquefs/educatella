// Exportando o Controller
module.exports = {
	recadosAlunos: (req, res)=>{
		res.render("recadosAlunos");
	},
	tarefasAlunos: (req, res)=>{
		res.render("tarefasAlunos");
	},
	notasAlunos: (req, res)=>{
		res.render("notasAlunos");
	},
	salasAlunos: (req, res)=>{
		res.render("salasAlunos");
	}
}