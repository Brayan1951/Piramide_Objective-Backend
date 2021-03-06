const { Router, response } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validacion-campos");
const { emailExiste } = require("../helpers");
const { login } = require("../controllers/auth");
const { Obtenerusuarios } = require("../controllers/usuario");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [validarJWT], Obtenerusuarios);

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
