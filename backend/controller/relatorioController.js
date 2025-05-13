const Relatorio = require('../model/relatorio');

exports.criarRelatorio = async function(payload) {
    try {
        const novoRelatorio = new Relatorio({
            dispositivo: payload.dispositivo,
            temperatura: payload.temperatura,
            umidade: payload.umidade
        });

        let relatorio = await novoRelatorio.save();
        console.log(relatorio);
    } catch (err) {
        console,log({error: err})
    }
}