const express = require('express');
const conectarDB = require('./database');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');
const RelatorioRouter = require('./rotas/relatorioRouter');
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

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta http://127.0.0.1:${PORT}`);
});

// Recebe as respostas do MQTT
client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  client.subscribe('mauri/teste');
  client.publish('mauri/enviarComando')
});

client.on('message', async  (topic, message) => {
    try {
        const payload = JSON.parse(message.toString());
        console.log("O payload está sendo processado: \n", payload);

        await processarRelatorio(payload);

    } catch (err) {
        console.log({ error: err });
    }
});

let statusArCondicionado = false;


async function processarRelatorio(payload) {
    console.log(`O ar iniciou com STATUS: ${statusArCondicionado}`)
    try {
        await relatorioController.criarRelatorio(payload);

        if (payload.valor > 0) {
            
            console.log(`Sensor ${payload.sensor} ativado! Enviando mensagem para o ESP32.`);

            if(!statusArCondicionado){
                client.publish('mauri/enviarComando', JSON.stringify({
                    acao: 'ligar_ar'
                }));
    
                statusArCondicionado=true;
                console.log("O agora esta ligado")
            } else{
                client.publish('mauri/enviarComando', JSON.stringify({
                    acao: 'o ar ja esta ligado'
                }));
                console.log("AR JA ESTAVA LIGADO")
            }


        } else {
            client.publish('mauri/enviarComando', JSON.stringify({
                acao: 'desligar_ar'
            }));
            statusArCondicionado=false;
            console.log(`Sensor ${payload.sensor} desativado. Status do ar ${statusArCondicionado}`);
        }

    } catch (err) {
        console.log('Erro ao processar relatório:', err);
    }

};

