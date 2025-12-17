const { v4: uuid } = require("uuid");
const cases = require("../data/cases.json");
const fs = require("fs");
const path = require("path");

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

  // Guardar en memoria
  cases.push(newCase);

  // Guardar en archivo JSON
  const filePath = path.join(__dirname, "../data/cases.json");
  fs.writeFileSync(filePath, JSON.stringify(cases, null, 2));

  // Responder al frontend
  res.status(201).json({
    message: "Caso creado correctamente",
    caso: newCase
  });
};

exports.updateCase = (req, res) => {
  const { id } = req.params;
  const { estado, asignadoA } = req.body;

  const caso = cases.find(c => c.id === id);
  if (!caso) {
    return res.status(404).json({ message: "Caso no encontrado" });
  }

  if (estado) {
    caso.estado = estado;
    caso.historial.push({
      fecha: new Date().toISOString(),
      accion: `Estado cambiado a ${estado}`
    });
  }

  if (asignadoA) {
    caso.asignadoA = asignadoA;
    caso.historial.push({
      fecha: new Date().toISOString(),
      accion: `Caso reasignado a ${asignadoA}`
    });
  }

  caso.fechaActualizacion = new Date().toISOString();

  // Guardar cambios
  const filePath = path.join(__dirname, "../data/cases.json");
  fs.writeFileSync(filePath, JSON.stringify(cases, null, 2));

  res.json({
    message: "Caso actualizado correctamente",
    caso
  });
};
