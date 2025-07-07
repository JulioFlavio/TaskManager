const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jj300804**',
  database: 'taskmanager'
})

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error)
    return;
  }
  console.log('Banco de dados conectado!')
})

module.exports = connection