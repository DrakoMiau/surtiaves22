const express = require("express");
const cors = require("cors");
const db = require("./db/connection"); // tu archivo con la conexión mysql2

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ruta GET para obtener clientes
app.get("/clientes", (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) {
      console.error("Error al obtener clientes:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json(results);
  });
});

// Ruta POST para agregar un cliente
app.post("/clientes", (req, res) => {
  const { nombre } = req.body;
  db.query("INSERT INTO clientes (nombre) VALUES (?)", [nombre], (err, result) => {
    if (err) {
      console.error("Error al insertar cliente:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json({ id: result.insertId, nombre });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

