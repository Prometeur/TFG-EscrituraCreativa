"use strict"

const config = require("../BBDD/config");
const controller = require("../controllers/controllerProfesor");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const router = express.Router();

router.post("/crearGrupo/:id", controller.crearGrupo);

router.post("/invitarAGrupo/:id", controller.invitarAGrupo); //Añade el estudiante seleccionado al grupo seleccionado directamente, priemro verificando que no lo esté

router.get("/eliminarGrupo/:id", controller.eliminarGrupo);//Pone el campo activo a 0, no leimina de la base de datos directamente.



module.exports = router;