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
router.get("/getGroups/getCategories",controller.getCategories);

/*Obtiene los desafios del grupo del profesor*/
router.get("/getGroups/getChallenge",controller.getChallenge);


/*Obtiene los desafios del grupo del profesor*/
router.get("/getGroups/Challenges",controller.getChallenges);

/*crea un nuevo desafio a la bd*/
router.post("getGroups/createChallenge",uploader.single('file'),controller.createChallenge);

/*modifica los datos del desafio de la bd*/
router.post("getGroups/editChallenge",uploader.single('file'),controller.editChallenge);

//Muestra todos los estudiantes que pertenezcan a un grupo dado.
//router.post("/inviteStudentToGroup", controller.inviteStudentToGroup);

module.exports = router;