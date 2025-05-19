const express = require('express');
const conectarDB = require('./database');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');
const rotasRelatorio = require('./rotas/rotasRelatorio');
const relatorioController = require('./controller/relatorioController');
const viewRotas = require('./rotas/viewRotas');

const app = express();
app.use(express.json())
const PORT = 3000;

conectarDB();

app.use('/', viewRotas);
app.set('view engine', 'ejs')
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