const modelo = require("../models/modelTeacher");

const express = require('express');
//constantes para la conexion
const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config.database);
const fs = require('fs')
const modelTeacher = new modelo(pool);

/*Obtiene todos los grupos del profesor*/
function getGroups(req, res) {

    const idTeacher = req.body.idTeacher;
    modelTeacher.getGroups(idTeacher, function (err, result) {
    const idTeacher = req.body.idTeacher;
    modelTeacher.getGroups(idTeacher, function (err, result) {
        if (err) {
            console.log(err.message);
        }

          res.send(result);
       });
     });
  }

/*Obtiene todas las categorias de los desafios*/
function getCategories(req, res) {
    modelTeacher.getCategories(function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Obtiene el desafio del profesor segun su grupo*/
function getChallenge(req, res) {
    const idChallenge = req.query.idChallenge;
    modelTeacher.getChallenge(idChallenge, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Obtiene los desafios del profesor segun su grupo*/
function getChallenges(req, res) {
    const group = req.query.idGroup;
    modelTeacher.getChallenges(group, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Crea desafio del profesor */
// function createChallenge(req, res) {
//     const idGroup = req.body.form.idGroup;
//     const title = req.body.form.title;
//     const description = req.body.form.description; 
//     const type = req.body.form.type;
//     const category = req.body.form.category;
//     const fechaFin = req.body.form.date;
//     const date = new Date(fechaFin);
//     modelTeacher.createChallenge(idGroup, title, description, date, type, category, function (err, result) {
//         if (err) {
//             console.log(err.message);
//         }
//         console.log(result.insertId);
//         res.status(200).send((result.insertId).toString());
//     });
// }

function createChallenge(req, res) {
    const idGroup = req.body.idGroup;
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    const category = req.body.category;
    const qualification = req.body.qualification;
    const fechaFin = req.body.endDate;
    const date = new Date(fechaFin);
    modelTeacher.createChallenge(idGroup, title, description, qualification, category, type, date, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        console.log(result.insertId);
        res.status(200).send((result.insertId).toString());
    });
}

/*Edita el desafio del profesor*/
function editChallenge(req, res) {
    const idChallenge = req.body.idChallenge;
    const idGroup = req.body.idGroup;
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    const category = req.body.category;
    const qualification = req.body.qualification;
    const fechaFin = req.body.endDate;
    const date = new Date(fechaFin);

    modelTeacher.editChallenge(idChallenge, idGroup, title, description, qualification, category, type, date, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
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


/*Obtiene los ficheros multimedia del desafio del profesor*/
function getMultimedia(req, res) {
    const idChallenge = req.query.idChallenge;
    modelTeacher.getMultimedia(idChallenge, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Envia los ficheros multimedia del desafio del profesor*/
function sendMultimedia(req, res) {
    const idTeacher = req.body.idTeacher;
    const idChallenge = req.body.idChallenge;
    const reqFiles = [];

    for (var i = 0; i < req.files.length; i++) {
        var str = req.files[i].mimetype;
        var type = str.split("/");
        //dir->idteacher/idChallenge/tipo/
        const dir = idTeacher + "/" + idChallenge + "/" + type[0] + "/";
        let path = "http://localhost:3001/multimedia/" + dir + req.files[i].filename;
        reqFiles.push([idChallenge, path])
    }

    console.log(reqFiles);

    modelTeacher.sendMultimedia(reqFiles, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Elimina el fichero multimedia del desafio*/
function deleteFile(req, res) {
    const idMultimedia = req.body.idMultimedia;
    const path = req.body.path;
    console.log("Eliminando file--------->", idMultimedia);
    var filePath = "public/" + path.replace('http://localhost:3001/', '');
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err)
            return
        }
    });
    modelTeacher.deleteFile(idMultimedia, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}


/*Elimina el fichero multimedia del desafio*/
function deleteChallenge(req, res) {
    const idChallenge = req.body.idChallenge;

    modelTeacher.deleteChallenge(idChallenge, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

//Busca estudiantes según el grupo dado.
function inviteStudentToGroup(request, response, next) {
    const grupo = request.body.grupo;
    const id = request.body.idEstudiante;
    modelTeacher.inviteStudentToGroup(grupo, id, function (err, res) {
        if (err) {
            if (err.message == "No se puede conectar a la base de datos.") {
                //next(err);
                console.log("No se puede conectar a la base de datos");
            }
            response.status(500);
            /*response.render("perfil", {
                error: err.message
            });*/
            console.log(err.message);
        }
        else if (res == null) {
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

//Echa a un estudiante de un grupo.
function kickStudentFromGroup(request, response, next) {
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


module.exports = {
    getGroups: getGroups,
    getChallenges: getChallenges,
    getChallenge: getChallenge,
    createChallenge: createChallenge,
    getCategories: getCategories,
    editChallenge: editChallenge,
    getMultimedia: getMultimedia,
    sendMultimedia: sendMultimedia,
    deleteFile: deleteFile,
    inviteStudentToGroup: inviteStudentToGroup,
    deleteChallenge: deleteChallenge,
    kickStudentFromGroup:kickStudentFromGroup,
};
