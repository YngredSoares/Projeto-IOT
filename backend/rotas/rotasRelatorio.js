const relatorioController = require('../controller/relatorioController');
const express = require('express');
const router = express.Router();

router.post('/', relatorioController.criarRelatorio);
router.get('/', relatorioController.exibirRelatorio);

module.exports = router;
