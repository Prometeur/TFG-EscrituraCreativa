"use strict"

const config = require("../BBDD/config");
const controller_user = require("../controllers/controllerUser");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();


router.get("/grupo/:id", controller_user.grupo);

router.get("/estudiantes", controller_user.mostrarEstudiantes);

router.get("/profesores", controller_user.mostrarProfesores);

router.get("/administradores", controller_user.mostrarAdministradores);

router.get("/solicitudes", controller_user.mostrarSolicitudes); //Esta función devuelve todos los profesores que se acaban de apuntar y tienen que ser aceptados por un ADMIN



module.exports = router;