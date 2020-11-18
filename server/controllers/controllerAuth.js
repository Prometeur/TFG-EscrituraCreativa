/*
* Name_file : 
* Descripcion:
* parameters:
    @routerUSer
    @express
    @path
    @bodyParser
    @cors
    @app
*/
/*--------------------------------------------------*/
// Dependencies
"use strict"
const config = require("../BBDD/config");
const config_auth = require("../BBDD/auth.conf")
const model = require("../models/modelUsuarios");
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const pool = mysql.createPool(config.mysqlConfig);
const model_user = new model(pool);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(bodyParser.urlencoded({extended:true}));


/*--------------------------------------------------*/
// Functionality systems

function signUp(request, response) {
  
    // Save User to Database
 /* model_user.create({
    username: request.body.username,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 8)
  })
    .then(user => {
        console.log(user.body);
    })
    .catch(err => {
      response.status(500).send({ message: err.message });
    });*/
}

// 
function signIn(request, response) {
  

 
  let username = request.body.username;
  let password =  request.body.password;
 
  model_user.findOneEmail(username,password, function(err, rel) {
    
    if(err)
    {
        response.status(500);
    }
    else
    {
      if(rel != undefined)
      {
        response.status(500);
      }
      else
      {
          response.status(200);
          console.log(rel);
         /*
          var passwordIsValid = bcrypt.compareSync(
            request.body.password,
            user.password
          );
      
          if (!passwordIsValid) {
            return response.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
      
            var token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400 // 24 hours
            });
            */
      }
    }
  });
  
}

module.exports = {
   singUp: signUp,
   signIn: signIn
} 