//ruta para almacenar los enlaces
<<<<<<< HEAD

const controller = require("../controllers/controllerStudent");
const express = require('express');//voy a usar el modulo express
const router =express.Router();
=======
const controller = require("../controllers/controllerStudent");
const express = require('express');//voy a usar el modulo express
const router =express.Router();
const multer = require('multer');
const storage = require('../utils/multer');
const uploader = multer({storage});

>>>>>>> luis

router.use(function(request, response,next) {
    response.header(
        "Access-Control-Allow-Headers",
       "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

<<<<<<< HEAD

router.post("/challenges",controller.getGroupStudent);
router.get("/getChallenges",controller.getChallenges);
router.get("/getChallenge",controller.getChallenge);
router.post("/postWriting",controller.postWriting);
router.get("/getWritings",controller.getWritings);

=======
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
router.get("/getMultimediaWriting",controller.getMultimediaWriting);

/*Obtiene los ficheros multimedia del desafio */
router.get("/getMultimediaChallenge",controller.getMultimediaChallenge);

/*Envia los ficheros multimedia del escrito del estudiante*/
router.post("/sendMultimedia",uploader.array('imgCollection', 20),controller.sendMultimedia);

/*Elimina fichero multimedia del escrito*/
router.post("/deleteFile",controller.deleteFile); 



>>>>>>> luis
module.exports = router;