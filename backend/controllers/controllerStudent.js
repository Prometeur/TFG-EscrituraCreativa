/*
* Name_file : controllerStudent
* Descripcion: Contiene la funcionalidad de negocio de todas las funciones que sólo tienen los estudiantes.
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
const modelo = require("../models/modelStudent");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const pool = mysql.createPool(config.mysqlConfig);
const modelEstudiante = new modelo(pool);

app.use(bodyParser.urlencoded({extended:true}));

/*--------------------------------------------------*/
// Functionality systems


/*---------------------------------------------------------*/
//Data export
module.exports = {
    
};