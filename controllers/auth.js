const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const { generarJWT } = require("../helpers");
const { Usuario } = require("../models");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificacion si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "El correo no existe",
      });
    }
    // Verificar que este activo

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "El usuario esta en esado inactivo",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "La contraseña o el email estan incorrectos",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500)({
      msg: "Hable con el administardor",
    });
  }
};

const renovarToken = async (req = request, res = response) => {
  const { usuario } = req;
  const token = await generarJWT(usuario.id);
  res.json({ usuario, token });
};

module.exports = {
  login,
  renovarToken,
};
