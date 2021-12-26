const {Router, response}=require('express')
const { check } = require('express-validator')
const { obtenerPropuestas, Createdpropuesta } = require('../controllers/propuesta')
const { validarCampos } = require('../middlewares/validacion-campos')


const router=Router()


router.get('/',obtenerPropuestas)


router.post('/',[
    check("titulo","El titulo es obligatorio").not().isEmpty(),
    check("titulo","El titulo es obligatorio y debe ser mayor de 6").isLength({min:6}),
    check("descripcion","La descripciòn es obligatorio").not().isEmpty(),
    check("descripcion","La descripciòn es obligatorio  y debe ser mayor de 6").isLength({min:6}),
    check("propuesta","La descripciòn es obligatorio").not().isEmpty(),
    check("propuesta","La descripciòn es obligatorio  y debe ser mayor de 20").isLength({min:20}),
    validarCampos
],Createdpropuesta)



module.exports=router