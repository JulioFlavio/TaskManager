const express = require('express');
const router = express.Router();
const db = require('./connection');

// POST - Login de usuário
router.post('/', (req, res) => {
  const {email, senha} = req.body;
  const sql = 'SELECT * FROM Usuarios WHERE email = ? AND senha_hash = ?';
  const values = [email, senha];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(202).json ({ icon: 'error', title: 'Falha ao entrar', text: 'Login ou senha invalidos! Tente novamente.' });
    } else {
      window.location.href = 'listas.html'
    }
  })
})