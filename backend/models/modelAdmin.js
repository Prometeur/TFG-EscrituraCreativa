"use strict";

class modelAdmin {
    constructor(pool) {
        this.pool = pool;
    }

    getUsuarios(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = "SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 1;";
                const valores = [idGrupo];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar usuarios."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    getAdministradores(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 1 AND rol = "A";';
                const valores = [idGrupo];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar administradores."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    getSolicitudes(callback) {//Busca a todos los profesores que aún no han sido aceptados (activo a 0)
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 0 AND rol = "P";';
                const valores = [idGrupo];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar solicitudes."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }
    
}

module.exports =modelAdmin;