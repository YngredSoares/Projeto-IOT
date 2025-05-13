const mongoose = require('mongoose');
require('dotenv').config(); //Carrega as informação que estão dentro do arquivo .env

const conectarDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Banco conectado');
    } catch (error){
        console.error('Erro ao concetar: ', error);
    }
}

module.exports = conectarDB;
