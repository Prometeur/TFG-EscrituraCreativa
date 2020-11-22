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

/*-------------------------------------------SETTING SERVER--------------------------------------------------------------------- */
//configuracion del servidor express
app.set('port',process.env.PORT || 3001);// defino el puerto

//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});

/*-------------------------------------------MIDDLEWARE-------------------------------------------------------------------------- */

//middleware funciones app cliente envia peticion al servidor
//app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

/*--------------------------------------------ROUTES----------------------------------------------------------------------------- */

//Routes  url del servidor

app.use('/login',require('./routers/routerLogin'));
app.use('/admin',require('./routers/routerAdmin'));
app.use('/teacher',require('./routers/routerTeacher'));
app.use('/student',require('./routers/routerStudent'));
app.use('/user',require('./routers/routerUser'));







