// Exportando o Controller
module.exports = {
	acessarAluno: (req, res)=>{
		res.render("aluno");
	},
	acessarClasse: (req, res)=>{
		res.render("classe");
	},
	acessarSituacao: (req, res)=>{
		res.render("situacao");
	},
	acessarAtividade: (req, res)=>{
		res.render("atividade");
	}
}