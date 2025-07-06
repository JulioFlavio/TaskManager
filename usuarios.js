const express = require('express');
const router = express.Router();
const db = require('./connection');
const { error } = require('jquery');

router.get('/', (req, res) => {
  // const { nome, email, senha } = req.body;
  // console.log(`Nome: ${nome}\nEmail: ${email}\nSenha: ${senha}`)
  res.send('Tá funcionando')
})

// POST - Cadastro de novo usuario
router.post('/cadastro', (req, res) => {
  const {nomeUsuario, email, senha} = req.body

  const sql = 'INSERT INTO Usuarios (nomeUsuario, email, senha_hash VALUES (?, ?, ?)'

  const values = [nomeUsuario, email, senha]

  db.query(sql, values, (error, result) => {
    if (error)
      console.error('Erro ao cadastrar usuário:', error)
    else
      console.log('Usuário Cadastrado.')
  })
})

module.exports = router;