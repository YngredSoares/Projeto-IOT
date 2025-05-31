const RelatorioController = require('../controller/RelatorioController');
const express = require('express');
const router = express.Router();

router.post('/', RelatorioController.criarRelatorio);
router.get('/', RelatorioController.exibirRelatorio);
router.put('/:id', RelatorioController.atualizarRelatorio);
router.get('/:id', RelatorioController.obterRelatorioPorId);

module.exports = router;
