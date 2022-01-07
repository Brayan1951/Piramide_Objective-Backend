const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { id, nombre } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(id);
    console.log(usuario);

    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario no existe en la DB",
      });
    }

    // Verificar si el uid esta activo (estado:true)

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "El usuario esta desactivado, hable con el administrado",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = { validarJWT };
