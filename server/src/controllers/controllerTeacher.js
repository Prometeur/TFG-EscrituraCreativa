const modelo = require("../models/modelTeacher");
const express = require('express');
//constantes para la conexion
const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config.database);
const modelTeacher = new modelo(pool);

/*Obtiene todos los grupos del profesor*/
function getGroups(req, res) {

    const idTeacher = req.body.idTeacher;
    modelTeacher.getGroups(idTeacher, function (err, result) {
       
        res.send(JSON.stringify(result));
    });
}

/*Obtiene todas las categorias del desafio*/
function getCategories(req, res) {
 
    modelTeacher.getCategories(function (err, result) {
        res.send(result);
    });
}


//envia los desafios
function createChallenge(req, res) {
   
    const group = req.body.idGroup;
    const title = req.body.title;
    const description = req.body.description;
    const fecha = req.body.date;
    const type = req.body.type;
    const category = req.body.category;
    const url= req.body.url;
    const date = new Date(fecha);

    modelTeacher.createChallenge(group, title, description, url, date, type, category, function (err, result) {
        res.send(result);
    });
}

//envia los desafios
function editChallenge(req, res) {

    const idChallenge = req.body.idChallenge;
    const group = req.body.idGroup;
    const title = req.body.title;
    const description = req.body.description;
    const fecha = req.body.date;
    const type = req.body.type;
    const category = req.body.category;
    const url= req.body.url;
    const date = new Date(fecha);
    
    modelTeacher.editChallenge(idChallenge, group, title, description, url, date, type, category, function (err, result) {
        res.send(result);
    });
}

function getChallenges(req, res) {
    const group = req.query.idGroup;
   
    modelTeacher.getChallenges(group, function (err, result) {
        res.send(result);
    });
}

function getChallenge(req, res) {
    
    const idChallenge = req.query.idChallenge;
    
    modelTeacher.getChallenge(idChallenge, function (err, result) {
        res.send(result);

    });
}



//Busca estudiantes según el grupo dado.
function inviteStudentToGroup(request, response, next){
    
    const grupo = request.body.grupo;
    const id = request.body.idEstudiante;

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

module.exports = {
    getGroups:getGroups,
    getChallenges: getChallenges,
    getChallenge: getChallenge,
    createChallenge:createChallenge,
    getCategories: getCategories,
    editChallenge: editChallenge,
    inviteStudentToGroup: inviteStudentToGroup,
};
