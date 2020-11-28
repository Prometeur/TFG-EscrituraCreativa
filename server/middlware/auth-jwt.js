/*
* Name_file : auth-jwt.js
* Descripcion: 
* parameters:
   
*/

/*--------------------------------------------------*/
// Dependencies
"use strict"
const jwt = require("jsonwebtoken");
const config = require("../BBDD/config");
const config_auth = require("../BBDD/auth.conf");
const model = require("../models/modelUsuarios");
const mysql = require("mysql");
const express = require("express");
const pool = mysql.createPool(config.mysqlConfig);
const model_user = new model(pool);

function verifyToken (request, response, next) {
  
  let token = request.headers["x-access-token"];

    if (!token) 
    {
       return response.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, config_auth.secret, (err, decoded) => {
      if (err) 
      {
        return response.status(401).send({
          message: "Unauthorized!"
        });
      }
      //request.UserId cambiado por .correo
      request.correo = decoded.correo;
    });
}

function isAdmin(request, response, next) {
  model_user.findOneEmail(request.correo)
  .then(user => {
      if ( user.data === "A") 
      {
          next();
          return;
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
};

function isTeacher(request, response, next) {
  model_user.findOneEmail(request.correo)
  .then(user => {
      if (user.data === "P") {
        //cambiar a T luego 
        next();
        return;
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
};

function isStudent(request, response, next) {
  model_user.findOneEmail(request.correo)
  .then(user => {
      if (user.data === "E") {
        next();
        return;
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
};


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isTeacher: isTeacher,
  isStudent: isStudent
};
module.exports = authJwt;