var express = require('express');

var app = express();
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middelwares/autenticacion');

var Usuaurio = require('../models/usuario');

// OPTENER USUARIOS

app.get('/', (red, res, next) => {

    Usuaurio.find({}, 'nombre email img role').exec(
        ( err, usuarios ) => {
 
        if (err) return res.status(500).json({
            ok:false,
            mensaje: 'Error cargando usuarios',
            errors: err
        });

        res.status(200).json({
            ok:true,
            mensaje: 'Usuaurios: ',
            usuarios: usuarios
        });
    }); 

});

// ACTUALIZAR USUARIO

app.put('/:id', mdAutenticacion.verificaToken,(req,res) => {

    var id = req.params.id;
    var body = req.body;

    Usuaurio.findById( id, ( err, usuario ) => {

        if (err) return res.status(500).json({
            ok:false,
            mensaje: 'Error al buscar usuario',
            errors: err
        });

        if (!usuario) return res.status(400).json({
            ok:false,
            mensaje: 'El usuario con el id '+id+' no existe',
            errors: { message: 'No existe un usuario con ese ID' }
        });

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save( ( err, usuarioGuardado ) => {

            if (err) return res.status(400).json({
                ok:false,
                mensaje: 'Error al actualizar usuario',
                errors: err
            });

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok:true,
                usuario: usuarioGuardado
            }); 
        });
    });
});

// CREAR USUARIO

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;
    var usuario = Usuaurio({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        img: body.img,
        role: body.role
    });

    usuario.save(( err, usuarioGuardado ) => {

        if (err) return res.status(400).json({
            ok:false,
            mensaje: 'Error al crear usuario',
            errors: err
        });

        res.status(201).json({
            ok:true,
            usuario: usuarioGuardado,
            usuarioToken: usuario
        });
    });
});


// BORRAR USUARIO POR ID

app.delete('/:id', mdAutenticacion.verificaToken, (req,res) => {

    var id = req.params.id;

    Usuaurio.findByIdAndRemove(id, ( err , usuarioBorrado ) => {

        if (err) return res.status(400).json({
            ok:false,
            mensaje: 'Error al borrar el usuario',
            errors: err
        });

        if (!usuarioBorrado) return res.status(400).json({
            ok:false,
            mensaje: 'No existe un usuario con ese ID',
            errors: { message: 'No existe un usuario con ese ID' }
        });

        res.status(200).json({
            ok:true,
            usuario: usuarioBorrado
        }); 

    });

});



module.exports = app;