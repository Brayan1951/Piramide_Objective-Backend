const {Schema,model} = require('mongoose');



const PropuestaSchema=Schema({

    titulo:{
        type:String,
        required:[true,'El titulo es obligatorio']
    },
    tags:[{
        type:String
    }],
    introduccion:{
        type:String,
    },
    descripcion:{
        type:String,
        required:[true,'La descripciòn es obligatorio']
    },
    propuesta:{
        type:String,
        required:[true,'La propuesta es obligatorio']
    },
    fecha:{
        type:Date,
        required:[true,'La fecha es obligatorio']
    }
    // like, dislike, falta mejorar, usuario
    

})


module.exports=model('Propuesta',PropuestaSchema)