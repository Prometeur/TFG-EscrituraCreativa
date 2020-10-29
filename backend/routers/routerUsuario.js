"use strict"

const config = require("../BBDD/config");
const controller = require("../controllers/controllerUsuario");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const router = express.Router();


router.get("/grupo/:id", controller.grupo);

router.get("/equipo/:id", controller.equipo);

router.get("/todos", controller.mostrarTodos);

router.get("/estudiantes", controller.mostrarEstudiantes);

router.get("/profesores", controller.mostrarProfesores);

router.get("/administradores", controller.mostrarAdministradores);

router.get("/solicitudes", controller.mostrarSolicitudes); //Esta función devuelve todos los profesores que se acaban de apuntar y tienen que ser aceptados por un ADMIN



module.exports = router;