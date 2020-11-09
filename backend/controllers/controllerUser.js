/*
* Name_file : controllerUser
* Descripcion: Contiene la funcionalidad de negocio de todas las funciones que comparten todos los usuarios.
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
const modelo = require("../models/modelUser");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const pool = mysql.createPool(config.mysqlConfig);
const modelUsuario = new modelo(pool);

app.use(bodyParser.urlencoded({extended:true}));

/*--------------------------------------------------*/
// Functionality systems

//Busca a todos los estudiantes que pertenecen a un grupo determinado por el ID.
function group(request, response, next){
    let grupo = request.params.id;

    console.log("He entrado en el controlador")
    
    if (grupo != null) {
        modelUsuario.getUsersByGroup(grupo, function(err, listaUsuarios) {
            if(err) 
            {
                if (err.message == "No se puede conectar a la base de datos.") 
                {
                    //next(err);
                    console.log("No se puede conectar a la base de datos");
                }
                response.status(200);
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
                console.log("El grupo es nulo");
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
               console.log("ESTOY EN EL BUEN CAMINO")
               response.send(JSON.stringify(listaUsuarios));
            }
        });
    }
    else 
    {
        response.status(200);
        console.log("El id es nulo");
    }
}

// Busca todos los estudiantes pertenecientes a un equipo mediante el ID del mismo.
function team(request, response, next){
    let grupo = request.params.id;

    console.log("He entrado en el controlador")
    
    if (grupo != null) 
    {
        modelUsuario.getStudentsByTeam(grupo, function(err, listaUsuarios) {
            if(err) 
            {
                if (err.message == "No se puede conectar a la base de datos.") {
                    //next(err);
                    console.log("No se puede conectar a la base de datos");
                }
                response.status(200);
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
                console.log("El grupo es nulo");
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
    else 
    {
        response.status(200);
        console.log("El id es nulo");
    }
}

//Mustra todos los estudiantes activos que existen.
function showStudents(request, response, next){
    
    modelUsuario.getStudents(function(err, listaUsuarios) {
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
            console.log("No hay estudiantes.");
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
//Muestra a todos los profesores.
function showTeachers(request, response, next){
    
    modelUsuario.getProfesores(function(err, listaUsuarios) {
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
            console.log("No hay profesores.");
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
    group:group,
    team:team,
    showStudents:showStudents,
    showTeachers:showTeachers
};