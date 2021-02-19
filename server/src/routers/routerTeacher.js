//ruta para almacenar los enlaces
const controller = require("../controllers/controllerTeacher");
const express = require('express');//voy a usar el modulo express
const router =express.Router();

// /*Obtiene los desafios del grupo del profesor*/
router.get("/getChallenges",controller.getChallenges);
router.post("/createChallenge",controller.createChallenge);

//Invita a un estudiante a un grupo dado.
router.post("/inviteStudentToGroup", controller.inviteStudentToGroup);

//Expulsa a un estudiante de un grupo dado.
router.post("/kickStudentFromGroup", controller.kickStudentFromGroup);

//Crea un grupo nuevo.
router.post("/createGroup", controller.createGroup);

module.exports = router;