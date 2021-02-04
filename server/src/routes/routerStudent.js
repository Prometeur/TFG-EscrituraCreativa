//ruta para almacenar los enlaces

const controller = require("../controllers/controllerStudent");
const express = require('express');//voy a usar el modulo express
const router =express.Router();

router.get("/getGroupStudent",controller.getGroupStudent);
router.get("/getChallenges",controller.getChallenges);
router.get("/getChallenge",controller.getChallenge);
router.get("/getWritings",controller.getWritings);
router.post("/postWriting",controller.postWriting);




module.exports = router;