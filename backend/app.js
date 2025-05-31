const express = require('express');
const conectarDB = require('./database');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');
const RelatorioRouter = require('./rotas/RelatorioRouter');
const relatorioController = require('./controller/RelatorioController');
const UsuarioRouter = require('./rotas/UsuarioRouter');
const AparelhoRouter = require('./rotas/AparelhoRouter');
const corsMiddleware = require('./corsConfig');
const PORT = 3000;
const app = express();

conectarDB();

app.use(express.json())
app.use(corsMiddleware)

app.use('/api/relatorio', RelatorioRouter);
app.use('/api/aparelhos', AparelhoRouter);
app.use('/api/usuario', UsuarioRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://127.0.0.1:${PORT}`);
});

// Recebe as respostas do MQTT
client.on('connect', () => {
    console.log('Conectado ao broker MQTT');
    client.subscribe('mauri/teste');
    client.publish('mauri/enviarComando')
});

client.on('message', async (topic, message) => {
    try {
        const payload = JSON.parse(message.toString());
        console.log("\nO payload está sendo processado: \n", payload);

        await processarRelatorio(payload);

    } catch (err) {
        console.log({ error: err });
    }
});

let statusArCondicionado = false; //ar condicionado iniciou desligado

async function processarRelatorio(payload) {
    // console.log(`O ar iniciou com STATUS: ${statusArCondicionado}`)
    try {
        await relatorioController.criarRelatorio(payload);

        const respostaLuminosidade = payload.sensor === "Luminosidade" && payload.valor === "0.00"; //resposta do sensor de luminosidade

        let timestampSensorMovimento;
        if (payload.sensor === "Movimento" && payload.valor === "1") {
            timestampSensorMovimento = new Date(payload.timestamp); //caso o sensor de movimento seja acionado essa variavel guarda o time
        }

        const respostaMovimentoUltimosMinutos = timestampSensorMovimento ? Date.now() - timestampSensorMovimento.getTime() >= 2 * 60 * 1000 : false;

        //se o sensor de Luz estiver ativo ou o sensor de movimento foi ativado nos ultimos 2 minutos -> MANTER AR LIGADO
        if (respostaLuminosidade || !respostaMovimentoUltimosMinutos) {

            // console.log(`Sensor ${payload.sensor} ativado! Enviando mensagem para o ESP32.`);

            if (!statusArCondicionado) { // se o ar estiver desligado -> MANDAR COMANDO LIGAR
                client.publish('mauri/enviarComando', JSON.stringify({
                    acao: 'ligar_ar'
                }));

                statusArCondicionado = true; //altera o status do ar para LIGADO
                console.log("AR LIGADO")
            } else { // senao -> O AR JA ESTAVA LIGADO
                client.publish('mauri/enviarComando', JSON.stringify({
                    acao: 'o ar ja esta ligado'
                }));
                console.log("AR JA ESTAVA LIGADO")
            }


        } else { //se o sensor de luz nao estiver mandando sinal e o de movimento nao tiver ativo ha 2 minutos -> MANDAR COMANDO DESLIGAR
            client.publish('mauri/enviarComando', JSON.stringify({
                acao: 'desligar_ar'
            }));
            statusArCondicionado = false; //altera o status do ar para DESLIGADO
            // console.log(`Sensor ${payload.sensor} desativado. Status do ar ${statusArCondicionado}`);
        }

    } catch (err) {
        console.log('Erro ao processar relatório:', err);
    }

};

