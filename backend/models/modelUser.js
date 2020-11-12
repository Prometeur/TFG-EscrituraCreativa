/*
* Name_file : modelUser
* Descripcion: Archivo de operaciones de la base de datos para las funciones que comparten todos los usuarios.
* parameters:
    @pool
*/


/*--------------------------------------------------*/
// Dependencies
"use strict";


/*--------------------------------------------------*/
// Functionality systems
class modelUser {
    constructor(pool) {
        this.pool = pool;
    }

    getUsersByGroup(idGrupo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "SELECT * FROM usuario INNER JOIN grupoestudiante ON usuario.id = grupoestudiante.idEstudiante WHERE grupoestudiante.idGrupo = ?;";
                const valores = [idGrupo];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar usuarios en el grupo " + idGrupo + "."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    getStudentsByTeam(idEquipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "SELECT id,  nombre, apellidos, foto FROM usuario INNER JOIN equipoestudiante ON usuario.id = equipoestudiante.idEstudiante WHERE equipoestudiante.idEquipo = ?;";
                const valores = [idEquipo];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar usuarios en el grupo " + idGrupo + "."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    getStudents(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } else 
            {
                const sql = 'SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 1 AND rol = "S";';
                const valores = [];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar estudiantes."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    getProfesores(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = 'SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 1 AND rol = "T";';
                const valores = [];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar profesores."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Busca todos los estudiantes que contengan "clave" bien en su nombre o en su correo. Esta elección está pensada para elegirse desde un combobox.
    searchStudent(clave, tipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                let consulta = 'SELECT * FROM usuario WHERE nombre LIKE ? AND rol = "S" AND activo = 1;';
                if(tipo == "email"){
                    consulta = 'SELECT * FROM usuario WHERE email LIKE ? AND rol = "S" AND activo = 1;';
                }
                const sql = consulta; 
                const valores = [ "%" + clave + "%"];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar usuarios con " + tipo + " similar a " + clave + "."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Busca todos los estudiantes que contengan "clave" bien en su nombre o en su correo. Esta elección está pensada para elegirse desde un combobox.
    searchStudent(clave, tipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                let consulta = 'SELECT id, nombre, apellidos, foto, correo FROM usuario WHERE nombre LIKE ? AND rol = "S" AND activo = 1;';
                if(tipo == "email"){
                    consulta = 'SELECT id, nombre, apellidos, foto, correo FROM usuario WHERE email LIKE ? AND rol = "S" AND activo = 1;';
                }
                const sql = consulta; 
                const valores = [ "%" + clave + "%"];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar esudiantes con " + tipo + " similar a " + clave + "."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }


    //Busca todos los profesores que contengan "clave" bien en su nombre o en su correo. Esta elección está pensada para elegirse desde un combobox.
    searchTeacher(clave, tipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                let consulta = 'SELECT id, nombre, apellidos, foto, correo FROM usuario WHERE nombre LIKE ? AND rol = "T" AND activo = 1;';
                if(tipo == "email"){
                    consulta = 'SELECT id, nombre, apellidos, foto, correo FROM usuario WHERE email LIKE ? AND rol = "T" AND activo = 1;';
                }
                const sql = consulta; 
                const valores = [ "%" + clave + "%"];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar profesores con " + tipo + " similar a " + clave + "."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Obtiene los datos del usuario al que pertenece el id.
    getUser(id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = 'SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 1 AND id = ?;';
                const valores = [id];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al obtener el usuario."));
                    } else {
                        callback(null, res[0]);
                    }
                })
            }
        });
    }


}

/*---------------------------------------------------------*/
//Data export
module.exports =modelUser;