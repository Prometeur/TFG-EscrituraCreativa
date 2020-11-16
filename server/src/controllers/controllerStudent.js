const modelo = require("../models/modelStudent");

const express = require('express');//voy a usar el modulo express
const router = express.Router();

//importar la conexion
const pool = require('../db/database');

const modelStudent = new modelo(pool);


function getGroupStudent(req, res) {
    const student = req.query.idEstudiante;
    modelStudent.getGroupStudent(student, function (err, result) {
        res.send(result);
    });
}

function getChallenges(req, res) {
    const group=req.query.idGroup;
    modelStudent.getChallenges(group, function (err, result) {
        res.send(result);
    });
   
}

function getChallenge(req, res) {
    const challenge=req.query.idChallenge;
    modelStudent.getChallenge(challenge, function (err, result) {
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
};