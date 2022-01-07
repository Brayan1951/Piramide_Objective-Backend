const { Schema, model } = require("mongoose");

const PropuestaSchema = Schema({
  titulo: {
    type: String,
    required: [true, "El titulo es obligatorio"],
  },
  tags: [
    {
      type: String,
    },
  ],
  introduccion: {
    type: String,
  },
  descripcion: {
    type: String,
    required: [true, "La descripciòn es obligatorio"],
  },
  propuesta: {
    type: String,
    required: [true, "La propuesta es obligatorio"],
  },
  fecha: {
    type: Date,
    required: [true, "La fecha es obligatorio"],
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: true,
  },
  bueno: {
    type: Number,
    default: 0,
  },
  // like, dislike, falta mejorar,
});

module.exports = model("Propuesta", PropuestaSchema);
