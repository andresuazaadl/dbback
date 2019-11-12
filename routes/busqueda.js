var express = require('express');

var app = express();

var Carta =require('../models/carta');
var Usuario = require('../models/usuario');

app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([ 
        buscarCartasVariasColumnas( busqueda, regex ), 
        buscarUsuarios( busqueda, regex )])
    .then( respuestas => {
        res.status(200).json({
            ok:true,
            cartas: respuestas[0],
            usuarios: respuestas[1]
        });
    });
});


app.get('/cartas/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([buscarCartas( busqueda, regex )])
    .then( respuestas => {
        res.status(200).json({
            ok:true,
            cartas: respuestas[0],
        });
    });
});


function buscarCartas( busqueda, regex ){

    return new Promise((resolve, reject) => {
        Carta.find({ name: regex }, (err, cartas) => {

            if (err) {
                reject('Error al cargar Cartas', err);
            } else {
                resolve(cartas);
            }

        });
    });
}

function buscarCartasVariasColumnas( busqueda, regex ){

    return new Promise((resolve, reject) => {
        Carta.find({})
            .or([{ name: regex }, { code: regex }])
            .exec(( err, cartas ) => {
                if (err) {
                    reject('Error al cargar Cartas', err);
                } else {
                    resolve(cartas);
                }
            });
    });
}

function buscarUsuarios( busqueda, regex ){

    return new Promise((resolve, reject) => {
        Usuario.find({ nombre: regex }, 'nombre email', (err, usuarios) => {

            if (err) {
                reject('Error al cargar Usuarios', err);
            } else {
                resolve(usuarios);
            }

        });
    });
}

module.exports = app;