const { response } = require('express');
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


const Createdpropuesta=async(req,res=response)=>{

    const {titulo,tags,introduccion,descripcion,propuesta}=req.body
    const fecha=new Date().toUTCString()

    const data={
        titulo,tags,introduccion,descripcion,propuesta,fecha
    }
    const propuestadb=new Propuesta(data)
    propuestadb.save()

    res.status(201).json({propuestadb})


}





module.exports={
    obtenerPropuestas,
    Createdpropuesta
}