const {Schema,model} = require('mongoose');


const UsuarioSchema=Schema({

    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    email:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatorio'],
    },
    estado:{
        type:Boolean,
        default:true
    }

})

module.exports=model('Usuario',UsuarioSchema)