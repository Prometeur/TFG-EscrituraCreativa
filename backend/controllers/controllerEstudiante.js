"use strict"

const config = require("../BBDD/config");
const modelo = require("../models/modelEstudiante");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const pool = mysql.createPool(config.mysqlConfig);
const modelEstudiante = new modelo(pool);

app.use(bodyParser.urlencoded({extended:true}));




module.exports = {
    
};