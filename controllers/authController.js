const users = require("../data/users.json");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (password !== user.password) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  // 🔐 GENERAR TOKEN
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET || "clave_secreta",
    {
      expiresIn: "1h"
    }
  );

  res.json({
    message: "Login exitoso",
    token: token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    }
  });
};
