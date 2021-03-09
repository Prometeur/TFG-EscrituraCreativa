//ruta para almacenar los enlaces

const controllerUser = require("../controllers/controllerUser");
const controllerTeacher = require("../controllers/controllerTeacher");
const controllerAdmin = require("../controllers/controllerAdmin");
const express = require('express');//voy a usar el modulo express
const router =express.Router();

//importar la conexion
const pool = require('../db/database');

//Muestra todos los estudiantes que contienen cierta clave ya sea en nombre o en su email.
router.post("/searchStudent", controllerUser.searchUsers);

//Muestra todos los grupos.
router.get("/getAllGroups", controllerUser.getAllGroups);

//Invita a un estudiante a un grupo dado.
router.post("/inviteStudentToGroup", controllerTeacher.inviteStudentToGroup);

//Expulsa a un estudiante de un grupo dado.
router.post("/kickStudentFromGroup", controllerTeacher.kickStudentFromGroup);

//Expulsa a un estudiante de un grupo dado.
router.post("/deactivateUser", controllerAdmin.deactivateUser);

//Expulsa a un estudiante de un grupo dado.
router.post("/deleteUser", controllerAdmin.deleteUser);

//Renombra al grupo dado.
router.post("/renameGroup", controllerAdmin.renameGroup);

//Expulsa a un estudiante de un grupo dado.
router.post("/deactivateGroup", controllerAdmin.deactivateGroup);

//Muestra los estudiantes de un grupo.
router.post("/getStudentsOfGroup", controllerUser.searchStudentOfGroup);

//Muestra todos los grupos.
router.get("/getScriptsByStudent", controllerUser.getScriptsByStudent);

//Muestra todos los grupos.
router.get("/getGroupsOfTeacher", controllerUser.getGroups);

//Muestra todos los grupos.
router.get("/getGroupData", controllerUser.getGroupData);

//Accede a los datos de un usuario.
router.get("/getProfile", controllerUser.getProfile);

//Muestra los estudiantes de un grupo.
router.get("/getChallenges", controllerTeacher.getChallenges);

router.get("/getUsers",(req,res)=>{

    const sqlSelect = "SELECT * FROM usuario";
    pool.query(sqlSelect,(err,result) => {
        res.send(result);
    });
});


module.exports = router;