const express = require('express');
const router = express.Router();
const db = require('./connection');

// POST - Cadastro de novo usuario
router.post('/', (req, res) => {
  const {nomeCompleto, email, senha} = req.body;
  const sql = 'INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)';
  const values = [nomeCompleto, email, senha];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ icon: "error", title: "Erro ao cadastrar", text: "Este email já está em uso." });
      // Modelo SweetAlert para o front-end
    }
    else {
      // console.log('Usuário Cadastrado.');
      res.status(201).json({ icon: "success", title: "Usuário cadastrado!", text: "Tente fazer login!" });
    }
  })
})

module.exports = router;