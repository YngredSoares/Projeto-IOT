const relatorioController = require('../controller/relatorioController');
const usuarioController = require('../controller/usuarioController');
const express = require('express');
const router = express.Router();

router.post('/', relatorioController.criarRelatorio);
router.get('/', relatorioController.exibirRelatorio);
router.post('/', usuarioController.cadastrarUsuario);

module.exports = router;
