/*
* Name_file : app.js
* Descripcion: Parte central del servidor. Responde a peticiones y emplea los middlewares necesarios para tratar la información.
*/

/*-------------------------------------------CONSTANTS------------------------------------------------------------------------- */
/*constantes usadas */
const express = require("express");
const app = express();
const bodyParser = require ('body-parser');
const cors = require("cors");
<<<<<<< HEAD
=======
const path = require('path');
>>>>>>> luis

/*-------------------------------------------SETTING SERVER--------------------------------------------------------------------- */
//configuracion del servidor express
app.set('port',process.env.PORT || 3001);// defino el puerto

//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});

<<<<<<< HEAD
=======
//Es necesario indicar las rutas de las imagenes
app.use(express.static(path.join(__dirname,'../public')));

>>>>>>> luis
/*-------------------------------------------MIDDLEWARE-------------------------------------------------------------------------- */

//middleware funciones app cliente envia peticion al servidor
//app.use(express.urlencoded({extended:true}));
<<<<<<< HEAD
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
=======
// // app.use(express.json( ));
// app.use(express.json( {limit: '1000mb'}));

// /**Middleware que permite el uso compartido de recursos de un mismo origen u otro origen*/
app.use(cors());

// // /**Middleware para analizar cuerpos desde URL*/
// app.use(bodyParser.urlencoded({extended:true}));

// // /**middleware para analizar objetos json,Para usar la propiedad req.body en las peticiones */
// app.use(bodyParser.json());


// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());

>>>>>>> luis
/*--------------------------------------------ROUTES----------------------------------------------------------------------------- */

//Routes  url del servidor
app.use('/admin',require('./routers/routerAdmin'));
app.use('/teacher',require('./routers/routerTeacher'));
app.use('/student',require('./routers/routerStudent'));
app.use('/auth',require('./routers/routerAuth'));
<<<<<<< HEAD
app.use('/user',require('./routers/routerUser'));
=======
>>>>>>> luis
app.use(middlewareNotFoundError);
app.use(middlewareServerError);

/*--------------------------------------------------*/
// Functionality systems

/* Código 404: User error */
function middlewareNotFoundError(request, response) {
   
    response.status(404);
    /*
    response.render("404", {
            mensaje: "La pagina " + request.url + " no existe..."
    });
    */
   
}

/* Código 500: Internal server error */
function middlewareServerError(error, request, response, next) {

    response.status(500);
    console.log(error.message);
    console.log(error.stack);
    /*
    response.render("500", {
            mensaje: error.message,
            pila: error.stack
    });
    */
}






