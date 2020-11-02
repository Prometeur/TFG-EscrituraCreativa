"use strict"

const config = require("../BBDD/config");
const modelo = require("../models/modelAdmin");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const pool = mysql.createPool(config.mysqlConfig);
const modelAdmin = new modelo(pool);

app.use(bodyParser.urlencoded({extended:true}));


function mostrarTodos(request, response, next){
    
    modelAdmin.getUsuarios(function(err, listaUsuarios) {
        if(err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                //next(err);
                console.log("No se puede conectar a la base de datos");
            }
            response.status(200);
            /*response.render("perfil", {
                error: err.message
            });*/
            console.log(err.message);
        } else if (listaUsuarios == null) {
            response.status(200);
            /*response.render("perfil", {
                error: "El usuario no existe."
            });*/
            console.log("No hay usuarios");
        } else {
            
            response.status(200);
            /*
            response.render("perfil", {
                error: null,
                usuarioPerfil: usuarioPerfil
            });
            */
           console.log(listaUsuarios)
           response.send(JSON.stringify(listaUsuarios));
        }
    });
}


function mostrarAdministradores(request, response, next){
    
    modelAdmin.getAdministradores(function(err, listaUsuarios) {
        if(err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                //next(err);
                console.log("No se puede conectar a la base de datos");
            }
            response.status(200);
            /*response.render("perfil", {
                error: err.message
            });*/
            console.log(err.message);
        } else if (listaUsuarios == null) {
            response.status(200);
            /*response.render("perfil", {
                error: "El usuario no existe."
            });*/
            console.log("No hay administradores.");
        } else {
            
            response.status(200);
            /*
            response.render("perfil", {
                error: null,
                usuarioPerfil: usuarioPerfil
            });
            */
           console.log(listaUsuarios)
           response.send(JSON.stringify(listaUsuarios));
        }
    });
}

function mostrarSolicitudes(request, response, next){//Busca a los profesores que aún no han sido aceptados por un ADMIN
    
    modelAdmin.getSolicitudes(function(err, listaUsuarios) {
        if(err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                //next(err);
                console.log("No se puede conectar a la base de datos");
            }
            response.status(200);
            /*response.render("perfil", {
                error: err.message
            });*/
            console.log(err.message);
        } else if (listaUsuarios == null) {
            response.status(200);
            /*response.render("perfil", {
                error: "El usuario no existe."
            });*/
            console.log("No hay nuevas silicitudes.");
        } else {
            
            response.status(200);
            /*
            response.render("perfil", {
                error: null,
                usuarioPerfil: usuarioPerfil
            });
            */
           console.log(listaUsuarios)
           response.send(JSON.stringify(listaUsuarios));
        }
    });
}



module.exports = {
    mostrarTodos:mostrarTodos,
    mostrarAdministradores:mostrarAdministradores,
    mostrarSolicitudes:mostrarSolicitudes
};