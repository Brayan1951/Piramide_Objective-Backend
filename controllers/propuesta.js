const { response } = require("express");
const { Propuesta } = require("../models");

const obtenerPropuestas = async (req, res = response) => {
  const [total, propuestas] = await Promise.all([
    Propuesta.countDocuments(),
    Propuesta.find(),
  ]);

  res.json({
    total,
    propuestas,
  });
};

const Createdpropuesta = async (req, res = response) => {
  const { titulo, tags, introduccion, descripcion, propuesta } = req.body;

  const propuestaDB = await Propuesta.findOne({ titulo });
  if (propuestaDB) {
    return res.status(400).json({
      msg: `La propuesta con titulo ${titulo} ya existe`,
    });
  }

  const fecha = new Date().toUTCString();

  const data = {
    titulo,
    tags,
    introduccion,
    descripcion,
    propuesta,
    fecha,
    usuario: req.usuario._id,
  };
  const propuestacreatedb = new Propuesta(data);
  propuestacreatedb.save();

  res.status(201).json({ propuestacreatedb });
};

const motivarPropuesta = async (req, res = response) => {
  const { id } = req.params;
  const propuestadb = await Propuesta.findById(id);
  const cant = propuestadb.bueno + 1;
  //   res.send(propuestadb);
  //   console.log(propuestadb.bueno);
  try {
    const propuestadb = await Propuesta.findByIdAndUpdate(id, {
      bueno: cant,
    });
    res.status(200).send({ propuestadb });
  } catch (error) {
    console.log(error);
    throw new Error({
      nsg: "Hable con el administrador",
    });
  }
};

module.exports = {
  obtenerPropuestas,
  Createdpropuesta,
  motivarPropuesta,
};
