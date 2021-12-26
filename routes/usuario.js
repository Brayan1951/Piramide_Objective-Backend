const {Router, response}=require('express')
const { check } = require('express-validator')
const { Obtenerusuarios,Createusuario } = require('../controllers/nombre')
const { validarCampos } = require('../middlewares/validacion-campos')
const {emailExiste} = require('../helpers');

const router=Router()


router.get('/',Obtenerusuarios)


router.post('/',[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("nombre","El nombre es obligatorio y debe ser mayor de 3").isLength({min:4}),
    check("email").custom(emailExiste),
    check("password","La contraseña es obligatorio").not().isEmpty(),
    check("password","El contraseña es obligatorio y debe ser mayor de 6").isLength({min:6}),
    validarCampos
],Createusuario)



module.exports=router