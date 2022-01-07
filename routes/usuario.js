const { Router, response } = require("express");
const { check } = require("express-validator");
const {
  Obtenerusuarios,
  Createusuario,
  DeleteUsuario,
} = require("../controllers/usuario");
const { validarCampos } = require("../middlewares/validacion-campos");
const { emailExiste, UserExiste } = require("../helpers");

const router = Router();

router.get("/", Obtenerusuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio y debe ser mayor de 3").isLength({
      min: 4,
    }),
    check("email").custom(emailExiste),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    check(
      "password",
      "El contraseña es obligatorio y debe ser mayor de 6"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  Createusuario
);

router.delete(
  "/:id",
  [
    check("id", "no es un id valido").isMongoId(),

    check("id").custom(UserExiste),

    validarCampos,
  ],
  DeleteUsuario
);

module.exports = router;
