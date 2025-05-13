const mongoose = require('mongoose');

const RelatorioSchema = new mongoose.Schema({ 
    dispositivo: { type: String, required: true },
    temperatura: { type: Number, required: true },
    umidade: { type: Number, required: true},
},
{
    timestamps: { createdAt: 'timestamp', updatedAt: false }
});

const Relatorio = mongoose.model('Relatorio', RelatorioSchema);

module.exports = Relatorio;