/*
* Name_file : modelTeacher
* Descripcion: Archivo de operaciones de la base de datos para las funciones que son exclusivas a los profesores.
* parameters:
    @pool
*/


/*--------------------------------------------------*/
// Dependencies
"use strict";


/*--------------------------------------------------*/
// Functionality systems

class modelTeacher {
    constructor(pool) {
        this.pool = pool;
    }

    createGroup(idProfesor, nombre, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "INSERT INTO grupo (idprofesor, nombre, activo) VALUES (?, ?, 1);";
                const valores = [idProfesor, nombre];
                connection.query(sql, valores, function(err, idProfesor) {
                    connection.release();
                    if (err) 
                    {
                        callback(new Error("Error al crear el grupo."));
                    } 
                    else 
                    {
                        callback(null, idProfesor.insertId);
                    }
                })
            }
        });
    }

    verifyInvitationToGroup(idGrupo,idEstudiante, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "SELECT * FROM grupoestudiante  WHERE idGrupo = ? AND idEstudiante = ?;";
                const valores = [idGrupo, idEstudiante];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) 
                    {
                        callback(new Error("Error al verificar la invitación."));
                    } 
                    else 
                    {
                        callback(null, res);
                    }
                })
            }
        });
    }

    inviteToGroup(idGrupo,idEstudiante, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
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

    deleteGroup(id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "UPDATE grupo SET activo = 0 WHERE id = ?;"; //No borra el grupo, pone el activo a 0
                const valores = [id];
                connection.query(sql, valores, function(err) {
                    connection.release();
                    if (err) 
                    {
                        callback(new Error("Error al eliminar el grupo."));
                    } 
                    else 
                    {
                        callback(null);
                    }
                })
            }
        });
    }

    //Elimina la relación entre el estudiante y el grupo elegidos
    kickFromGroup(idGrupo,idEstudiante, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "DELETE FROM grupoestudiante WHERE idGrupo = ? AND idEstudiante =?;";
                const valores = [idGrupo,idEstudiante];
                connection.query(sql, valores, function(err, idProfesor) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al sacar el estudiante del grupo."));
                    } else {
                        callback(null);
                    }
                })
            }
        });
    }

    //Obtiene a todos los estudiantes no aceptados. (Activo = 0)
    getStudentRequests(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } else 
            {
                const sql = 'SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 0 AND rol = "S";';
                const valores = [idGrupo];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar solicitudes de estudiantes."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Cambia a 1 el valor de activo del estudiante elegudo.
    //En la sentencia se verifica si el estudiante estaba activo o no y dará error si se intenta activar un estudiante ya activo.
    acceptStudent(id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "UPDATE usuario SET activo = 1 WHERE id = ? AND activo = 0;"; //Activa el estudiante colocando su activo a 1
                const valores = [id];
                connection.query(sql, valores, function(err) {
                    connection.release();
                    if (err) 
                    {
                        callback(new Error("Error al aceptar al estudiante."));
                    } 
                    else 
                    {
                        callback(null);
                    }
                })
            }
        });
    }

    //Obtiene a todos los desafíos del grupo indicado.
    getStudentRequests(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } else 
            {
                const sql = 'SELECT * FROM desafio WHERE activo = 1 AND idGrupo = ?;';
                const valores = [idGrupo];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar los desafíos del grupo."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Obtiene a todos los escritos para el desafío indicado.
    showPapersOfChallenge(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } else 
            {
                const sql = 'SELECT * FROM escrito WHERE activo = 1 AND idDesafio = ?;';
                const valores = [idGrupo];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar los escritos del desafío."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }


}


/*---------------------------------------------------------*/
//Data export
module.exports =modelTeacher;