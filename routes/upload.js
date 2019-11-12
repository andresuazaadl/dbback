var express = require('express');

var fileUpload = require('express-fileupload');

var app = express();

// default options
app.use(fileUpload());

app.put('/:id', (req, res, next) => {

    var id = req.params.id;

    if( !req.files ){
        return res.status(400).json({
            ok:false,
            mensaje: 'No selecciono archivos',
            errors: { message: 'Debe seleccionar una imagen' }
        });
    }

    //Optener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extencionArchivo = nombreCortado[ nombreCortado.length -1 ];

    //Solo estas extenciones afectamos 
    var extencionesValidas = ['png', 'jpg', 'gif', 'jpge'];
    
    if( extencionesValidas.indexOf( extencionArchivo ) < 0 ){
        return res.status(400).json({
            ok:false,
            mensaje: 'Extencion no valida',
            errors: { message: 'Las extenciones validas son '+extencionesValidas.join(', ') }
        });
    }

    //Nombre personalizado del archivo
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extencionArchivo}`;

    //Mover el archivo
    var path = `./uploads/usuarios/${ nombreArchivo }`;

    archivo.mv( path, err => {
        if(err) return res.status(500).json({
            ok:false,
            mensaje: 'Error al mover el archivo',
            errors: err
        });
    });

    res.status(200).json({
        ok:true,
        mensaje: 'Archivo movido',
        extencionArchivo: extencionArchivo
    })
});

function subirPorTipo( id, nombreArchivo, path, res ){


}


module.exports = app;