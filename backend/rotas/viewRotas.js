const express = require('express');
const router = express.Router();
const Relatorio = require('../model/relatorio');

router.get('/', async(req,res)=>{
    try {
        const relatorio = await Relatorio.find();
        res.render('index', {relatorio})
    } catch (error) {
        res.status(500).send('Erro ao carregar relatório')
    }
})

module.exports = router;