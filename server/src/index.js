const express = require("express");
const app = express();


//configuracion del servidor express
// defino el puerto
app.set('port',process.env.PORT || 3001);
//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});

//middleware funciones app cliente envia peticion al servidor
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//Routes  url del servidor
app.use(require('./routes/index'));
app.use('/links',require('./routes/links'));



