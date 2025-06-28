const Usuario = require('../model/usuario');
const jwt = require('jsonwebtoken');
const SECRET = "qualquerSegredo";

exports.SECRET = SECRET;

exports.login = async (req, res) => {
    const {login, senha} = req.body
    if(!login||!senha){
        return res.status(400).json({erro:"Login e senha são obrigatórios"})
    }

    try {
        const usuario = await Usuario.findOne({login, senha})
        if(!usuario){
            return res.status(401).json({erro:"Credenciais inválidas"})
        }
        const token = jwt.sign({id: usuario._id, login: usuario.login}, SECRET, {
            expiresIn: "1h",
        })
        res.json({token})
        
    } catch (error) {
        res.status(500).json({erro:"Erro ao gerar token!"})
        
    }
}