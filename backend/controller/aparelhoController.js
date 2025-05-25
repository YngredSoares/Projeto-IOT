const Aparelho = require('../model/aparelho');

exports.listarAparelhos = async (req, res) => {
    try {
        const aparelhos = await Aparelho.find();
        res.status(200).json(aparelhos)
    } catch (err) {
        res.status(500).json({ erro: 'Erro interno do servidor' })
    }
}

exports.cadastrarAparelho = async (req, res) =>{
    try {
        const novoAparelho = new Aparelho(req.body);
        const salvo = await novoAparelho.save()

        res.status(201).json(salvo)
    } catch(err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ erro: 'Campos obrigatórios ausentes ou inválidos', detalhes: err.errors })
        }
        res.status(500).json({ erro: 'Erro interno do servidor' })
    }
} 