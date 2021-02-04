const modelo = require("../models/modelTeacher");

//importar la conexion
const pool = require('../db/database');

const modelTeacher = new modelo(pool);

// const storage = require('../utils/multer');
// const uploader = multer({storage});

// const upload = multer({
//     storage,//es lo mismo que poner storage:storage
//     dest: path.join(__dirname, 'public/images'),
//     limits:{fileSize:1000000},//limite de tamaño maximo permitido 1MB
//     fileFilter:(req,file,cb) =>{
//         const filetypes = /jpeg|jpg|png|gif/;//extensiones que soporta
//         const mimetype = filetypes.test(file.mimetype);
//         const extname=filetypes.test(path.extname(file.originalname));
//         if(mimetype && extname){
//             return cb(null,true);
//         }
//         cb("Error:Archivo debe ser una imagen valida");

//     }
// }).single('image');

/*Obtiene todos los grupos del profesor*/
function getGroups(req, res) {
    const student = req.query.idEstudiante;
    modelTeacher.getGroups(student, function (err, result) {
        res.send(result);
    });
}

/*Obtiene todas las categorias del desafio*/
function getCategories(req, res) {

    modelTeacher.getCategories(function (err, result) {

        res.send(result);
    });
}


//envia los desafios
function postChallenge(req, res) {
    const group = req.body.idGroup;
    const title = req.body.title;
    const description = req.body.description;
    const fecha = req.body.date;
    const type = req.body.type;
    const category = req.body.category;
    const url= req.body.url;
    const date = new Date(fecha);

    modelTeacher.postChallenge(group, title, description, url, date, type, category, function (err, result) {
        res.send(result);
    });
}

//envia los desafios
function editChallenge(req, res) {

    const idChallenge = req.body.idChallenge;
    const group = req.body.idGroup;
    const title = req.body.title;
    const description = req.body.description;
    const fecha = req.body.date;
    const type = req.body.type;
    const category = req.body.category;
    const url= req.body.url;
    const date = new Date(fecha);
    
    modelTeacher.editChallenge(idChallenge, group, title, description, url, date, type, category, function (err, result) {
        res.send(result);
    });
}

function getChallenges(req, res) {
    const group = req.query.idGroup;
    modelTeacher.getChallenges(group, function (err, result) {
        res.send(result);
    });
}

function getChallenge(req, res) {
    const idChallenge = req.query.idChallenge;
    modelTeacher.getChallenge(idChallenge, function (err, result) {
        res.send(result);
    });
}


module.exports = {
    getGroups: getGroups,
    getChallenges: getChallenges,
    getChallenge: getChallenge,
    postChallenge: postChallenge,
    getCategories: getCategories,
    editChallenge: editChallenge,
};