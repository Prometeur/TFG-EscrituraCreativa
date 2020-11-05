/*
* Name_file : routerTeacher
* Descripcion: Contiene los prototipos de todas las funciones que son exclusivas a los profesores.
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
const controller = require("../controllers/controllerTeacher");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const router = express.Router();


/*--------------------------------------------------*/
// Functionality systems

//Crea un nuevo grupo
router.post("/crearGrupo/:id", controller.createGroup);

//Añade el estudiante seleccionado al grupo seleccionado directamente, priemro verificando que no lo esté
router.post("/invitarAGrupo/:id", controller.inviteToGroup); 

//Pone el campo activo a 0, no leimina de la base de datos directamente.
router.get("/eliminarGrupo/:id", controller.deleteGroup);



/*---------------------------------------------------------*/
//Data export
module.exports = router;