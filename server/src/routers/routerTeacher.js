//ruta para almacenar los enlaces
const controller = require("../controllers/controllerTeacher");
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

/*Obtiene los  grupos del profesor */
router.post("/getGroups",controller.getGroups);

/*Obtiene todas las categorias de los desafios */
router.get("/getCategories",controller.getCategories);

/*Obtiene el desafio del profesor segun su grupo*/
router.get("/getChallenge",controller.getChallenge);

/*Obtiene los desafios del profesor segun su grupo*/
router.get("/Challenges",controller.getChallenges);

/*Crea desafio del profesor */
router.post("/createChallenge",controller.createChallenge); 

/*Edita el desafio del profesor*/
router.post("/editChallenge",controller.editChallenge);

/*Obtiene los ficheros multimedia del desafio del profesor*/
router.get("/getMultimedia",controller.getMultimedia);

/*Envia los ficheros multimedia del desafio del profesor*/
// router.post("/sendMultimedia",uploader.single('file'),controller.sendMultimedia);

router.post("/sendMultimedia",uploader.array('imgCollection', 20),controller.sendMultimedia);

/*Elimina el fichero multimedia del desafio*/
router.post("/deleteFile",controller.deleteFile); 

/*Elimina desafio*/
router.post("/deleteChallenge",controller.deleteChallenge); 


//Muestra todos los estudiantes que pertenezcan a un grupo dado.
//router.post("/inviteStudentToGroup", controller.inviteStudentToGroup);

module.exports = router;