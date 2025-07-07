const express = require('express');
const cors = require('cors');
const app = express();

////////////////////////////////

app.use(cors());
// Permite ser acessado de outros locais (tem haver com o fetch do navegador)
app.use(express.json());
// API interpreta JSON (do front)
app.use(express.urlencoded({ extended: true }));
// API processa formulários do front

// Rotas (localhost:3000/rota)
app.use('/cadastro', require('./cadastro.js'))
// app.use('/login', require('./login.js'))

///////////////////////////////

app.get('/', (req, res) => {
  res.send('API funcionando');
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}\nUse localhost:${PORT}`);
})

///////////////////////////////