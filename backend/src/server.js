require('dotenv').config();

const express = require('express');
const cors = require('cors');

const produtosRoutes = require('./routes/produtos.routes');
const movimentacoesRoutes = require('./routes/movimentacoes.routes');
const authRoutes = require('./routes/auth.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor do Almoxarifado rodando ');
});

app.use('/ferramentas', produtosRoutes);
app.use('/movimentacoes', movimentacoesRoutes);
app.use('/auth', authRoutes);

//  SEMPRE por último
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;