const UsuarioController = require('../controller/UsuarioController');
const express = require('express');
const router = express.Router();

router.post('/', UsuarioController.cadastrarUsuario);

module.exports = router;