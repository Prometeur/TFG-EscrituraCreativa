const modelo = require("../models/modelStudent");
const fs = require('fs')
//importar la conexion
const mysql = require("mysql");
const config = require('../db/config');
const pool = mysql.createPool(config.database);
const modelStudent = new modelo(pool);


/*Obtiene los grupos del estudiante*/
function getGroups(req, res) {
    const student = req.body.idStudent;
    modelStudent.getGroups(student, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(JSON.stringify(result));
    });
}

/*Obtiene el equipo del estudiante*/
function getTeam(req, res) {
    const idStudent = req.query.idStudent;
    modelStudent.getTeam(idStudent, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Obtiene el desafio del estudiante segun su grupo*/
function getChallenge(req, res) {
    const idChallenge = req.query.idChallenge;
    modelStudent.getChallenge(idChallenge, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Obtiene los desafios del estudiante segun su grupo*/
function getChallenges(req, res) {
    const idGroup = req.query.idGroup;
    modelStudent.getChallenges(idGroup, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Envio el escrito del estudiante */
function sendWriting(req, res) {
    const idGroup = req.body.idGroup;
    const desafio = req.body.idChallenge;
    const idWriter = req.body.idWriter;
    const texto = req.body.escrito;
    const type = req.body.type;
    console.log(req.body.idGroup);
    modelStudent.sendWriting(idGroup, desafio, idWriter, texto, type, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Obtiene el escrito del estudiante segun su grupo*/
function getWriting(req, res) {
    const idWriting= req.query.idWriting;
  
    modelStudent.getWriting(idWriting, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Obtiene los escritos del estudiante segun su grupo*/
function getWritings(req, res) {
    const idUser=req.query.idUser;
    const idGroup=req.query.idGroup;
    modelStudent.getWritings(idUser, idGroup,function (err, result) {
        if(err){
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Edita el escrito del estudiante */
function editWriting(req, res) {
    const idWriting = req.body.idWriting;
    const idGroup = req.body.idGroup;
    const idChallenge = req.body.idChallenge;
    const idWriter = req.body.idWriter;
    const text = req.body.escrito;
    const type = req.body.type;
    modelStudent.editWriting(idWriting, idGroup, idChallenge, idWriter, text, type, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Obtiene los ficheros multimedia del escrito del estudiante*/
function getMultimediaWriting(req, res) {
    const idChallenge = req.query.idChallenge;
    const idWriter = req.query.idWriter;
    modelStudent.getMultimedia(idChallenge, idWriter, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}


/*Obtiene los ficheros multimedia del desafio*/
function getMultimediaChallenge(req, res) {
    const idChallenge = req.query.idChallenge;
    modelStudent.getMultimediaChallenge(idChallenge, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

/*Envia los ficheros multimedia del escrito del estudiante*/
function sendMultimedia(req, res) {

    const idWriter = req.body.idWriter;
    const idChallenge = req.body.idChallenge;
    const reqFiles = [];

    console.log(req.files);
    for (var i = 0; i < req.files.length; i++) {
        var str = req.files[i].mimetype;
        console.log(req.files[i].mimetype);
        var type = str.split("/");
        //dir->idWriter/idChallenge/tipo/
        const dir = idWriter + "/" + idChallenge + "/" + type[0] + "/";
        let path = "http://localhost:3001/multimedia/" + dir + req.files[i].filename;
        reqFiles.push([idWriter,idChallenge,path]) 
    }


   modelStudent.sendMultimedia(reqFiles, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
        
    });
}


/*Elimina  fichero multimedia del escrito*/
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
    modelStudent.deleteFile(idMultimedia, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        res.send(result);
    });
}

module.exports = {
    getGroups: getGroups,
    getTeam: getTeam,
    getChallenges: getChallenges,
    getChallenge: getChallenge,
    getWriting: getWriting,
    getWritings:getWritings,
    sendWriting: sendWriting,
    sendMultimedia: sendMultimedia,
    editWriting: editWriting,
    getMultimediaWriting: getMultimediaWriting,
    getMultimediaChallenge: getMultimediaChallenge,
    deleteFile: deleteFile,

};