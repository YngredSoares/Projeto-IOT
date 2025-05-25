const AparelhoController = require('../controller/AparelhoController')
const router = require('express').Router();

router.get('/', AparelhoController.listarAparelhos);
router.get('/:id', AparelhoController.buscarPorId);
router.post('/', AparelhoController.cadastrarAparelho);
router.put('/:id', AparelhoController.atualizarAparelho);

module.exports = router;