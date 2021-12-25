const {Propuesta} = require('../models');


const obtenerPropuestas=async(req,res=response)=>{

const [total,propuestas]=await Promise.all([
    Propuesta.countDocuments(),
    Propuesta.find()
])


res.json({
    total,propuestas
})



}



module.exports={
    obtenerPropuestas
}