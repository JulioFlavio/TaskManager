const express = require('express');
const router = express.Router();
const db = require('./connection');

// POST - Metodo pra buscar as tarefas do usuário que fez login
router.post('/', (req, res) => {
  const { id } = req.body;
  // console.log(req.body)
  const sql = 'SELECT * FROM Tarefas WHERE Tarefas.id_user = ?';
  const values = [id];
  // console.log(values)

  db.query(sql, values, (err, result) => {
    if (err) {
      // console.log('Erro ao buscar: ', err)
      res.status(500).json({ message: 'Houve um erro ao buscar informações' })
    } else {
      // console.log('Busca bem sucedida', result)
      res.status(200).json ({ tarefas: result })
    }
  })
});

// DELETE - Método para deletar uma tarefa específica do usuario
router.delete('/', (req, res) => {
  const { id } = req.body
  const sql = 'DELETE FROM Tarefas WHERE Tarefas.id = ?';
  const values = [id]

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("Erro ao deletar tarefa: ", err);
      res.status(500).json({ message: 'Erro ao deletar tarefa' })
    } else {
      console.log("Tarefa deletada com sucesso.")
      res.status(200).json({ message: "Tarefa deletada com sucesso" })
    }
  })
})



module.exports = router;