var mongoose = require('mongoose');
var uniqueValidato = require('mongoose-unique-validator');

var statesValidos = {
    values: [1, 2],
    message: '{VALUE} no es un state permitido'
};

var Schema = mongoose.Schema;

var cartaSchema = new Schema({
    
    code: { type: String, unique:true, required: [true, 'code es necesario'] },
    name: { type: String, required: [true, 'name es necesario'] },
    series: { type: String, required: [true, 'series es necesario'] },
    rarity: { type: String, required: [true, 'rarity es necesario'] },
    type: { type: String, required: [true, 'type es necesario'] },
    color: { type: String, required: [true, 'color es necesario'] },
    power: { type: Number, required: false },
    energy: { type: Number, required: [true, 'energy es necesario'] },
    comboEnergy: { type: Number, required: false },
    comboPower: { type: Number, required: false },
    character: { type: String, required: false },
    specialTrait: { type: String, required: false },
    era: { type: String, required: false },
    skill: { type: String, required: [true, 'skill es necesario'] },
    state: { type: Number, required: true, default: 1, enum: statesValidos },
    
});

cartaSchema.plugin(uniqueValidato, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Carta', cartaSchema);