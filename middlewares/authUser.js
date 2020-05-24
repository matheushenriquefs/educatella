const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {

    if(req.cookies.token === undefined){
        
        return res.status(401).render('not-found');

    }else{
        
        try {

            const {token} = req.cookies;
            const decode = jwt.verify(token, process.env.JWT_KEY);
            req.usuario = decode;
            next();
            
        } catch (error) {
            
            return res.status(401).send({ title: "Erro!", message: "Falha na autenticação!" });
    
        }

    }

}