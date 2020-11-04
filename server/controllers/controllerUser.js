/*
* Name_file : 
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
"use strict"
const config = require("../BBDD/config");
const model = require("../models/modelUsuarios");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const pool = mysql.createPool(config.mysqlConfig);
const modelUsuario = new model(pool);

app.use(bodyParser.urlencoded({extended:true}));

/*--------------------------------------------------*/
// Functionality systems

function grupo(request, response, next){
    
    let grupo = request.params.id;

    console.log("He entrado en el controlador")
    
    if (grupo != null) 
    {
        
        modelUsuario.getUsuariosByGrupo(grupo, function(err, listaUsuarios) {
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

function equipo(request, response, next) {
    
    let grupo = request.params.id;

    console.log("He entrado en el controlador")
    
    if (grupo != null) 
    {
        modelUsuario.getEstudiantesByEquipo(grupo, function(err, listaUsuarios) {
           
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

function mostrarTodos(request, response, next) 
{
    
    modelUsuario.getUsuarios(function(err, listaUsuarios) {
            
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

function mostrarEstudiantes(request, response, next) {
    
    modelUsuario.getEstudiantes(function(err, listaUsuarios) {
        
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

function mostrarProfesores(request, response, next) {
    
    modelUsuario.getProfesores(function(err, listaUsuarios) {
        
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

function mostrarAdministradores(request, response, next){
    
    modelUsuario.getAdministradores(function(err, listaUsuarios) {
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
    
    modelUsuario.getSolicitudes(function(err, listaUsuarios) {
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
    grupo:grupo,
    equipo:equipo,
    mostrarTodos:mostrarTodos,
    mostrarEstudiantes:mostrarEstudiantes,
    mostrarProfesores:mostrarProfesores,
    mostrarAdministradores:mostrarAdministradores,
    mostrarSolicitudes:mostrarSolicitudes
};