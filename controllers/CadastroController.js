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

        const {name, email, password, type} = req.body;


        bcrypt.hash(password, 10, (error, hash) => {

            if(error) {return res.status(500).send({error: error})}

            models.User.create({

                name: name,
                email: email,
                password: hash,
                type: type
    
            })
            .then(result => res.status(200).send({
                data: result,
                message: "Aluno cadastrado."
            }))
            .catch(error => res.status(500).send(error));

        });
    
    },
    cadastrarProfessor: (req, res, next) => {

        const {name, email, password, type} = req.body;

        bcrypt.hash(password, 10, (error, hash) => {

            if(error) {return res.status(500).send({error: error})}

            models.User.create({

                name: name,
                email: email,
                password: hash,
                type: type
    
            })
            .then(result => res.status(200).send({
                data: result,
                message: "Professor cadastrado."
            }))
            .catch(error => res.status(500).send(error));

        });
    
    }

};