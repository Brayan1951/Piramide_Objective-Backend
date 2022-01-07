const { Usuario } = require("../models");

const emailExiste = async (correo = "") => {
  const existe = await Usuario.findOne({ correo });
  if (existe) {
    throw new Error(`El email ${correo} ya esta registrando en la DB`);
  }
};

const UserExiste = async (id = "") => {
  const idExiste = await Usuario.findById(id);
  if (!idExiste) {
    throw new Error(`El Usuario con id: ${id} no existe`);
  }
};

module.exports = {
  emailExiste,
  UserExiste,
};
