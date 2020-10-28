//aqui va ir la conexion a mysql

const mysql = require('mysql');//defino el modulo que voy a usar

//requiero desde el archivo keys algunos parametros
//como no quiero traer todo el objeto keys, solo quiero
//traer el objeto database
const {database} = require('./keys');


//para usar la conexion usamos createPool en vez createConnection, pq es mas cercano a un nivel de produccion
//createPool tiene varios hilos, cada uno va haciendo una tarea en secuencia
const pool=mysql.createPool(database);

//existe un modulo de nodejs, que permite convertir codigo callback a codigo de promesas
const {promisify}= require('util');



//utilizo la conexion creada
pool.getConnection((err,connection) =>{
    if(err){
        // if(err.code ==='PROTOCOL_CONNECTION_LOST'){
        //     console.error('DATABASE CONNECTION WAS CLOSED');
        // }
        // if(err.code ==='ER_CON_COUNT_ERROR'){
        //     console.error('DATABASE HAS TO MANY CONNECTIONS');
        // }
        // if(err.code ==='ECONNREFUSED'){
        //     console.error('DATABASE CONNECTION WAS REFUSED');
        // }
        throw err;
    }
    else{
        console.log('conexion exitosa');
        connection.release();//empieza la conexion
    }
    
    // if(connection)
    //  connection.release();//empieza la conexion
    // console.log('DB is Connected');
return;

});//uso la conexion

// pool.query('SELECT * FROM usuario',function(error,results,fields){
//     if(error)
//         throw error;

//         results.forEach(results => {
//             console.log(results);
//         });
// })

//al hacer la consulta de la bd, puedo usar 'promesas'
//la consulta lo puedo convertir a 'promesas'
pool.query = promisify(pool.query);

//quiero exportar la conexion,solo quiero exportar pool
module.exports = pool;