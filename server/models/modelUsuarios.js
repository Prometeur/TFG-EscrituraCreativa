"use strict";

class modelUsuario {
    constructor(pool) {
        this.pool = pool;
    }

    getUsuariosByGrupo(idGrupo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
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

    getEstudiantesByEquipo(idEquipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
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

    getEstudiantes(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 1 AND rol = "E";';
                const valores = [idGrupo];
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
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 1 AND rol = "P";';
                const valores = [idGrupo];
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

module.exports =modelUsuario;