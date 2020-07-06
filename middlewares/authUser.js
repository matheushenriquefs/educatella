  
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {

    if(req.cookies.token === undefined){
        
        return res.redirect("/error/401")

    }else{
        
        try {

            const {token} = req.cookies;
            const decode = jwt.verify(token, process.env.JWT_KEY);
            req.usuario = decode;

            if(req.originalUrl.includes("/aluno") && req.usuario.type === "Professor"){

                return res.redirect("/error/401/professor");

            }else if(req.originalUrl.includes("/professor") && req.usuario.type === "Aluno"){

                return res.redirect("/error/401/aluno");
            }else{
                next();
            }
            
        } catch (error) {
            
            return res.redirect("/error/401")
    
        }

    }

}