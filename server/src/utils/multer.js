'use strict'

<<<<<<< HEAD
const multer =require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:path.join(__dirname, '../../public/images'),

    //nombre del fichero
    filename:function(req,file,cb){

=======
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const prueba=path.join(__dirname, '../../public/multimedia/');
        
        var str = file.mimetype;//
        var res = str.split("/");//
        //obtengo la ruta -> multimedia/idUser/idfolder/tipo
        const dir=  prueba + req.query.idUser + "/"+ req.query.idFolder +"/"+res[0];

        console.log("----->Carpeta------>", dir);
        //crea la carpeta en la ruta
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
>>>>>>> luis
        cb(null, file.originalname);//nombre original de la imagen
    }
})

<<<<<<< HEAD
module.exports = storage
=======
module.exports = storage

// const storage = multer.diskStorage({
//     destination:path.join(__dirname, '../../public/multimedia'),filename:function(req,file,cb){ 
//         // console.log("---->1",file.mimetype);
//         cb(null, file.originalname);//nombre original de la imagen
//     }

// })

>>>>>>> luis
