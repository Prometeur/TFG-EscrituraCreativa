const express = require("express");
const bodyParser = require ('body-parser');
const cors = require("cors");
const app = express();
const mysql = require("mysql");



const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'escrituracreativa'

});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{

    const sqlSelect = "SELECT * FROM usuario";
    db.query(sqlSelect,(err,result) => {
        res.send(result);
    });
});



app.post("/api/insert",(req,res)=>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert =
    "INSERT INTO usuario (nombre,correo) VALUES (?,?)";
    db.query(sqlInsert,[movieName,movieReview],(err,result) => {
        console.log(result);
    });
});

app.delete("/api/delete/:movieName",(req,res)=>{
    const name = req.params.movieName;
    const sqlDelete =
    "DELETE FROM usuario WHERE nombre = ?";
   
    db.query(sqlDelete, name, (err,result)=>{
        if(err) console.log(err);
    })
    
});

app.put("/api/update",(req,res)=>{
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = 
    "UPDATE usuario SET correo = ? WHERE nombre = ?";
   
    db.query(sqlUpdate, [review,name], (err,result)=>{
        console.log(result);
        if(err) 
        console.log(err);
    });
});


app.listen(3001,() =>{
    console.log("running on port 3001");
});

// app.set('port',process.env.PORT || 3001);
// //starting the server
// app.listen(app.get('port'),()=>{
//     console.log('Server on port', app.get('port'));
// });