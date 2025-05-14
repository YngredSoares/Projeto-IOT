const express = require('express');
const conectarDB = require('./database');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');
const rotasRelatorio = require('./router/rotasRelatorio');
const relatorioController = require('./controller/relatorioController');
const PORT = 3000;
const app = express();

app.use(express.json())

conectarDB();

app.get('/', (req, res)=>{
    res.send('Servidor funcionando!')
});

app.use('/relatorio', rotasRelatorio);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
});

// Recebe as respostas do MQTT
client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  client.subscribe('mauri/teste');
});

client.on('message', (topic, message) => {
    try {
        const payload = JSON.parse(message.toString());
        relatorioController.criarRelatorio(payload);
    } catch(err) {
        console.log({error: err})
    }
});