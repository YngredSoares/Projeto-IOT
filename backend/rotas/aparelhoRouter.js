const AparelhoController = require('../controller/AparelhoController')
const router = require('express').Router();

router.get('/', AparelhoController.listarAparelhos);
router.get('/:id', AparelhoController.buscarPorId);
router.post('/', AparelhoController.cadastrarAparelho);
router.put('/:id', AparelhoController.atualizarAparelho);
router.delete('/:id', AparelhoController.deletarAparelho);

module.exports = router;