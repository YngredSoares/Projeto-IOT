const Aparelho = require('../model/Aparelho');

exports.listarAparelhos = async (req, res) => {
    try {
        const aparelhos = await Aparelho.find();
        res.status(200).json(aparelhos)
    } catch (err) {
        res.status(500).json({ erro: 'Erro interno do servidor' })
    }
}

exports.buscarPorId = async (req, res) => {
    try {
        const aparelho = await Aparelho.findById(req.params.id);

        if (!aparelho) return res.status(404).send('Aparelho não encontrado');

        res.status(200).json(aparelho)
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

exports.atualizarAparelho = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        const atualizado = await Aparelho.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!atualizado) return res.status(404).json({ erro: 'Aparelho não encontrado' });

        res.status(200).json(atualizado)
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ erro: 'Campos obrigatórios ausentes ou inválidos', detalhes: err.errors })
        }
        res.status(500).json({ erro: 'Erro interno do servidor' })
    }
}

exports.deletarAparelho = async (req, res) => {
    try {
        const aparelho = await Aparelho.findById(req.params.id);

        if (!aparelho) return res.status(404).send('Aparelho não encontrado');

        await aparelho.deleteOne();

        res.status(200).send('Aparelho deletado!');
    } catch (err) {
        res.status(500).json({ erro: 'Erro interno do servidor' })
    }
}