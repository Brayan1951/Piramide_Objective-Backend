const {Schema,model} = require('mongoose');



const PropuestaSchema=Schema({

    titulo:{
        type:String,
        required:[true,'El titul es obligatorio']
    },
    tags:[{
        type:String
    }],
    introduccion:{
        type:String,
        required:[true,'La introducciòn es obligatorio']
    },
    descripcion:{
        type:String,
        required:[true,'La descripciòn es obligatorio']
    }

})


module.exports=model('Propuesta',PropuestaSchema)