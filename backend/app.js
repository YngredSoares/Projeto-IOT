const express = require('express');
const conectarDB = require('./database');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');
const RelatorioRouter = require('./rotas/relatorioRouter');
const relatorioController = require('./controller/RelatorioController');
const UsuarioRouter = require('./rotas/usuarioRouter');
const AparelhoRouter = require('./rotas/AparelhoRouter');
const corsMiddleware = require('./corsConfig');
const authRouter = require('./rotas/authRouter');
const PORT = 3000;
const app = express();

conectarDB();

app.use(express.json())
app.use(corsMiddleware)

app.use('/api/relatorio', RelatorioRouter);
app.use('/api/aparelhos', AparelhoRouter);
app.use('/api/usuario', UsuarioRouter);
app.use('/api/auth', authRouter);

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
    const rawMessage = message.toString();
    console.log("\nMensagem recebida:", rawMessage);

    let payload;

    try {
        payload = JSON.parse(rawMessage);
    } catch (err) {
        console.warn("Mensagem ignorada: não é um JSON válido.");
        return;
    }

    try {
        console.log("\nPayload válido sendo processado:", payload);
        await processarRelatorio(payload);
    } catch (err) {
        console.error("Erro ao processar relatório:", err.message);
    }
});

let statusArCondicionado = false; //ar condicionado iniciou desligado

async function processarRelatorio(payload) {
    // console.log(`O ar iniciou com STATUS: ${statusArCondicionado}`)
    try {
        await relatorioController.criarRelatorio(payload);

        console.log(payload)

        const respostaLuminosidade = payload.sensor === "Luminosidade" && payload.valor === "0.00";
        const respostaMovimento = payload.sensor === "Movimento" && payload.valor === "1";

        console.log("Luminosidade: " + respostaLuminosidade)
        console.log("Movimento: " + respostaMovimento)

        if (respostaLuminosidade || respostaMovimento && !statusArCondicionado) {
            client.publish('mauri/enviarComando', 'ligar_ar');
            console.log("ligar_ar ")
            statusArCondicionado = true;
        } else {
            client.publish('mauri/enviarComando', 'desligar_ar');
            console.log("{ ação: desligar_ar }")
            statusArCondicionado = false;
        }

    } catch (err) {
        console.log('Erro ao processar relatório:', err);
    }

};

