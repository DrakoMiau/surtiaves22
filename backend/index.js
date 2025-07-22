const express = require("express");
const cors = require("cors");
const db = require("./db/connection"); // Pool mysql2/promise

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET all pedidos
app.get("/pedidos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pedidos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
});

// POST crear pedido
app.post("/pedidos", async (req, res) => {
  const { cliente_id, canal_venta_id, estado } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO pedidos (cliente_id, canal_venta_id, estado) VALUES (?, ?, ?)",
      [cliente_id, canal_venta_id, estado],
    );
    res.json({ message: "Pedido creado", insertId: result.insertId });
  } catch (err) {
    console.error("Error al crear pedido:", err);
    res.status(500).json({ error: "Error al crear pedido" });
  }
});

// PUT update pedido (actualiza estado)
app.put("/pedidos/:id", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    await db.query("UPDATE pedidos SET estado = ? WHERE id_pedido = ?", [
      estado,
      id,
    ]);
    res.sendStatus(204);
  } catch (err) {
    console.error("Error al modificar pedido:", err);
    res.status(500).json({ error: "Error al modificar pedido" });
  }
});

// DELETE un pedido
app.delete("/pedidos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM pedidos WHERE id_pedido = ?", [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error("Error al eliminar pedido:", err);
    res.status(500).json({ error: "Error al eliminar pedido" });
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

// POST nuevo cliente

app.post("/clientes", async (req, res) => {
  const { nombre, apellido, telefono, direccion, correo } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO clientes (nombre, apellido, telefono, direccion, correo) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, telefono, direccion, correo],
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error("Error al insertar cliente:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
});

// borrar clientes por id

app.delete("/clientes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM clientes WHERE id_cliente = ?"; // <-- "clientes"

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error eliminando cliente:", err);
      return res.status(500).json({ error: "Error eliminando cliente" });
    }
    res.json({ message: "Cliente eliminado correctamente" });
  });
});


// actualizar clientes por id

app.put("/clientes/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, telefono, direccion, correo } = req.body;

  const sql = `
    UPDATE clientes
    SET nombre = ?, apellido = ?, telefono = ?, direccion = ?, correo = ?
    WHERE id_cliente = ?
  `;

  db.query(
    sql,
    [nombre, apellido, telefono, direccion, correo, id],
    (err, result) => {
      if (err) {
        console.error("Error modificando cliente:", err);
        return res.status(500).json({ error: "Error actualizando cliente" });
      }
      res.json({ message: "Cliente actualizado correctamente" });
    },
  );
});


app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
