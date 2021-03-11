//ruta para almacenar los enlaces

const express = require('express');//voy a usar el modulo express
const router =express.Router();

//importar la conexion
const pool = require('../db/database');

router.get("/getUsers",(req,res)=>{

    const sqlSelect = "SELECT * FROM usuario";
    pool.query(sqlSelect,(err,result) => {
        res.send(result);
    });
});


module.exports = router;