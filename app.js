//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Inicializar Variables
var app = express();

//Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var cartaRoutes = require('./routes/carta');
var deckRoutes = require('./routes/deck');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');


//Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/dragon-ball-db',  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/carta', cartaRoutes);
app.use('/deck', deckRoutes);
app.use('/login', loginRoutes);
app.use('/upload', uploadRoutes);
app.use('/busqueda', busquedaRoutes);

app.use('/', appRoutes);

//Escuchar peticiones
app.listen(3000, () => {
    console.log('express server puerto 3000: \x1b[32m%s\x1b[0','online');
});