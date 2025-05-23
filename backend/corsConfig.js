const cors = require('cors');
require('dotenv').config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false // ativar somente quando a autenticação estiver pronta
};

module.exports = cors(corsOptions);
