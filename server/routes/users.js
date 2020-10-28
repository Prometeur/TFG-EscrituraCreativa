var express = require('express');
var router = express.Router();

router.get('/',function(req,res) {
    res.locals.connection.query("SELECT * FROM usuario", 
    function(error,results,fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    })
   
});

router.post('/',function(req,res) {
    const user = [
        req.body.nombre,
        req.body.correo
    ];

    res.locals.connection.query("INSERT INTO usuario (nombre,correo) VALUES (?,?)", user, 
    function(error,results,fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.delete("/",function(req,res) {

    res.locals.connection.query("DELETE FROM usuario WHERE nombre = ?", 
    function(error,results,fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    })

});

router.put("/",function(req,res) {

    res.locals.connection.query("UPDATE usuario SET correo = ? WHERE nombre = ?", 
    function(error,results,fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    })
});


module.exports = router;