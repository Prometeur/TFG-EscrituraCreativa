//ruta para almacenar los enlaces

const express = require('express');//voy a usar el modulo express
const router =express.Router();

//importar la conexion
const pool = require('../database');


router.get("/api/get",(req,res)=>{

    const sqlSelect = "SELECT * FROM usuario";
    pool.query(sqlSelect,(err,result) => {
        res.send(result);
    });
});

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

module.exports = router;