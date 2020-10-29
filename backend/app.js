"use strict";



const routerUsuario = require("./routers/routerUsuario");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

// Rutas para usar los router
app.use("/usuario", routerUsuario);


app.use(middlewareNotFoundError);
app.use(middlewareServerError);

function middlewareNotFoundError(request, response) {
    // Código 404: User error
    response.status(404);
/*
    response.render("404", {
            mensaje: "La pagina " + request.url + " no existe..."
    });
*/
}

function middlewareServerError(error, request, response, next) {
    // Código 500: Internal server error
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


app.listen(4000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: "
        + err.message);
    } else {
        console.log("Servidor arrancado en el puerto 4000");
    }
});