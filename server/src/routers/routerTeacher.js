//ruta para almacenar los enlaces
const controller = require("../controllers/controllerTeacher");
const express = require('express');//voy a usar el modulo express
const router =express.Router();

// /*Obtiene los desafios del grupo del profesor*/
router.get("/getChallenges",controller.getChallenges);
router.post("/createChallenge",controller.createChallenge);

module.exports = router;