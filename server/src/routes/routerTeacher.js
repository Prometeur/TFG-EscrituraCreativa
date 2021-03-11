// //ruta para almacenar los enlaces

// const express = require('express');//voy a usar el modulo express
// const router =express.Router();

// //importar la conexion
// const pool = require('../db/database');


// router.get("/getGroups",(req,res)=>{

//     const sqlSelect = "SELECT * FROM grupo where idprofesor= ?";
//     const student=req.query.idEstudiante;
//     pool.query(sqlSelect,student,(err,result) => {
//         res.send(result);
//     });
// });


// /*Obtiene la tabla desafios del grupo */
// router.get("/getChallenges",(req,res)=>{

//     const sqlSelect = "SELECT * FROM desafio where idGrupo= ?";
//     const group=req.query.idGroup;
//     pool.query(sqlSelect,group,(err,result) => {
//         res.send(result);
//     });
// });

// router.post("/postChallenge",(req,res)=>{
    
//     const title = req.body.title;
//     const description = req.body.description;
//     const group =req.body.idGroup;
//     const sqlInsert = "INSERT INTO desafio (titulo,descripcion,activo,idGrupo) VALUES (?,?,?,?)";
//     pool.query(sqlInsert,[title,description,1,group],(err,result) => {
//         console.log(result);
//     });
// });

// module.exports = router;

//ruta para almacenar los enlaces

const controller = require("../controllers/controllerTeacher");
const express = require('express');//voy a usar el modulo express
const router =express.Router();

const multer = require('multer');
const path = require('path');
const storage = require('../utils/multer');
const uploader = multer({storage});



/*Obtiene los  grupos del profesor */
router.get("/getGroups",controller.getGroups);


/*Obtiene todas las categorias de los desafios */
router.get("/getCategories",controller.getCategories);

/*Obtiene los desafios del grupo del profesor*/
router.get("/getChallenge",controller.getChallenge);


/*Obtiene los desafios del grupo del profesor*/
router.get("/getChallenges",controller.getChallenges);


/*crea un nuevo desafio a la bd*/
router.post("/postChallenge",uploader.single('file'),controller.postChallenge);

/*modifica los datos del desafio de la bd*/
router.post("/editChallenge",uploader.single('file'),controller.editChallenge);



module.exports = router;