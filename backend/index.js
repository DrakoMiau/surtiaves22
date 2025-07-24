const express = require("express");
const cors = require("cors");
const db = require("./db/connection"); // Pool mysql2/promise

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Login
app.post("/login", async (req, res) => {
  const { nombre_usuario, contrasena, rol } = req.body;
  console.log("📥 [LOGIN] Body recibido:", req.body);

  if (!nombre_usuario || !contrasena || !rol) {
    return res.status(400).json({ error: "Faltan datos para autenticar" });
  }

  try {
    const [rows] = await db.query(
      `SELECT id_usuario, nombre_usuario, contrasena, rol
       FROM usuarios
       WHERE nombre_usuario = ? AND contrasena = ? AND rol = ?`,
      [nombre_usuario, contrasena, rol],
    );

    console.log("🔍 [LOGIN] Resultado de la consulta:", rows);

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Credenciales inválidas o rol incorrecto" });
    }

    return res.json({ success: true, usuario: rows[0] });
  } catch (err) {
    console.error("❌ [LOGIN] Error inesperado:", err);
    return res
      .status(500)
      .json({ error: "Error interno al autenticar", detail: err.message });
  }
});

// pedidos 
app.get("/pedidos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pedidos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
});

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

// clientes
app.get("/clientes", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM clientes");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener clientes:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
});

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

app.delete("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM clientes WHERE id_cliente = ?", [id]);
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (err) {
    console.error("Error eliminando cliente:", err);
    res.status(500).json({ error: "Error eliminando cliente" });
  }
});

app.put("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, direccion, correo } = req.body;
  try {
    await db.query(
      `UPDATE clientes SET nombre = ?, apellido = ?, telefono = ?, direccion = ?, correo = ? WHERE id_cliente = ?`,
      [nombre, apellido, telefono, direccion, correo, id],
    );
    res.json({ message: "Cliente actualizado correctamente" });
  } catch (err) {
    console.error("Error modificando cliente:", err);
    res.status(500).json({ error: "Error actualizando cliente" });
  }
});

// filtrar pedidos
app.get("/pedidos/estado/:estado", async (req, res) => {
  const estado = req.params.estado;
  try {
    const [rows] = await db.query("CALL ObtenerPedidosPorEstado(?)", [estado]);
    res.json(rows[0]); // El resultado está en rows[0] al usar CALL
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener pedidos por estado" });
  }
});

// total pedidos
app.get("/pedidos/total", async (req, res) => {
  try {
    const [rows] = await db.query("CALL ContarPedidos()");
    res.json(rows[0][0]); // Solo un resultado, acceder a la fila 0
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al contar pedidos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
