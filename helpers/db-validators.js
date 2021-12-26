const { Usuario } = require("../models");


const emailExiste=async (correo="")=>{
    const existe=await Usuario.findOne({correo})
    if (existe) {
      throw new Error(`El email ${correo} ya esta registrando en la DB`);
    }
  }


  module.exports={
      emailExiste
  }
  