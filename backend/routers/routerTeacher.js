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

//Crea un nuevo grupo.
router.post("/createGroup", controller.createGroup);

//Añade el estudiante seleccionado al grupo seleccionado directamente, priemro verificando que no lo esté.
router.post("/inviteToGroup", controller.inviteToGroup); 

//Pone el campo activo a 0 del grupo seleccionado, no elimina de la base de datos directamente.
router.get("/deleteGroup/:id", controller.deleteGroup);

//Elimina al estudiante seleccionado del grupo elegido.
router.post("/kickFromGroup", controller.kickFromGroup); 

//Muestra todos los estudiantes que aún no han sido aprobados. (activo a 0)
router.get("/showStudentRequests", controller.showStudentRequests);

//Acepta la petición de un estudiante para que pueda usar la plataforma. (Cambia su activo a 1)
router.post("/acceptStudent/:id", controller.acceptStudent);

//Muestra los desafíos del grupo indicado.
router.get("/showChallengesOfGroup/:id", controller.showChallengesOfGroup);

//Muestra los escritos del desafío indicado.
router.get("/showPapersOfChallenge/:id", controller.showPapersOfChallenge);

//Crea un desafío nuevo con los datos provistos.
router.post("/createChallengue", controller.createChallengue); 



/*---------------------------------------------------------*/
//Data export
module.exports = router;