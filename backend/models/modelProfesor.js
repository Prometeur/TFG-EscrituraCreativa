"use strict";

class modelProfesor {
    constructor(pool) {
        this.pool = pool;
    }

    crearGrupo(idProfesor, nombre, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = "INSERT INTO grupo (idprofesor, nombre, activo) VALUES (?, ?, 1);";
                const valores = [idProfesor, nombre];
                connection.query(sql, valores, function(err, idProfesor) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al crear el grupo."));
                    } else {
                        callback(null, idProfesor.insertId);
                    }
                })
            }
        });
    }

    verificarInvitacion(idGrupo,idEstudiante, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = "SELECT * FROM grupoestudiante  WHERE idGrupo = ? AND idEstudiante = ?;";
                const valores = [idGrupo, idEstudiante];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al verificar la invitación."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    invitarAGrupo(idGrupo,idEstudiante, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = "INSERT INTO grupoestudiante (idGrupo, idEstudiante) VALUES (?, ?);";
                const valores = [idGrupo,idEstudiante];
                connection.query(sql, valores, function(err, idProfesor) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al añadir el estudiante al grupo."));
                    } else {
                        callback(null);
                    }
                })
            }
        });
    }

    eliminarGrupo(id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = "UPDATE grupo SET activo = 0 WHERE id = ?;"; //No borra el grupo, pone el activo a 0
                const valores = [id];
                connection.query(sql, valores, function(err) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al eliminar el grupo."));
                    } else {
                        callback(null);
                    }
                })
            }
        });
    }

}

module.exports =modelProfesor;