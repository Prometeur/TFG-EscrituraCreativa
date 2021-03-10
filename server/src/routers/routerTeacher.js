//ruta para almacenar los enlaces

const controller = require("../controllers/controllerTeacher");

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

/*Obtiene los  grupos del profesor */
router.post("/getGroups",controller_teacher.getGroups);

/*Obtiene todas las categorias de los desafios */
router.get("/getGroups/getCategories",controller_teacher.getCategories);

/*Obtiene los desafios del grupo del profesor*/
router.get("/getGroups/getChallenge",controller_teacher.getChallenge);


/*Obtiene los desafios del grupo del profesor*/
router.get("/getGroups/Challenges",controller_teacher.getChallenges);

/*crea un nuevo desafio a la bd*/
router.post("getGroups/createChallenge",uploader.single('file'),controller_teacher.createChallenge);

/*modifica los datos del desafio de la bd*/
router.post("getGroups/editChallenge",uploader.single('file'),controller_teacher.editChallenge);

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

//Invita a un estudiante a un grupo dado.
router.post("/inviteStudentToGroup", controller_teacher.inviteStudentToGroup);

//Expulsa a un estudiante de un grupo dado.
router.post("/kickStudentFromGroup", controller_teacher.kickStudentFromGroup);

/*BUsca todos los escritos no colaborativos del usuario */
router.get("/getScriptsByStudent",controller_user.getScriptsByStudent);

module.exports = router;