var mongoose = require('mongoose')

var PrivilegioSchema = new mongoose.Schema({
  nombre: String
})

var Privilegio = mongoose.model('Privilegio',PrivilegioSchema)
module.exports = Privilegio
