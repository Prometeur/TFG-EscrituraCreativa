'use strict'

const multer =require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:path.join(__dirname, '../../public/images'),

    //nombre del fichero
    filename:function(req,file,cb){

        cb(null, file.originalname);//nombre original de la imagen
    }
})

module.exports = storage