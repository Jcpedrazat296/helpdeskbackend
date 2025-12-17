const cases = require("../data/cases.json");
const fs = require("fs");
const path = require("path");

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
