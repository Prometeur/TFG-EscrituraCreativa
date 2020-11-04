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
const model = require("../models/modelTeacher");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const pool = mysql.createPool(config.mysqlConfig);
const model_teacher = new model(pool);

app.use(bodyParser.urlencoded({extended:true}));

/*--------------------------------------------------*/
// Functionality systems

/** */
function createGroup(request, response) {
   
    let idProfesor = 1;
    // SUSTITUIR POR LA LINEA DE ABAJO CUANDO LAS SESIONES ESTEN DISPONIBLES AÑADIR CONTROL DE QUE SEA PROFESOR
    
    //let idProfesor: request.session.usuario.id; 
    let nombre = request.body.nombreGrupo; // REVISAR CLIENTE 

    model_teacher.createGruop(idProfesor,nombre, function(err, idGrupoNuevo) {
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

/**  */
function inviteGroup(request, response) {
    
    let idGrupo = request.body.idGrupo;
     //  AÑADIR CONTROL DE QUE SEA PROFESOR
    let idEstudiante = request.body.idEstudiante; 
    // REVISAR CLIENTE 

    model_teacher.verifyInvitationGroup(idGrupo,idEstudiante, function(err, rel) {
            if (err) 
            {
                response.status(500);
                /*response.render("preguntas", {
                    error: err.message
                });*/
            } 
            else 
            {
                if(rel != undefined)
                {   
                    //Ya estaba el estudiante en el grupo
                    response.status(500);
                    //MOSTRAR QUE EL ESTUDIANTE YA ESTABA EN EL GRUPO
                }
                else
                {   
                    //Invitación nueva, metemos al estudiante en el grupo
                    model_teacher.inviteGroup(idGrupo,idEstudiante, function(err) {
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

/** */
function deleteGruop(request, response) {
    
    let id = request.params.id;

    model_teacher.deleteGroup(id, function(err) {
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
    inviteGroup:inviteGroup,
    deleteGroup:deleteGroup
};