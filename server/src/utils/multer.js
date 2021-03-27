'use strict'

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const prueba=path.join(__dirname, '../../public/multimedia/');
        
        var str = file.mimetype;//
        var res = str.split("/");//
        var dir;
        if(req.query.type==1){

        //obtengo la ruta -> multimedia/idUser/idfolder/tipo
         dir =  prueba + "users"+"/"+ req.query.id + "/"+ req.query.idFolder +"/"+res[0];
        }
        else if (req.query.type==2) {
            dir=  prueba + "teams"+"/"+ req.query.id + "/"+ req.query.idFolder +"/"+res[0];
        }
        // console.log("----->Carpeta------>", dir);
        //crea la carpeta en la ruta
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);//nombre original de la imagen
    }
})

module.exports = storage

// const storage = multer.diskStorage({
//     destination:path.join(__dirname, '../../public/multimedia'),filename:function(req,file,cb){ 
//         // console.log("---->1",file.mimetype);
//         cb(null, file.originalname);//nombre original de la imagen
//     }

// })

