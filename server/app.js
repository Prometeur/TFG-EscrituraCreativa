/*
* Name_file : app.js
* Descripcion:
* parameters:
    @routerUSer
    @express
    @path
    @bodyParser
    @cors
    @app
*/

/*--------------------------------------------------*/
// Dependencies
"use strict";
const routerAuth = require("./routers/routerAuth");
const routerUser = require("./routers/routerUser");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", routerAuth);
app.use("/user", routerUser);
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

/*  */
app.listen(3001, function(err) {
   if (err) {
       console.error("No se pudo inicializar el servidor: "
        + err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3001");
    }
 });

//var http = require('http');
//module.exports = app;y
//var server = http.createServer(app);
//server.listen(3001);