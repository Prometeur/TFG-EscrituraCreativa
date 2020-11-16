//ruta para almacenar los enlaces

const express = require('express');//voy a usar el modulo express
const router =express.Router();

//importar la conexion
const pool = require('../db/database');




router.post("/api/insert",(req,res)=>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert =
    "INSERT INTO usuario (nombre,correo) VALUES (?,?)";
    pool.query(sqlInsert,[movieName,movieReview],(err,result) => {
        console.log(result);
    });
});

router.delete("/api/delete/:movieName",(req,res)=>{
    const name = req.params.movieName;
    const sqlDelete =
    "DELETE FROM usuario WHERE nombre = ?";
   
    pool.query(sqlDelete, name, (err,result)=>{
        if(err) console.log(err);
    })
    
});

router.put("/api/update",(req,res)=>{
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = 
    "UPDATE usuario SET correo = ? WHERE nombre = ?";
   
    pool.query(sqlUpdate, [review,name], (err,result)=>{
        console.log(result);
        if(err) 
        console.log(err);
    });
});






// router.get("/api/login",(req,res)=>{
//     const sqlSelect = "SELECT * FROM usuario where nombre = ? AND password = ? ";
//     const usuario=req.query.nombre;
//     const password=req.query.password;
//     // console.log(usuario);
//     // console.log(password);
//     console.log(usuario);
//     pool.query(sqlSelect, [usuario,usuario] ,(err,result) => {
//         res.send(result);
//     });
// });


/*--------------------------------------------ADMIN----------------------------------------------------------------------------- */
// router.get("/api/get",(req,res)=>{

//     const sqlSelect = "SELECT * FROM usuario";
//     pool.query(sqlSelect,(err,result) => {
//         res.send(result);
//     });
// });
/*--------------------------------------------PROFESOR----------------------------------------------------------------------------- */
/*Obtiene los datos del grupo del profesor */
// router.get("/api/getGroup",(req,res)=>{

//     const sqlSelect = "SELECT * FROM grupo where idprofesor= ?";
//     const student=req.query.idEstudiante;
//     pool.query(sqlSelect,student,(err,result) => {
//         res.send(result);
//     });
// });

/*--------------------------------------------STUDENT----------------------------------------------------------------------------- */
/*Obtiene los datos del grupoEstudiante del estudiante */
// router.get("/api/getGroupStudent",(req,res)=>{

//     const sqlSelect = "SELECT * FROM grupoestudiante where idEstudiante= ?";
//     const student=req.query.idEstudiante;
//     pool.query(sqlSelect,student,(err,result) => {
//         res.send(result);
//     });
// });


// /*Obtiene la tabla desafios del grupo */
// router.get("/api/getChallenges",(req,res)=>{

//     const sqlSelect = "SELECT * FROM desafio where idGrupo= ?";
//     const group=req.query.idGroup;
//     pool.query(sqlSelect,group,(err,result) => {
//         res.send(result);
//     });
// });




// router.post("/api/postWriting",(req,res)=>{
    
//     const desafio = req.body.idChallenge;
//     const escritor = req.body.idEscritor;
//     const texto =req.body.escrito;
//     const sqlInsert = "INSERT INTO escrito (idDesafio,idEscritor,texto) VALUES (?,?,?)";
//     pool.query(sqlInsert,[desafio,escritor,texto],(err,result) => {
//         console.log(result);
//     });
// });


module.exports = router;