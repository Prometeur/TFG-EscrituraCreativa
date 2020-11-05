/*
* Name_file : controllerTeacher
* Descripcion: Contiene la funcionalidad de negocio de todas las funciones que son exclusivas a los profesores.
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
const modelo = require("../models/modelTeacher");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const pool = mysql.createPool(config.mysqlConfig);
const modelTeacher = new modelo(pool);

app.use(bodyParser.urlencoded({extended:true}));

/*--------------------------------------------------*/
// Functionality systems

//Crea un grupo con los datos introducidos en el formulario y el profesor de la sesión como vreador.
function createGroup(request, response) {
    let idProfesor = 1; // SUSTITUIR POR LA LINEA DE ABAJO CUANDO LAS SESIONES ESTEN DISPONIBLES AÑADIR CONTROL DE QUE SEA PROFESOR
    //let idProfesor: request.session.usuario.id; 
    let nombre = request.body.nombreGrupo; // REVISAR CLIENTE 


    modelTeacher.createGroup(idProfesor,nombre, function(err, idGrupoNuevo) {
                if (err) 
                {
                    response.status(500);
                    /*response.render("preguntas", {
                        error: err.message
                    });*/
                } 
                else 
                {
                    response.status(200);
                    //response.redirect("/pregunta/preguntas");
                    //REDIRECCIONAR A LA VENTANA DEL GRUPO RECIEN CREADO
                }
            });

}

//Añade a un estudiante a un grupo si no lo estaba ya.
function inviteToGroup(request, response) {
    let idGrupo = request.body.idGrupo; //  AÑADIR CONTROL DE QUE SEA PROFESOR
    let idEstudiante = request.body.idEstudiante; // REVISAR CLIENTE 


    modelTeacher.verifyInvitationToGroup(idGrupo,idEstudiante, function(err, rel) {
                if (err) 
                {
                    response.status(500);
                    /*response.render("preguntas", {
                        error: err.message
                    });*/
                } 
                else 
                {
                    if(rel != undefined) //Ya estaba el estudiante en el grupo
                    {
                        response.status(500);
                        //MOSTRAR QUE EL ESTUDIANTE YA ESTABA EN EL GRUPO
                    }
                    else //Invitación nueva, metemos al estudiante en el grupo
                    {
                        modelTeacher.inviteToGroup(idGrupo,idEstudiante, function(err) {
                            if (err) 
                            {
                                response.status(500);
                                /*response.render("preguntas", {
                                    error: err.message
                                });*/
                            } 
                            else 
                            {
                                response.status(200);
                                //response.redirect("/pregunta/preguntas");
                                //MOSTRAT QUE SE HA AÑADIDO AL ESTUDIANTE DE FORMA SATISFACTORIA
                            }
                        });
                    }
                    response.status(500);
                    //response.redirect("/pregunta/preguntas");
                    //REDIRECCIONAR A LA VENTANA DEL GRUPO RECIEN CREADO
                }
            });

}

//Elimina un grupo (coloca el activo a 0)
function deleteGroup(request, response) {
    let id = request.params.id;

    modelTeacher.deleteGroup(id, function(err) {
                if (err) 
                {
                    response.status(500);
                    /*response.render("preguntas", {
                        error: err.message
                    });*/
                } 
                else 
                {
                    response.status(200);
                    //response.redirect("/pregunta/preguntas");
                    //MOSTRAR MENSAJE DE GRUPO BORRADO
                }
            });

}



/*---------------------------------------------------------*/
//Data export
module.exports = {
    createGroup:createGroup,
    inviteToGroup:inviteToGroup,
    deleteGroup:deleteGroup
};