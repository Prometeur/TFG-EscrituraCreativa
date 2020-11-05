/*
* Name_file : controllerAdmin
* Descripcion: Contiene la funcionalidad de negocio de todas las funciones exclusivas para los administradores.
* parameters:
    @mysql
    @express
    @path
    @bodyParser
    @modelo
    @app
    @config
*/

/*--------------------------------------------------*/
// Dependencies
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

/*--------------------------------------------------*/
// Functionality systems

//Muestra a todos los usuarios activos en la base de datos. Nomuestra aquellos cuya aprobación está pendiente.
function showAll(request, response, next){
    
    modelAdmin.getUsers(function(err, listaUsuarios) {
        if(err) 
        {
            if (err.message == "No se puede conectar a la base de datos.") 
            {
                //next(err);
                console.log("No se puede conectar a la base de datos");
            }
            response.status(500);
            /*response.render("perfil", {
                error: err.message
            });*/
            console.log(err.message);
        }
         else if (listaUsuarios == null) 
         {
            response.status(200);
            /*response.render("perfil", {
                error: "El usuario no existe."
            });*/
            console.log("No hay usuarios");
        } 
        else 
        {
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

//Muestra a todos los administradores.
function showAdmins(request, response, next){
    
    modelAdmin.getAdmins(function(err, listaUsuarios) {
        if(err) 
        {
            if (err.message == "No se puede conectar a la base de datos.")
            {
                //next(err);
                console.log("No se puede conectar a la base de datos");
            }
            response.status(500);
            /*response.render("perfil", {
                error: err.message
            });*/
            console.log(err.message);
        } 
        else if (listaUsuarios == null) 
        {
            response.status(200);
            /*response.render("perfil", {
                error: "El usuario no existe."
            });*/
            console.log("No hay administradores.");
        } 
        else 
        {
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

//Muestra los PROFESORES que aún no han sido aprobados por un administrador.
function showRequests(request, response, next){
    
    modelAdmin.getRequests(function(err, listaUsuarios) {
        if(err)
        {
            if (err.message == "No se puede conectar a la base de datos.") 
            {
                //next(err);
                console.log("No se puede conectar a la base de datos");
            }
            response.status(500);
            /*response.render("perfil", {
                error: err.message
            });*/
            console.log(err.message);
        } 
        else if (listaUsuarios == null) 
        {
            response.status(200);
            /*response.render("perfil", {
                error: "El usuario no existe."
            });*/
            console.log("No hay nuevas silicitudes.");
        } 
        else 
        {
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


/*---------------------------------------------------------*/
//Data export

module.exports = {
    showAll:showAll,
    showAdmins:showAdmins,
    showRequests:showRequests
};