const express = require('express');
const bodyParser = require ('body-parser');
const cors = require("cors");
//const favicon = require('serve-favicon');

const users = require("./routes/users");

const app = express();
const mysql = require("mysql");
//Database.pool
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'escrituracreativa'
    
    });
	res.locals.connection.connect();
	next();
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/users',users);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });*/

var http = require('http');
module.exports = app;
var server = http.createServer(app);
server.listen(3001);


