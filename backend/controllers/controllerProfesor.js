"use strict"

const config = require("../BBDD/config");
const modelo = require("../models/modelProfesor");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const pool = mysql.createPool(config.mysqlConfig);
const modelProfesor = new modelo(pool);

app.use(bodyParser.urlencoded({extended:true}));

function crearGrupo(request, response) {
    let idProfesor = 1; // SUSTITUIR POR LA LINEA DE ABAJO CUANDO LAS SESIONES ESTEN DISPONIBLES AÑADIR CONTROL DE QUE SEA PROFESOR
    //let idProfesor: request.session.usuario.id; 
    let nombre = request.body.nombreGrupo; // REVISAR CLIENTE 


    modelProfesor.crearGrupo(idProfesor,nombre, function(err, idGrupoNuevo) {
                if (err) {
                    response.status(500);
                    /*response.render("preguntas", {
                        error: err.message
                    });*/
                } else {
                    response.status(200);
                    //response.redirect("/pregunta/preguntas");
                    //REDIRECCIONAR A LA VENTANA DEL GRUPO RECIEN CREADO
                }
            });

}

function invitarAGrupo(request, response) {
    let idGrupo = request.body.idGrupo; //  AÑADIR CONTROL DE QUE SEA PROFESOR
    let idEstudiante = request.body.idEstudiante; // REVISAR CLIENTE 


    modelProfesor.verificarInvitacion(idGrupo,idEstudiante, function(err, rel) {
                if (err) {
                    response.status(500);
                    /*response.render("preguntas", {
                        error: err.message
                    });*/
                } else {
                    if(rel != undefined){//Ya estaba el estudiante en el grupo
                        response.status(500);
                        //MOSTRAR QUE EL ESTUDIANTE YA ESTABA EN EL GRUPO
                    }
                    else{//Invitación nueva, metemos al estudiante en el grupo
                        modelProfesor.invitarAGrupo(idGrupo,idEstudiante, function(err) {
                            if (err) {
                                response.status(500);
                                /*response.render("preguntas", {
                                    error: err.message
                                });*/
                            } else {
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

function eliminarGrupo(request, response) {
    let id = request.params.id;


    modelProfesor.eliminarGrupo(id, function(err) {
                if (err) {
                    response.status(500);
                    /*response.render("preguntas", {
                        error: err.message
                    });*/
                } else {
                    response.status(200);
                    //response.redirect("/pregunta/preguntas");
                    //MOSTRAR MENSAJE DE GRUPO BORRADO
                }
            });

}



module.exports = {
    crearGrupo:crearGrupo,
    invitarAGrupo:invitarAGrupo,
    eliminarGrupo:eliminarGrupo
};