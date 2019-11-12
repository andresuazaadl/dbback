var mongoose = require('mongoose');
var uniqueValidato = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROL', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

var usuarioSchema = new Schema({
    
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique:true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesario'] },
    img: { type: String, required: false},
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
    decks: [
        {
            deck:[{ type: String }],
            sideck: [{ type: String }], 
        }]
});

usuarioSchema.plugin(uniqueValidato, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);