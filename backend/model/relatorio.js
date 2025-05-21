const mongoose = require('mongoose');

const RelatorioSchema = new mongoose.Schema({ 
    sensor: { type: String, required: true },
    valor: { type: Number, required: true }
},
{
    timestamps: { createdAt: 'timestamp', updatedAt: false }
});

const Relatorio = mongoose.model('Relatorio', RelatorioSchema);

module.exports = Relatorio;