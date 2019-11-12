var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var deckSchema = new Schema({
    nombre: { type: String, unique:true, required: [true, 'El nombre es necesario'] },
    deck: [{ type: String , required: [true, 'deck es necesario'] }],
    sideck: [{ type: String, required: false }],
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false },
    //state: { type: Number, required: true, default: 1, enum: statesValidos },
    
});

module.exports = mongoose.model('Dekc', deckSchema);