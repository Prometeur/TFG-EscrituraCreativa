/*
* Name_file : ControllerAuth.justify
* Descripcion: Autenticación y autorizacion de datos para el acceso y registro de cuentas.
* parameters:
    @express
    @path
    @bodyParser
    @app
    @config
    @config_auth
    @model
    @model_user
    @jwt
    @bcrypt
*/
/*--------------------------------------------------*/
// Dependencies
"use strict"
const config = require("../db/config");
const config_auth = require("../db/auth.conf")
const model = require("../models/modelUser");
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const pool = mysql.createPool(config.database);
const model_user = new model(pool);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*--------------------------------------------------*/
// Functionality systems

 // Save user in the database after this has been verified.
function signUp(request, response) {
 
 model_user.create(request.body.username,request.body.surname,
  request.body.email, bcrypt.hashSync(request.body.password, 8), function(err, rel){
       
      if(err)
      {
         response.status(500);
      }
      else
      {
          response.status(200).send({ message: "Hola nuevo usuario!" });
      }
  });
}

// log in
function signIn(request, response) {
 
  let username = request.body.username;

  model_user.findOneEmail(username, function(err, rel) {
    if(err)
    {
        response.status(500).send({message:"Internal server error"});
    }
    else
    {
      if(!rel)

      {   
        // console.log("ERROR---> user not found");
        response.status(404).send({ message: "User Not found." });
      }
      else
      {  
        // console.log("Correct---> user found");
          var passwordIsValid = bcrypt.compareSync(
            request.body.password,
            rel.password
          );
          
         if (!passwordIsValid) {
            return response.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
    
        var token = jwt.sign({ id: rel.id }, config_auth.secret, {
              expiresIn: 60});
        
         response.status(200).send({
          id: rel.id,
          username: rel.nombre,
          email: rel.correo,
          activo: rel.activo,
          rol: rel.rol,
          accessToken: token
        });
      }
    }
  });
  
}

module.exports = {
   signUp: signUp,
   signIn: signIn
} 