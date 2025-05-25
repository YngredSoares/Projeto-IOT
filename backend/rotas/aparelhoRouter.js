const aparelhoController = require('../controller/aparelhoController');
const router = require('express').Router();

router.get('/', aparelhoController.listarAparelhos);
router.post('/', aparelhoController.cadastrarAparelho);

module.exports = router;