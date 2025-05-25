const RelatorioController = require('../controller/RelatorioController');
const express = require('express');
const router = express.Router();

router.post('/', RelatorioController.criarRelatorio);
router.get('/', RelatorioController.exibirRelatorio);

module.exports = router;
