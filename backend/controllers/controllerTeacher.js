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

//Verifica si el estudiatne está en el grupo indicado y si lo está lo saca de él.
function kickFromGroup(request, response) {
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
                    if(rel != undefined) //El estudiante está en el grupo
                    {

                        modelTeacher.kickFromGroup(idGrupo,idEstudiante, function(err) {
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
                    else //El estudiante no está en el gruo en primer lugar, o el grupo o estudiante no existen
                    {
                        response.status(500);
                        //MOSTRAR ERROR, EL ESTUDIANTE NO ESTAABA EN EL GRUPO O NO EXISTIAN EN PRIMER LUGAR
                    }
                    response.status(500);
                    //response.redirect("/pregunta/preguntas");
                    //REDIRECCIONAR A LA VENTANA DEL GRUPO RECIEN CREADO
                }
            });

}


//Mustra todas las solicitudes de estudiantes a admitir. (Campo activo a 0)
function showStudentRequests(request, response, next){
    
    modelTeacher.getStudentRequests(function(err, listaUsuarios) {
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
            console.log("No hay solicitudes de estudiantes.");
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

//Acepta la solicitud de un estudiante para que pueda usar la plataforma
function acceptStudent(request, response) {
    let id = request.params.id;

    modelTeacher.acceptStudent(id, function(err) {
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
                    //MOSTRAR PERFIL DEL NUEVO ESTUDIANTE (?)
                }
            });

}

//Muestra los desafíos que pertenecen al grupo indicado. 
function showChallengesOfGroup(request, response, next){
    let id = request.params.id;
    
    modelTeacher.getChallengesOfTeacher(id, function(err, challengeList) {
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
        else if (challengeList == null) 
        {
            response.status(200);
            /*response.render("perfil", {
                error: "El usuario no existe."
            });*/
            console.log("No hay desafíos de este grupo.");
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
           console.log(challengeList)
           response.send(JSON.stringify(challengeList));
        }
    });
}


//Muestra los desafíos que pertenecen al grupo indicado. 
function showPapersOfChallenge(request, response, next){
    let id = request.params.id;
    
    modelTeacher.getPapersOfChallenge(id, function(err, paperList) {
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
        else if (paperList == null) 
        {
            response.status(200);
            /*response.render("perfil", {
                error: "El usuario no existe."
            });*/
            console.log("No hay escritos para este desafío.");
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
           console.log(paperList)
           response.send(JSON.stringify(paperList));
        }
    });
}


/*---------------------------------------------------------*/
//Data export
module.exports = {
    createGroup:createGroup,
    inviteToGroup:inviteToGroup,
    deleteGroup:deleteGroup,
    kickFromGroup:kickFromGroup,
    showStudentRequests:showStudentRequests,
    acceptStudent:acceptStudent,
    showChallengesOfGroup:showChallengesOfGroup,
    showPapersOfChallenge:showPapersOfChallenge
};