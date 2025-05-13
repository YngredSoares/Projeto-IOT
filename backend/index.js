const express = require('express');
const conectarDB = require('./database');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

const app = express();
const PORT = 3000;

conectarDB();

app.get('/', (req, res)=>{
    res.send('Servidor funcionando!')
});

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
});

// Recebe as respostas do MQTT
client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  client.subscribe('mauri/teste');
});

client.on('message', (topic, message) => {
  const payload = message.toString();
  console.log('Dados recebidos:', payload);
});