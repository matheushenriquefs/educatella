const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {

    if(req.headers.authorization === undefined){
        
        return res.status(401).render('erros/401');

    }else{

        const token = req.headers.authorization.split(" ")[1];

        try {

            const decode = jwt.verify(token, process.env.JWT_KEY);
            req.usuario = decode;
            next();
            
        } catch (error) {
            
            return res.status(401).send({ title: "Erro!", message: "Falha na autenticação!" });
    
        }

    }

}