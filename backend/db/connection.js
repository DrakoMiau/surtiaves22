const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         
  password: 'deiver16',         
  database: 'surtiaves' 
});

module.exports = pool;
