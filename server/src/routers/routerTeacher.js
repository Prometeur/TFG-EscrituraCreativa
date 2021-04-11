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


//-------------------------------------------------GROUP------------------------------------------------------------------//
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

//Muestra todos los estudiantes que pertenezcan a un grupo dado.
//router.post("/inviteStudentToGroup", controller.inviteStudentToGroup);

//-------------------------------------------------CHALLENGE------------------------------------------------------------------//

/*Crea desafio del profesor */
router.post("/createChallenge",controller_teacher.createChallenge);

/*Edita el desafio del profesor*/
router.post("/editChallenge",controller_teacher.editChallenge);

/*Elimina desafio*/
router.post("/deleteChallenge",controller_teacher.deleteChallenge);

/*Obtiene todas las categorias de los desafios */
router.get("/getCategories",controller_teacher.getCategories);

/*Obtiene el desafio del profesor segun su grupo*/
router.get("/getChallenge",controller_teacher.getChallenge);

/*Obtiene los desafios del profesor segun su grupo*/
router.get("/Challenges",controller_teacher.getChallenges);

//----------------------------------------------MULTIMEDIA CHALLENGE------------------------------------------------------------------//

/*Obtiene los ficheros multimedia del desafio del profesor*/
router.get("/getMultimediaChallenge",controller_teacher.getMultimediaChallenge);

/*Envia los ficheros multimedia del desafio del profesor*/
// router.post("/sendMultimedia",uploader.single('file'),controller.sendMultimedia);

router.post("/sendMultimediaChallenge",uploader.array('imgCollection', 20),controller_teacher.sendMultimediaChallenge);

/*Elimina el fichero multimedia del desafio*/
router.post("/deleteFile",controller_teacher.deleteFile);

//-------------------------------------------------WRITING------------------------------------------------------------------//

/*Edito el escrito del estudiante */
router.post("/editWriting",controller_teacher.editWriting); 

/*Obtiene escritos de estudiantes */
router.get("/getWritingsStudent",controller_teacher.getWritingsStudent);

/*Obtiene el escritos de equipos*/
router.get("/getWritingsTeam",controller_teacher.getWritingsTeam);

/*Obtiene el escrito del estudiante segun su grupo*/
router.get("/getWriting",controller_teacher.getWriting);



//----------------------------------------------MULTIMEDIA WRITING------------------------------------------------------------------//

/*Obtiene los ficheros multimedia del escrito del estudiante*/
router.get("/getMultimediaWriting",controller_teacher.getMultimediaWriting);

//-------------------------------------------------TEAM--------------------------------------------------------------------//

/*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
router.get("/getTeamStudentGroup",controller_teacher.getTeamStudentGroup);


module.exports = router;