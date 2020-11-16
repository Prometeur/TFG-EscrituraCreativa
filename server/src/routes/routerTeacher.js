//ruta para almacenar los enlaces

const express = require('express');//voy a usar el modulo express
const router =express.Router();

//importar la conexion
const pool = require('../db/database');


router.get("/getGroups",(req,res)=>{

    const sqlSelect = "SELECT * FROM grupo where idprofesor= ?";
    const student=req.query.idEstudiante;
    pool.query(sqlSelect,student,(err,result) => {
        res.send(result);
    });
});


/*Obtiene la tabla desafios del grupo */
router.get("/getChallenges",(req,res)=>{

    const sqlSelect = "SELECT * FROM desafio where idGrupo= ?";
    const group=req.query.idGroup;
    pool.query(sqlSelect,group,(err,result) => {
        res.send(result);
    });
});

router.post("/postChallenge",(req,res)=>{
    
    const title = req.body.title;
    const description = req.body.description;
    const group =req.body.idGroup;
    const sqlInsert = "INSERT INTO desafio (titulo,descripcion,activo,idGrupo) VALUES (?,?,?,?)";
    pool.query(sqlInsert,[title,description,1,group],(err,result) => {
        console.log(result);
    });
});

module.exports = router;