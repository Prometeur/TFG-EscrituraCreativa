// //ruta para almacenar los enlaces

// const express = require('express');//voy a usar el modulo express
// const router =express.Router();

// //importar la conexion
// const pool = require('../db/database');

// router.get("/getUser",(req,res)=>{
//     const sqlSelect = "SELECT * FROM usuario where nombre = ? AND password = ? ";
//     const usuario=req.query.nombre;
//     const password=req.query.password;
//     // console.log(usuario);
//     // console.log(password);
//     console.log(usuario);
//     pool.query(sqlSelect, [usuario,usuario] ,(err,result) => {
//         res.send(result);
//     });
// });


// module.exports = router;

const controller = require("../controllers/controllerLogin");
const express = require('express');//voy a usar el modulo express
const router =express.Router();

router.get("/getUser",controller.getUser);

module.exports = router;