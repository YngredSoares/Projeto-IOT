const Relatorio = require('../model/relatorio');

exports.criarRelatorio = async function(payload) {
    try {
        const novoRelatorio = new Relatorio({
            dispositivo: payload.dispositivo,
            temperatura: payload.temperatura,
            umidade: payload.umidade
        });

        const relatorio = await novoRelatorio.save();
        res.status(201).json(relatorio);
    } catch (err) {
        res.status(404).send({error: err});
    }
}

exports.exibirRelatorio = async function(req, res) {
    try {
        const relatorios = await Relatorio.find().sort({ createdAt: -1 });
        res.status(200).json(relatorios);
    } catch(err) {
        res.status(404).send({error: err});
    }
}