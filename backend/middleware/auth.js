const authController = require('../controller/authController');
const jwt = require('jsonwebtoken');

const SECRET = authController.SECRET

function autenToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.sendStatus(401)

    jwt.verify(token, SECRET, (err, usuario) => {
        if(err) return res.sendStatus(403)
            req.usuario = usuario;
            next();
    })
}
module.exports = autenToken;