const modelo = require("../models/modelStudent");

//importar la conexion
const mysql = require("mysql");
const config = require('../db/config');
const pool = mysql.createPool(config.database);
const modelStudent = new modelo(pool);


function getGroupStudent(req, res) {
   
    const student = req.body.idStudent;
   
    modelStudent.getGroupStudent(student, function (err, result) {
        res.send(JSON.stringify(result));
    });
}

function getChallenges(req, res) {
   
    const group= req.query.idGroup;

    modelStudent.getChallenges(group, function (err, result) {
        console.log(result);
        res.send(result);
    });
 
}

function getChallenge(req, res) {
   
    const challenge=req.query.idChallenge;
   
    modelStudent.getChallenge(challenge, function (err, result) {
        res.send(result);
    });
   
}

function getWritings(req, res) {

    const idUser=req.query.idUser;
    const idGroup=req.query.idGroup;
    
    modelStudent.getWritings(idUser, idGroup,function (err, result) {
        res.send(result);
    });
   
}

function postWriting(req, res) {
   
    const desafio = req.body.idChallenge;
    const escritor = req.body.idEscritor;
    const texto =req.body.escrito;
   
    modelStudent.postWriting(desafio,escritor,texto, function (err, result) {
        res.send(result);
    });   
}

module.exports = {
    getGroupStudent: getGroupStudent,
    getChallenges:getChallenges,
    getChallenge:getChallenge,
    postWriting:postWriting,
    getWritings:getWritings,
};