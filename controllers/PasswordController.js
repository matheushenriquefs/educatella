const models = require("../models/index");
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {

    renderRedefinirSenha: (req, res) => {

        return res.render("redefinir-senha");

    },
    redefinirSenha: async (req, res) => {

        const { email } = req.body;
        // Buscando o usuario no banco com o email informado pelo usuario
        const usuarioBanco = await models.Usuario.findAll({

            where: { email: email },

        });

        // Gerando uma senha aleatoria
        const generateNewPassword = () => {

            let newPassword = [];

            const list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for(let i = list.length; i > list.length - 10; i--){

                let randomIndex = Math.floor(Math.random() * i);
                
                newPassword.push(list[randomIndex]);

            }

            newPassword = newPassword.join("");

            return newPassword;

        }

        const newPassword = generateNewPassword();
        
        // Configurando o NodeMailer
        let transporter = nodemailer.createTransport(smtpTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            }
        }));
        
        // Definindo as configs do email
        const mailOptions = {
            from: `Educatella <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Sua senha foi redefinida!",
            html: `<p>Use esta senha para efetuar Login: <strong>${newPassword}</strong>. Depois você pode muda-lá clicando em seu avatar.</p>`
        };
        
        transporter.sendMail(mailOptions, (err, info) => {

            if(err){
                console.log(err);
                return res.render("redefinir-senha", { title: "Erro!", message: "Ooops... Algo de errado aconteceu, tente novamente."});

            }else{

                console.log('Email sent: ' + info.response);

                // Buscando usuarios no banco (o usuario pode estar cadastrado como professor e como aluno)
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
        
                        return res.render("redefinir-senha", { title: "Erro!", message: "Este e-mail não está cadastrado no Educatella."});
        
                    }else if(query.length >= 1){

                        for(let i = 0; i < usuarioBanco.length; i++){

                            models.Usuario.update({
                                senha: bcrypt.hashSync(newPassword, 10)
                            },
                            {
                                where:{
                                    id: usuarioBanco[i].dataValues.id
                                }
                            });	

                        }
                        
                        return res.render("redefinir-senha", { title: "Sucesso!", message: "Cheque sua caixa de e-mail para ver sua nova senha."});

                    }
                })
                
            }
            
        });
    
    }

}