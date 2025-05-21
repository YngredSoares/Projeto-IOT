const usuarioController = require('../controller/usuarioController');
const express = require('express');
const router = express.Router();

router.post('/', usuarioController.cadastrarUsuario);

module.exports = router;