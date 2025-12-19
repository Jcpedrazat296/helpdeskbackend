const { v4: uuid } = require("uuid");
const cases = require("../data/cases.json");
const fs = require("fs");
const path = require("path");

// 📌 LISTAR CASOS
exports.getCases = (req, res) => {
  res.json(cases);
};

// 📌 CREAR CASO
exports.createCase = (req, res) => {
  const { titulo, descripcion, categoria } = req.body;

  if (!titulo || !descripcion || !categoria) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const newCase = {
    id: uuid(),
    titulo,
    descripcion,
    categoria,
    estado: "abierto",
    creadoPor: "usuario_externo",
    asignadoA: "soporte_nivel_1",
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString(),
    historial: [
      {
        fecha: new Date().toISOString(),
        accion: "Caso creado por usuario externo"
      }
    ]
  };

  cases.push(newCase);

  const filePath = path.join(__dirname, "../data/cases.json");
  fs.writeFileSync(filePath, JSON.stringify(cases, null, 2));

  res.status(201).json({
    message: "Caso creado correctamente",
    caso: newCase
  });
};
