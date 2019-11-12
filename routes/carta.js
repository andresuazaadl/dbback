var express = require('express');

var app = express();

var mdAutenticacion = require('../middelwares/autenticacion');

var Carta = require('../models/carta');

// OPTENER CARTAS

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Carta.find({})
        .skip(desde)
        .limit(3)
        .exec(
        ( err, cartas ) => {
 
        if (err) return res.status(500).json({
            ok:false,
            mensaje: 'Error cargando cartas',
            errors: err
        });

        Carta.count({}, (err, conteo) => {
            res.status(200).json({
                ok:true,
                mensaje: 'Cartas: ',
                cartas: cartas,
                total: conteo
            });
        });

    }); 

});

// CREAR CARTA

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;
    var carta = Carta({
        code: body.code,
        name: body.name,
        series: body.series,
        rarity: body.rarity,
        type: body.type,
        color: body.color,
        power: body.power,
        energy: body.energy,
        comboEnergy: body.comboEnergy,
        comboPower: body.comboPower,
        character: body.character,
        specialTrait: body.specialTrait,
        era: body.era,
        skill: body.skill
    });

    carta.save(( err, cartaGuardada) => {

        if (err) return res.status(400).json({
            ok:false,
            mensaje: 'Error al crear la carta',
            errors: err
        });

        res.status(201).json({
            ok:true,
            carta: cartaGuardada
        });
    });
});

// ACTUALIZAR CARTA

app.put('/:id', mdAutenticacion.verificaToken,(req,res) => {

    var id = req.params.id;
    var body = req.body;

    Carta.findById( id, ( err, carta ) => {

        if (err) return res.status(500).json({
            ok:false,
            mensaje: 'Error al buscar la carta',
            errors: err
        });

        if (!carta) return res.status(400).json({
            ok:false,
            mensaje: 'La carta con el Code '+id+' no existe',
            errors: { message: 'No existe una carta con ese Code' }
        });

        carta.code = body.code,
        carta.name = body.name,
        carta.series = body.series,
        carta.rarity = body.rarity,
        carta.type = body.type,
        carta.color = body.color,
        carta.power = body.power,
        carta.energy = body.energy,
        carta.comboEnergy = body.comboEnergy,
        carta.comboPower = body.comboPower,
        carta.character = body.character,
        carta.specialTrait = body.specialTrait,
        carta.era = body.era,
        carta.skill = body.skill
        carta.state = body.state

        carta.save( ( err, cartaGuardada ) => {

            if (err) return res.status(400).json({
                ok:false,
                mensaje: 'Error al actualizar usuario',
                errors: err
            });

            res.status(200).json({
                ok:true,
                carta: cartaGuardada
            }); 
        });
    });
});


// BORRAR USUARIO POR ID

app.delete('/:id', mdAutenticacion.verificaToken, (req,res) => {

    var id = req.params.id;

    Carta.findByIdAndRemove(id, ( err , cartaBorrada ) => {

        if (err) return res.status(400).json({
            ok:false,
            mensaje: 'Error al borrar el usuario',
            errors: err
        });

        if (!cartaBorrada) return res.status(400).json({
            ok:false,
            mensaje: 'No existe una carta con ese ID',
            errors: { message: 'No existe una carta con ese ID' }
        });

        res.status(200).json({
            ok:true,
            carta: cartaBorrada
        }); 

    });

});

module.exports = app;