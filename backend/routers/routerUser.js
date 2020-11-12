/*
* Name_file : routerUser
* Descripcion: Contiene los prototipos de todas las funciones que comparten todos los usuarios.
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
const controller = require("../controllers/controllerUser");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const router = express.Router();

/*--------------------------------------------------*/
// Functionality systems

//Busca a todos los estudiantes que pertenecen a un grupo determinado por el ID.
router.get("/group/:id", controller.group);

// Busca todos los estudiantes pertenecientes a un equipo mediante el ID del mismo.
router.get("/team/:id", controller.team);

//Mustra todos lso estudiantes activos que existen.
router.get("/students", controller.showStudents);

//Muestra a todos los profesores.
router.get("/teachers", controller.showTeachers);

//Muestra todos los estudiantes que contienen cierta clave ya sea en nombre o en su email.
router.post("/searchStudent", controller.searchStudent);

//Muestra todos los profesores que contienen cierta clave ya sea en nombre o en su email.
router.post("/searchTeacher", controller.searchTeacher);

// Busca y devuelve los datos de un usuario según su ID.
router.get("/getUser/:id", controller.getUser);



/*---------------------------------------------------------*/
//Data export
module.exports = router;