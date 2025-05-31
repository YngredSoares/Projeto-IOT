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

exports.obterRelatorioPorId = async function(req, res) {
    try {
        const relatorio = await Relatorio.findById(req.params.id);

        if (!relatorio) return res.status(404).send("Relatorio não encontrado");
        
        res.json(relatorio);
    } catch(err) {
        throw new Error(err);
    }
}

exports.atualizarRelatorio = async function(req, res) {
    try {
        const id = req.params.id;
        const { sensor, valor } = req.body;

        const relatorio = await Relatorio.findById(id);

        if (!sensor || !valor ) return res.status(404).send("Os Valores não foram passados corretamente");

        relatorio.sensor = sensor;
        relatorio.valor = valor;

        await relatorio.save();

        res.status(200).json({relatorio})
    } catch (error) {
        
    }
}
