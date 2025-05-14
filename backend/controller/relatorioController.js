const Relatorio = require('../model/relatorio');

exports.criarRelatorio = async function(payload) {
    try {
        const novoRelatorio = new Relatorio({
            dispositivo: payload.dispositivo,
            temperatura: payload.temperatura,
            umidade: payload.umidade
        });

        await novoRelatorio.save();
    } catch (err) {
        console,log({error: err})
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