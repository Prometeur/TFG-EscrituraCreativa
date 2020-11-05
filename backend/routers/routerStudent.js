/*
* Name_file : routerStudent
* Descripcion: Contiene los prototipos de todas las funciones que sólo tienen los estudiantes.
* parameters:
    @mysql
    @express
    @path
    @bodyParser
    @controller
    @app
    @config
*/

/*--------------------------------------------------*/
// Dependencies
"use strict"

const config = require("../BBDD/config");
const controller = require("../controllers/controllerStudent");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const router = express.Router();

/*--------------------------------------------------*/
// Functionality systems


/*---------------------------------------------------------*/
//Data export
module.exports = router;