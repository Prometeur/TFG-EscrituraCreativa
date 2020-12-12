const modelo = require("../models/modelUser");
const express = require('express');//voy a usar el modulo express
const router = express.Router();



//importar la conexion
//const pool = require('../db/database');

//constantes para la conexion
const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config.database);
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


const modelUser = new modelo(pool);

 /*Obtiene todos los grupos del profesor*/
function getGroups(req, res) {
    
    let grupo = req.query.idEstudiante;
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


//Busca estudiantes según una clave dada.
function searchStudent(request, response, next){
    let clave = request.body.clave;
    let tipo = "nombre";
    if(request.body.tipo == "email"){
        tipo = "email";
    }
    
    modelUser.searchStudent(clave, tipo, function(err, studentList) {
        if(err) 
        {
            if (err.message == "No se puede conectar a la base de datos.") 
            {
                //next(err);
                console.log("No se puede conectar a la base de datos");
            }
            response.status(500);
            /*response.render("perfil", {
                error: err.message
            });*/
            console.log(err.message);
        }
        else if (studentList == null) 
        {
            response.status(200);
            /*response.render("perfil", {
                error: "No hay estudiantes con los parámetros escogidos."
            });*/
            console.log("No hay estudiantes con los parámetros escogidos.");
        } 
        else 
        {
            response.status(200);
           response.send(JSON.stringify(studentList));
        }
    });

}


module.exports = {
    getGroups:getGroups,
    searchStudent:searchStudent
 
};
