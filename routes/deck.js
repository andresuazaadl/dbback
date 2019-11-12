var express = require('express');

var app = express();
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middelwares/autenticacion');

var Deck = require('../models/deck');

// OPTENER DECK

app.get('/', (red, res, next) => {

    Deck.find({}).populate('usuario', 'nombre').exec(
        ( err, decks ) => {
 
        if (err) return res.status(500).json({
            ok:false,
            mensaje: 'Error cargando decks',
            errors: err
        });

        res.status(200).json({
            ok:true,
            mensaje: 'Decks: ',
            decks: decks
        });
    }); 

});

// ACTUALIZAR DECK

app.put('/:id', mdAutenticacion.verificaToken,(req,res) => {

    var id = req.params.id;
    var body = req.body;

    Deck.findById( id, ( err, deck ) => {

        if (err) return res.status(500).json({
            ok:false,
            mensaje: 'Error al buscar deck',
            errors: err
        });

        if (!deck) return res.status(400).json({
            ok:false,
            mensaje: 'El deck con el id '+id+' no existe',
            errors: { message: 'No existe un deck con ese ID' }
        });

        deck.nombre = body.nombre;
        deck.deck = body.deck;
        deck.sideck = body.sideck;

        deck.save( ( err, deckGuardado ) => {

            if (err) return res.status(400).json({
                ok:false,
                mensaje: 'Error al actualizar deck',
                errors: err
            });

            res.status(200).json({
                ok:true,
                deck: deckGuardado
            }); 
        });
    });
});

// CREAR DECK

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;
    var deck = new Deck({
        nombre: body.nombre,
        deck: body.deck,
        sideck: body.sideck,
        usuario: req.usuario._id
    });

    deck.save(( err, deckGuardado ) => {

        if (err) return res.status(400).json({
            ok:false,
            mensaje: 'Error al crear deck',
            errors: err
        });

        res.status(201).json({
            ok:true,
            deck: deckGuardado
        });
    });
});


// BORRAR DECK POR ID

app.delete('/:id', mdAutenticacion.verificaToken, (req,res) => {

    var id = req.params.id;

    Deck.findByIdAndRemove(id, ( err , deckBorrado ) => {

        if (err) return res.status(400).json({
            ok:false,
            mensaje: 'Error al borrar el deck',
            errors: err
        });

        if (!deckBorrado) return res.status(400).json({
            ok:false,
            mensaje: 'No existe un deck con ese ID',
            errors: { message: 'No existe un deck con ese ID' }
        });

        res.status(200).json({
            ok:true,
            deck: deckBorrado
        }); 

    });

});



module.exports = app;