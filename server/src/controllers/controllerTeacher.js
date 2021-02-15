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


module.exports = {
    getGroups:getGroups,
    getChallenges: getChallenges,
    getChallenge: getChallenge,
    createChallenge:createChallenge,
    getCategories: getCategories,
    editChallenge: editChallenge,
};
