const models = require("../models/index");
const bcrypt = require("bcrypt");

module.exports = {

    cadastroAluno: (req, res) => {

        res.render("cadastroAluno");

    },
    cadastroProfessor: (req, res) => {

        res.render("cadastroProfessor");

    },
    cadastrarAluno: (req, res, next) => {

        const {name, email, password} = req.body;

        models.Aluno.findAll(
            {
                attributes: ["id_usuario"],
                include: [
                    {
                        model: models.Usuario,
                        as: "usuarioAluno",
                        required: true,
                        where: { email: email }
                    }
                ]
            }
        )
        .then(query => {

            if(query.length > 0){

                res.status(409).render("cadastroAluno", {
                    title: "Erro!",
                    message: "Aluno já cadastrado!"
                });

                return;

            }else{

                bcrypt.hash(String(password), 10, (error, hash) => {
    
                    if(error) return res.status(500).send({error: error});
        
                    models.Usuario.create(
                    {
        
                        nome: name,
                        email: email,
                        senha: hash,
                        imagem: "avatar.png"
        
                    })
                    .then(user => models.Aluno.create({
                        id_usuario: user.id
                    }))
                    .then(response => res.redirect("/login"))
                    .catch(error => res.status(500).send(error));
                });
            }
        })
        .catch(error => res.status(500).send(error));
    },
    cadastrarProfessor: (req, res, next) => {

        const {name, email, password} = req.body;

        models.Professor.findAll(
            {
                attributes: ["id_usuario"],
                include: [
                    {
                        model: models.Usuario,
                        as: "usuarioProfessor",
                        required: true,
                        where: { email: email }
                    }
                ]
            }
        )
        .then(query => {

            if(query.length > 0){

                res.status(409).render("cadastroProfessor", {
                    title: "Erro!",
                    message: "Professor já cadastrado!"
                });

                return;

            }else{

                bcrypt.hash(String(password), 10, (error, hash) => {
    
                    if(error) return res.status(500).send({error: error});
        
                    models.Usuario.create(
                    {
        
                        nome: name,
                        email: email,
                        senha: hash,
                        imagem: "avatar.png"
        
                    })
                    .then(user => models.Professor.create({
                        id_usuario: user.id
                    }))
                    .then(response => res.redirect("/login"))
                    .catch(error => res.status(500).send(error));
                });
            }
        })
        .catch(error => res.status(500).send(error));
    
    }

};