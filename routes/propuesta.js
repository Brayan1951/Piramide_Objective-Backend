const {Router, response}=require('express')
const { obtenerPropuestas } = require('../controllers/propuesta')


const router=Router()


router.get('/',obtenerPropuestas)


module.exports=router