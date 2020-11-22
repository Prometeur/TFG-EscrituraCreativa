const modelo = require("../models/modelUser");
const express = require('express');//voy a usar el modulo express
const router = express.Router();

//importar la conexion
//const pool = require('../db/database');

//constantes para la conexion
const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config.database);


const modelUser = new modelo(pool);

 /*Obtiene todos los grupos del profesor*/
function getGroups(req, res) {
    
    let grupo = req.query.idEstudiante;
    console.log("He entrado en el controlador")
    if (grupo != null) {
        modelUser.getGroups(grupo, function(err, result) {
            if(err) 
            {
                if (err.message == "No se puede conectar a la base de datos.") 
                {
                    //next(err);
                    console.log("No se puede conectar a la base de datos");
                }
                res.status(200);
                /*response.render("perfil", {
                    error: err.message
                });*/
                console.log(err.message);
            } 
            else if (result == null) 
            {
                res.status(200);
                /*response.render("perfil", {
                    error: "El usuario no existe."
                });*/
                console.log("El grupo es nulo");
            } 
            else
            {
                res.status(200);
                /*
                response.render("perfil", {
                    error: null,
                    usuarioPerfil: usuarioPerfil
                });
                */
               console.log(result)
               console.log("ESTOY EN EL BUEN CAMINO")
               res.send(JSON.stringify(result));
            }
        });
    }
    else 
    {
        res.status(200);
        console.log("El id es nulo");
    }
}


module.exports = {
    getGroups:getGroups
 
};
