//ruta para almacenar los enlaces

const controller = require("../controllers/controllerUser");
const express = require('express');//voy a usar el modulo express
const router =express.Router();

/*Obtiene los los grupos del profesor */
router.get("/getGroups",controller.getGroups);

// /*Obtiene los desafios del grupo del profesor*/
//router.get("/getChallenges",controller.getChallenges);


//router.post("/postChallenge",controller.postChallenge);

module.exports = router;