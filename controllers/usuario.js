const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { Usuario } = require("../models");

const Obtenerusuarios = async (req, res = response) => {
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(),
    Usuario.find(),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const Createusuario = async (req, res = response) => {
  const { nombre, email, password } = req.body;
  const usuario = new Usuario({ nombre, email, password });

  // Encriptamos password, por predeterminado esta en 10 saltos
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en la db
  await usuario.save();

  res.json({
    usuario,
  });
};

const DeleteUsuario = async (req, res = response) => {
  const { id } = req.params;
  try {
    const updateUser = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.send({ msg: `el usuario con id ${id} se elimino correctamente` });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  Obtenerusuarios,
  Createusuario,
  DeleteUsuario,
};
