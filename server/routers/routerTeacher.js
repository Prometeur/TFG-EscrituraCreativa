/*
* Name_file : 
* Descripcion:
* parameters:
    @routerUSer
    @express
    @path
    @bodyParser
    @cors
    @app
*/

/*--------------------------------------------------*/
// Dependencies

"use strict"
const controller_teacher = require("../controllers/controllerTeacher");
const express = require("express");
const router = express.Router();

/*--------------------------------------------------*/
// Functionality systems

//
router.post("/insert-group/:id", controller_teacher.createGroup);

//Añade el estudiante seleccionado al grupo seleccionado directamente, priemro verificando que no lo esté
router.post("/invite-group/:id", controller_teacher.inviteGroup); 

//Pone el campo activo a 0, no leimina de la base de datos directamente.
router.get("/delete-group/:id", controller_teacher.deleteGroup);


/*---------------------------------------------------------*/
//Data export
module.exports = router;