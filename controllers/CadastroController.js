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

        bcrypt.hash(password, 10, (error, hash) => {

            if(error) {return res.status(500).send({error: error})}

            models.Usuario.create(
            {

                nome: name,
                email: email,
                senha: hash

            })
            .then(user => models.Aluno.create({
                id_usuario: user.id
            }))
            .then(response => res.status(201).send({
                data: response,
                message: "Aluno cadastrado."
            }))
            .catch(error => res.status(500).send(error));

        });
    
    },
    cadastrarProfessor: (req, res, next) => {

        const {name, email, password} = req.body;

        bcrypt.hash(password, 10, (error, hash) => {

            if(error) {return res.status(500).send({error: error})}

            models.Usuario.create({

                nome: name,
                email: email,
                senha: hash
    
            })
            .then(user => models.Professor.create({
                id_usuario: user.id
            }))
            .then(response => res.status(201).send({
                data: response,
                message: "Professor cadastrado."
            }))
            .catch(error => res.status(500).send(error));

        });
    
    }

};