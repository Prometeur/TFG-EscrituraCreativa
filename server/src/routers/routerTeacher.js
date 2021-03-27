//ruta para almacenar los enlaces
const controller_teacher = require("../controllers/controllerTeacher");
const controller_user = require("../controllers/controllerUser");
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

/*Obtiene los  grupos del profesor *
//Muestra todos los estudiantes que pertenezcan a un grupo dado.
//router.post("/inviteStudentToGroup", controller.inviteStudentToGroup);
router.post("/searchStudent", controller_user.searchStudent);

/*Obtiene los los grupos del alumno */
router.get("/getStudentGroups",controller_user.getStudentGroups);

//Muestra todos los estudiantes que pertenezcan a un grupo dado.
//router.post("/inviteStudentToGroup", controller.inviteStudentToGroup);

router.post("/searchStudent", controller_user.searchStudent);

/*Obtiene los los grupos del profesor */
router.get("/getProfile",controller_user.getProfile);

router.get("/acceptApplicant",controller_user.acceptApplicant);

router.post("/groups",controller_teacher.getGroups);

//Invita a un estudiante a un grupo dado.
router.post("/inviteStudentToGroup", controller_teacher.inviteStudentToGroup);

//Expulsa a un estudiante de un grupo dado.
router.post("/kickStudentFromGroup", controller_teacher.kickStudentFromGroup);

/*Busca todos los escritos no colaborativos del usuario */
router.get("/getScriptsByStudent",controller_user.getScriptsByStudent);


/*Obtiene todas las categorias de los desafios */
router.get("/getCategories",controller_teacher.getCategories);

/*Obtiene el desafio del profesor segun su grupo*/
router.get("/getChallenge",controller_teacher.getChallenge);

/*Obtiene los desafios del profesor segun su grupo*/
router.get("/Challenges",controller_teacher.getChallenges);

/*Crea desafio del profesor */
router.post("/createChallenge",controller_teacher.createChallenge);

/*Edita el desafio del profesor*/
router.post("/editChallenge",controller_teacher.editChallenge);

/*Obtiene los ficheros multimedia del desafio del profesor*/
router.get("/getMultimedia",controller_teacher.getMultimedia);

/*Envia los ficheros multimedia del desafio del profesor*/
// router.post("/sendMultimedia",uploader.single('file'),controller.sendMultimedia);

router.post("/sendMultimedia",uploader.array('imgCollection', 20),controller_teacher.sendMultimedia);

/*Elimina el fichero multimedia del desafio*/
router.post("/deleteFile",controller_teacher.deleteFile);

/*Elimina desafio*/
router.post("/deleteChallenge",controller_teacher.deleteChallenge);


//Muestra todos los estudiantes que pertenezcan a un grupo dado.
//router.post("/inviteStudentToGroup", controller.inviteStudentToGroup);

module.exports = router;