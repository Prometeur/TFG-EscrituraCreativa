//ruta para almacenar los enlaces

const controller = require("../controllers/controllerUser");
const express = require('express');//voy a usar el modulo express
const router =express.Router();

/*Obtiene los los grupos del profesor */
router.get("/getGroups",controller.getGroups);

// /*Obtiene los desafios del grupo del profesor*/
//router.get("/getChallenges",controller.getChallenges);

//Muestra todos los estudiantes que contienen cierta clave ya sea en nombre o en su email.
router.post("/searchStudent", controller.searchStudent);

//Muestra todos los estudiantes que contienen cierta clave ya sea en nombre o en su email.
router.post("/searchStudentOfGroup", controller.searchStudentOfGroup);

//router.post("/postChallenge",controller.postChallenge);

module.exports = router;