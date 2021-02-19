const modelo = require("../models/modelTeacher");
const express = require('express');//voy a usar el modulo express
const router = express.Router();

//importar la conexion
//const pool = require('../db/database');

//constantes para la conexion
const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config.database);
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const modelTeacher = new modelo(pool);


/*Obtiene todos los desafios del grupo seleccionado del profesor*/
function getChallenges(req, res) {
    const group = req.query.idGroup;
    modelTeacher.getChallenges(group, function (err, result) {
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                //next(err);
                console.log("No se puede conectar a la base de datos");
            }
            res.status(500);
            /*response.render("perfil", {
                error: err.message
            });*/
            console.log(err.message);
        }
        else if (res == null) {
            res.status(200);
            /*response.render("perfil", {
                error: "El usuario no existe."
            });*/
            console.log("No hay desafios para este grupo");
        }
        else {
            res.status(200);
            /*
            response.render("perfil", {
                error: null,
                usuarioPerfil: usuarioPerfil
            });
            */
            res.send(JSON.stringify(result)); //En el futuro es posible que esta función sea más elaborada si queremos mostrar los nombres del escritor.
        }
    });
}

/*Inserta un desafio del profesor en la tabla desafio*/
function createChallenge(req, res) {
    // const title = req.body.title;
    // const description = req.body.description;
    // const group =req.body.idGroup;
    // modelTeacher.createChallenge(title,description,group, function (err, result) {
    //     res.send(result);
    // });

    //let fechaIni = request.body.fechaIni; // REVISAR CLIENTE 
    // //let fechaFin = request.body.fechaFin;
    // //let imagen = request.body.imagen;
    // let tipoCalificacion = 5; // Se puede cambiar a string si cambiamos la BBDD
    // if (req.body.tipoCalificacion == 1) {
    //     tipoCalificacion = 1;
    // }
    // if (req.body.tipoCalificacion == 2) {
    //     tipoCalificacion = 2;
    // }
    // let colaborativo = 0;
    // if (req.body.colaborativo == 1) {
    //     colaborativo = 1;
    // }

    const title = req.body.title;
    const description = req.body.description;
    const group = req.body.idGroup;

    modelTeacher.createChallenge(title, description, group, function (err, result) {
        //modelTeacher.createChallenge(idGrupo, description, titulo, null, tipoCalificacion, 0, function (err, result) {
        if (err) {
            res.status(500);
            /*response.render("profesor", {
                error: err.message
            });*/
        }

        else {
            res.status(200);
            //response.redirect("/pregunta/preguntas");
            //MOSTRAR QUE SE HA CREADO EL DESAFIO
            console.log(result)
            res.send(JSON.stringify(result));
        }
    });
}

//Invita a un estudiante a un grupo.
function inviteStudentToGroup(request, response, next){
    let grupo = request.body.grupo;
    let id = request.body.idEstudiante;

    modelTeacher.inviteStudentToGroup(grupo, id, function(err, res) {
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
        else if (res == null) 
        {
            response.status(200);
            /*response.render("perfil", {
                error: "No hay estudiantes con los parámetros escogidos."
            });*/
            console.log("No se ha podido invitar el estudiante al grupo.");
        } 
        else 
        {
            response.status(200);
           response.send(JSON.stringify(res));
        }
    });

}

//Echa a un estudiante de un grupo.
function kickStudentFromGroup(request, response, next){
    let grupo = request.body.grupo;
    let id = request.body.idEstudiante;

    modelTeacher.kickStudentFromGroup(grupo, id, function(err, res) {
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
        else if (res == null) 
        {
            response.status(200);
            /*response.render("perfil", {
                error: "No hay estudiantes con los parámetros escogidos."
            });*/
            console.log("No se ha podido expulsar el estudiante del grupo.");
        } 
        else 
        {
            response.status(200);
           response.send(JSON.stringify(res));
        }
    });

}

//Crea un grupo nuevo.
function createGroup(request, response, next){
    let nombre = request.body.nombre;
    let idTeacher = request.body.idTeacher;

    modelTeacher.createGroup(nombre, idTeacher, function(err, res) {
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
        else if (res == null) 
        {
            response.status(200);
            /*response.render("perfil", {
                error: "No hay estudiantes con los parámetros escogidos."
            });*/
            console.log("No se ha podido expulsar el estudiante del grupo.");
        } 
        else 
        {
            response.status(200);
           response.send(JSON.stringify(res));
        }
    });

}


module.exports = {
    //getGroups:getGroups,
    getChallenges: getChallenges,
    createChallenge: createChallenge,
    inviteStudentToGroup:inviteStudentToGroup,
    kickStudentFromGroup: kickStudentFromGroup,
    createGroup: createGroup
};



// //Crea un grupo con los datos introducidos en el formulario y el profesor de la sesión como vreador.
// function createGroup(request, response) {
//     let idProfesor = 1; // SUSTITUIR POR LA LINEA DE ABAJO CUANDO LAS SESIONES ESTEN DISPONIBLES AÑADIR CONTROL DE QUE SEA PROFESOR
//     //let idProfesor: request.session.usuario.id; 
//     let nombre = request.body.nombreGrupo; // REVISAR CLIENTE 


//     modelTeacher.createGroup(idProfesor,nombre, function(err, idGrupoNuevo) {
//                 if (err) 
//                 {
//                     response.status(500);
//                     /*response.render("preguntas", {
//                         error: err.message
//                     });*/
//                 } 
//                 else 
//                 {
//                     response.status(200);
//                     //response.redirect("/pregunta/preguntas");
//                     //REDIRECCIONAR A LA VENTANA DEL GRUPO RECIEN CREADO
//                 }
//             });

// }

// //Añade a un estudiante a un grupo si no lo estaba ya.
// function inviteToGroup(request, response) {
//     let idGrupo = request.body.idGrupo; //  AÑADIR CONTROL DE QUE SEA PROFESOR
//     let idEstudiante = request.body.idEstudiante; // REVISAR CLIENTE 


//     modelTeacher.verifyInvitationToGroup(idGrupo,idEstudiante, function(err, rel) {
//                 if (err) 
//                 {
//                     response.status(500);
//                     /*response.render("preguntas", {
//                         error: err.message
//                     });*/
//                 } 
//                 else 
//                 {
//                     if(rel != undefined) //Ya estaba el estudiante en el grupo
//                     {
//                         response.status(500);
//                         //MOSTRAR QUE EL ESTUDIANTE YA ESTABA EN EL GRUPO
//                     }
//                     else //Invitación nueva, metemos al estudiante en el grupo
//                     {
//                         modelTeacher.inviteToGroup(idGrupo,idEstudiante, function(err) {
//                             if (err) 
//                             {
//                                 response.status(500);
//                                 /*response.render("preguntas", {
//                                     error: err.message
//                                 });*/
//                             } 
//                             else 
//                             {
//                                 response.status(200);
//                                 //response.redirect("/pregunta/preguntas");
//                                 //MOSTRAT QUE SE HA AÑADIDO AL ESTUDIANTE DE FORMA SATISFACTORIA
//                             }
//                         });
//                     }
//                     response.status(500);
//                     //response.redirect("/pregunta/preguntas");
//                     //REDIRECCIONAR A LA VENTANA DEL GRUPO RECIEN CREADO
//                 }
//             });

// }

// //Elimina un grupo (coloca el activo a 0)
// function deleteGroup(request, response) {
//     let id = request.params.id;

//     modelTeacher.deleteGroup(id, function(err) {
//                 if (err) 
//                 {
//                     response.status(500);
//                     /*response.render("preguntas", {
//                         error: err.message
//                     });*/
//                 } 
//                 else 
//                 {
//                     response.status(200);
//                     //response.redirect("/pregunta/preguntas");
//                     //MOSTRAR MENSAJE DE GRUPO BORRADO
//                 }
//             });

// }

// //Verifica si el estudiatne está en el grupo indicado y si lo está lo saca de él.
// function kickFromGroup(request, response) {
//     let idGrupo = request.body.idGrupo; //  AÑADIR CONTROL DE QUE SEA PROFESOR
//     let idEstudiante = request.body.idEstudiante; // REVISAR CLIENTE 


//     modelTeacher.verifyInvitationToGroup(idGrupo,idEstudiante, function(err, rel) {
//                 if (err) 
//                 {
//                     response.status(500);
//                     /*response.render("preguntas", {
//                         error: err.message
//                     });*/
//                 } 
//                 else 
//                 {
//                     if(rel != undefined) //El estudiante está en el grupo
//                     {

//                         modelTeacher.kickFromGroup(idGrupo,idEstudiante, function(err) {
//                             if (err) 
//                             {
//                                 response.status(500);
//                                 /*response.render("preguntas", {
//                                     error: err.message
//                                 });*/
//                             } 
//                             else 
//                             {
//                                 response.status(200);
//                                 //response.redirect("/pregunta/preguntas");
//                                 //MOSTRAT QUE SE HA AÑADIDO AL ESTUDIANTE DE FORMA SATISFACTORIA
//                             }
//                         });
//                     }
//                     else //El estudiante no está en el gruo en primer lugar, o el grupo o estudiante no existen
//                     {
//                         response.status(500);
//                         //MOSTRAR ERROR, EL ESTUDIANTE NO ESTAABA EN EL GRUPO O NO EXISTIAN EN PRIMER LUGAR
//                     }
//                     response.status(500);
//                     //response.redirect("/pregunta/preguntas");
//                     //REDIRECCIONAR A LA VENTANA DEL GRUPO RECIEN CREADO
//                 }
//             });

// }


// //Mustra todas las solicitudes de estudiantes a admitir. (Campo activo a 0)
// function showStudentRequests(request, response, next){

//     modelTeacher.getStudentRequests(function(err, listaUsuarios) {
//         if(err)
//         {
//             if (err.message == "No se puede conectar a la base de datos.") 
//             {
//                 //next(err);
//                 console.log("No se puede conectar a la base de datos");
//             }
//             response.status(500);
//             /*response.render("perfil", {
//                 error: err.message
//             });*/
//             console.log(err.message);
//         } 
//         else if (listaUsuarios == null) 
//         {
//             response.status(200);
//             /*response.render("perfil", {
//                 error: "El usuario no existe."
//             });*/
//             console.log("No hay solicitudes de estudiantes.");
//         } 
//         else 
//         { 
//             response.status(200);
//             /*
//             response.render("perfil", {
//                 error: null,
//                 usuarioPerfil: usuarioPerfil
//             });
//             */
//            console.log(listaUsuarios)
//            response.send(JSON.stringify(listaUsuarios));
//         }
//     });
// }

// //Acepta la solicitud de un estudiante para que pueda usar la plataforma
// function acceptStudent(request, response) {
//     let id = request.params.id;

//     modelTeacher.acceptStudent(id, function(err) {
//                 if (err) 
//                 {
//                     response.status(500);
//                     /*response.render("preguntas", {
//                         error: err.message
//                     });*/
//                 } 
//                 else 
//                 {
//                     response.status(200);
//                     //response.redirect("/pregunta/preguntas");
//                     //MOSTRAR PERFIL DEL NUEVO ESTUDIANTE (?)
//                 }
//             });

// }

// //Muestra los desafíos que pertenecen al grupo indicado. 
// function showChallengesOfGroup(request, response, next){
//     let id = request.params.id;

//     modelTeacher.getChallengesOfGroup(id, function(err, challengeList) {
//         if(err)
//         {
//             if (err.message == "No se puede conectar a la base de datos.") 
//             {
//                 //next(err);
//                 console.log("No se puede conectar a la base de datos");
//             }
//             response.status(500);
//             /*response.render("perfil", {
//                 error: err.message
//             });*/
//             console.log(err.message);
//         } 
//         else if (challengeList == null) 
//         {
//             response.status(200);
//             /*response.render("perfil", {
//                 error: "El usuario no existe."
//             });*/
//             console.log("No hay desafíos de este grupo.");
//         } 
//         else 
//         { 
//             response.status(200);
//             /*
//             response.render("perfil", {
//                 error: null,
//                 usuarioPerfil: usuarioPerfil
//             });
//             */
//            console.log(challengeList)
//            response.send(JSON.stringify(challengeList));
//         }
//     });
// }


// //Muestra los desafíos que pertenecen al grupo indicado. 
// function showPapersOfChallenge(request, response, next){
//     let id = request.params.id;

//     modelTeacher.getPapersOfChallenge(id, function(err, paperList) {
//         if(err)
//         {
//             if (err.message == "No se puede conectar a la base de datos.") 
//             {
//                 //next(err);
//                 console.log("No se puede conectar a la base de datos");
//             }
//             response.status(500);
//             /*response.render("perfil", {
//                 error: err.message
//             });*/
//             console.log(err.message);
//         } 
//         else if (paperList == null) 
//         {
//             response.status(200);
//             /*response.render("perfil", {
//                 error: "El usuario no existe."
//             });*/
//             console.log("No hay escritos para este desafío.");
//         } 
//         else 
//         { 
//             response.status(200);
//             /*
//             response.render("perfil", {
//                 error: null,
//                 usuarioPerfil: usuarioPerfil
//             });
//             */
//            console.log(paperList)
//            response.send(JSON.stringify(paperList)); //En el futuro es posible que esta función sea más elaborada si queremos mostrar los nombres del escritor.
//         }
//     });
// }

// //Crea un desafío nuevo.
// function createChallengue(request, response) {
//     let idGrupo = request.body.idGrupo; //  AÑADIR CONTROL DE QUE SEA PROFESOR
//     let fechaIni = request.body.fechaIni; // REVISAR CLIENTE 
//     let fechaFin = request.body.fechaFin; 
//     let descripcion = request.body.descripcion;
//     let titulo = request.body.titulo;
//     let imagen = request.body.imagen;

//     let tipoCalificacion = 0; // Se puede cambiar a string si cambiamos la BBDD
//     if(request.body.tipoCalificacion == 1){
//         tipoCalificacion = 1;
//     }
//     if(request.body.tipoCalificacion == 2){
//         tipoCalificacion = 2;
//     }
//     let colaborativo = 0;
//     if(request.body.colaborativo == 1){
//         colaborativo = 1;
//     }


//     modelTeacher.createChallenge(idGrupo, fechaIni, fechaFin, descripcion, titulo, imagen,tipoCalificacion, colaborativo, function(err, rel) {
//                 if (err) 
//                 {
//                     response.status(500);
//                     /*response.render("profesor", {
//                         error: err.message
//                     });*/
//                 } 
//                 else 
//                 {
//                     response.status(200);
//                     //response.redirect("/pregunta/preguntas");
//                     //MOSTRAR QUE SE HA CREADO EL DESAFIO
//                 }

//             });

// }



// /*---------------------------------------------------------*/
// //Data export
// module.exports = {
//     createGroup:createGroup,
//     inviteToGroup:inviteToGroup,
//     deleteGroup:deleteGroup,
//     kickFromGroup:kickFromGroup,
//     showStudentRequests:showStudentRequests,
//     acceptStudent:acceptStudent,
//     showChallengesOfGroup:showChallengesOfGroup,
//     showPapersOfChallenge:showPapersOfChallenge,
//     createChallengue:createChallengue
// };