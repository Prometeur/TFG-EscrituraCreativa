//ruta para almacenar los enlaces
const controller = require("../controllers/controllerStudent");
const express = require('express');//voy a usar el modulo express
const router =express.Router();
const multer = require('multer');
const storage = require('../utils/multer');
const uploader = multer({storage});


router.use(function(request, response,next) {
    response.header(
        "Access-Control-Allow-Headers",
       "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

/*Obtiene los grupos del estudiante*/
router.post("/getGroups",controller.getGroups);

/*Obtiene el equipo del estudiante*/
router.get("/getTeam",controller.getTeam);

/*Obtiene el desafio del estudiante segun su grupo*/
router.get("/getChallenge",controller.getChallenge);

/*Obtiene los desafios del estudiante segun su grupo*/
router.get("/getChallenges",controller.getChallenges);

/*Obtiene el escrito del estudiante segun su grupo*/
router.get("/getWriting",controller.getWriting);

/*Obtiene los escritos del estudiante segun su grupo*/
router.get("/getWritings",controller.getWritings);

/*Envio el escrito del estudiante */
router.post("/sendWriting",controller.sendWriting);

/*Edito el escrito del estudiante */
router.post("/editWriting",controller.editWriting);

/*Obtiene los ficheros multimedia del escrito del estudiante*/
router.get("/getMultimedia",controller.getMultimedia);

/*Envia los ficheros multimedia del escrito del estudiante*/
router.post("/sendMultimedia",uploader.single('file'),controller.sendMultimedia);

/*Edita los ficheros multimedia del escrito del estudiante*/
router.post("/editMultimedia",uploader.single('file'),controller.editMultimedia);


module.exports = router;