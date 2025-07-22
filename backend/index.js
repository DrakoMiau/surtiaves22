
const express = require("express");
const cors = require("cors");
const db = require("./db/connection"); // Asegúrate que sea mysql2/promise

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET all pedidos
app.get('/pedidos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pedidos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener pedidos' }); // 👈 Usa JSON en la respuesta
  }
});

// PUT update pedido
app.put('/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    await db.query('UPDATE pedidos SET estado = ? WHERE id_pedido = ?', [estado, id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al modificar pedido');
  }
});

// GET clientes
app.get("/clientes", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM clientes");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener clientes:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
});

// DELETE un pedido
app.delete('/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar pedido');
  }
});

// POST nuevo cliente
app.post("/clientes", async (req, res) => {
  const { nombre } = req.body;
  try {
    const [result] = await db.query("INSERT INTO clientes (nombre) VALUES (?)", [nombre]);
    res.json({ id: result.insertId, nombre });
  } catch (err) {
    console.error("Error al insertar cliente:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

