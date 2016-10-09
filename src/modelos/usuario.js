import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  usuario: String,
  password: String,
  baja: { type: Boolean, default: true },
  email: String
  // grupo:[]
});

UsuarioSchema.statics.crear = (nombre, apellido, usuario, password, email) => {
  const parametros = {
    nombre,
    apellido,
    usuario,
    password,
    email
  };

  return new Promise((resolve, reject) => {
    this.create(parametros, (error, nuevoUsuario) => {
      if (error) {
        reject(error);
      } else {
        resolve(nuevoUsuario);
      }
    });
  });
};

UsuarioSchema.statics.obtenerUsuarios = function(){
  return new Promise( (resolve,reject) => {
    this.find({}, (error,usuarios) =>{
      if(error)
        reject(error)
      else
        resolve(usuarios)
    })
  })
}

UsuarioSchema.statics.obtenerUsuario = function(usuarioId){
  return new Promise( (resolve,reject) => {
    this.findOne({_id:usuarioId}, (error,usuario) =>{
      if(error)
        reject(error)
      else
        resolve(usuario)
    })
  })
}

UsuarioSchema.statics.modificarUsuario = function(usuario){
  return new Promise( (resolve,reject) => {
    var setObject = {
      $set:{nombre:usuario.nombre, apellido: usuario.apellido, usuario: usuario.usuario, email: usuario.email}
    }
    this.findOneAndUpdate({_id:usuario.id}, setObject,(error,usuario) =>{
      if(error)
        reject(error)
      else
        resolve(usuario)
    })
  })
}

var Usuario = mongoose.model('Usuario',UsuarioSchema)
module.exports = Usuario
