const UsuarioController = require('../controller/UsuarioController');
const express = require('express');
const router = express.Router();
const autenToken = require('../middleware/auth'); 

router.post('/', UsuarioController.cadastrarUsuario); 

router.get('/perfil', autenToken, (req, res) => {
    res.json({
        message: 'Acesso concedido! Você está autenticado e na rota de perfil.',
        dadosDoUsuario: req.usuario
    });
});

module.exports = router;