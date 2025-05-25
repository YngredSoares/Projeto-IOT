const mongoose = require('mongoose');

const AparelhoSchema = new mongoose.Schema({
    nome_aparelho: { type: String, required: true },
    local: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    temperatura_atual: { type: Number, required: false },
    estado: { type: Boolean, required: true },
},
{
    timestamps: { createdAt: 'timestamp', updatedAt: false }
});

const Aparelho = mongoose.model('Aparelho',AparelhoSchema);

module.exports = Aparelho;