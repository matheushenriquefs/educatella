const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {

    const {token} = req.cookies;
    const decode = jwt.verify(token, process.env.JWT_KEY);
    if(decode.type === "Professor"){
        
        return res.redirect("/error/401/professor");
    }
    
    next();
    
}