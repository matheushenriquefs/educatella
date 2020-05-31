const models = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {

    login: (req, res) => {

        res.render("login");

    },
    escolherUsuario: (req, res) => {

        res.render("escolherUsuario");

    },
    efetuarLogin: (req, res, next) => {

        const {email, password} = req.body;

        models.Usuario.findAll(
            {
                where: { email: email },
                include: [
                    {
                        model: models.Professor,
                        as: "usuarioProfessor",
                        required: false,
                        attributes: ["id_usuario"],
                        
                    },
                    {
                        model: models.Aluno,
                        as: "usuarioAluno",
                        required: false,
                        attributes: ["id_usuario"],

                    }
                ]
            }
        )
        .then(query => {

            if(query.length < 1){

                res.status(401).render("login", {
                    title: "Erro!",
                    message: "Falha na autenticação!"
                });

                return;

            }else if(query.length > 1){

                try{

                    bcrypt.compare(String(password), query[0].senha, (error, result) => {

                        if(error){
    
                            res.status(401).render("login", {
                                title: "Erro!",
                                message: "Falha na autenticação!"
                            });
    
                            return;
    
                        }
    
                        if(result){
    
                            bcrypt.compare(String(password), query[1].senha, (error2, result2) => {
    
                                if(error2){
    
                                    res.status(401).render("login", {
                                        title: "Erro!",
                                        message: "Falha na autenticação!"
                                    });
            
                                    return;
            
                                }
    
                                if(result2){
    
                                    const token = jwt.sign({
                                        idAluno: query[0].id,
                                        idProfessor: query[1].id,
                                        nameAluno: query[0].nome,
                                        nameProfessor: query[1].nome,
                                        email: query[0].email,
                                        imagemAluno: query[0].imagem,
                                        imagemProfessor: query[1].imagem,
                                        type: "Aluno e Professor"
                                    }, 
                                    process.env.JWT_KEY,
                                    {
                                        expiresIn: "3h"
                                    });

                                    res.cookie("token", token, { httpOnly: true });

                                    res.redirect("/escolherUsuario");
    
                                    return;
    
                                }
    
                                return res.status(401).render("login", { title: "Erro!", message: "Falha na autenticação!"});
    
                            });       
    
                        }
    
                    });
    
                    
                }catch (error){
                    
                    return res.status(401).render("login", { title: "Erro!", message: error});

                }

                
            }else if(query.length < 2){

                if(query[0].usuarioProfessor === null){

                    bcrypt.compare(String(password), query[0].senha, (error, result) => {
    
                        if(error){

                            res.status(401).render("login", {
                                title: "Erro!",
                                message: "Falha na autenticação!"
                            });
    
                            return;
    
                        }

                        if(result){

                            const token = jwt.sign({
                                id: query[0].id,
                                name: query[0].nome,
                                email: query[0].email,
                                imagem: query[0].imagem,
                                type: "Aluno"
                            }, 
                            process.env.JWT_KEY,
                            {
                                expiresIn: "3h"
                            });

                            res.cookie("token", token, { httpOnly: true });

                            res.redirect("/aluno/inicio");

                            return;

                        }

                        return res.status(401).render("login", { title: "Erro!", message: "Falha na autenticação!"});

                    });

                }else{

                    bcrypt.compare(String(password), query[0].senha, (error, result) => {
    
                        if(error){

                            res.status(401).render("login", {
                                title: "Erro!",
                                message: "Falha na autenticação!"
                            });
    
                            return;
    
                        }

                        if(result){

                            const token = jwt.sign({
                                id: query[0].id,
                                name: query[0].nome,
                                email: query[0].email,
                                imagem: query[0].imagem,
                                type: "Professor"
                            }, 
                            process.env.JWT_KEY,
                            {
                                expiresIn: "3h"
                            });

                            res.cookie("token", token, { httpOnly: true });

                            res.redirect("/professor/inicio");

                            return;

                        }

                        return res.status(401).render("login", { title: "Erro!", message: "Falha na autenticação!"});

                    });

                }

            }

        })
        .catch(error => res.status(500).send(error));

    }
    

}