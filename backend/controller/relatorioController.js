const Relatorio = require('../model/Relatorio');

exports.criarRelatorio = async function(payload) {
    try {
        const novoRelatorio = new Relatorio({
            sensor: payload.sensor,
            valor: payload.valor
        });

        await novoRelatorio.save();
        return novoRelatorio;

    } catch (err) {
        console.log({error: err})
    }
}

exports.exibirRelatorio = async function(req, res) {
    try {
        const relatorios = await Relatorio.find().sort({ createdAt: -1 });
        res.json(relatorios);
    } catch(err) {
        throw new Error(err);
    }
}
