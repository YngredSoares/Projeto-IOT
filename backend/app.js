const express = require('express');
const conectarDB = require('./database');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');
const rotasRelatorio = require('./rotas/relatorioRouter');
const relatorioController = require('./controller/relatorioController');
const usuarioRouter = require('./rotas/usuarioRouter');
const corsMiddleware = require('./corsConfig');
const PORT = 3000;
const app = express();

conectarDB();

app.use(express.json())
app.use(corsMiddleware)

app.use('/api/relatorio', rotasRelatorio);
app.use('/api/usuario', usuarioRouter);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta http://127.0.0.1:${PORT}`);
});

// Recebe as respostas do MQTT
client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  client.subscribe('mauri/teste');
});

client.on('message', (topic, message) => {
    try {
        const payload = JSON.parse(message.toString());
        console.log(payload);
        relatorioController.criarRelatorio(payload);
    } catch(err) {
        console.log({error: err})
    }
});