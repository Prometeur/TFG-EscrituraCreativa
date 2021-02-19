// Functionality systems
class modelTeacher {
    constructor(pool) {
        this.pool = pool;
    }

    /*Obtiene todos los desafios del grupo seleccionado del profesor*/
    getChallenges(group, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'SELECT * FROM desafio WHERE activo = 1 AND idGrupo = ?;';
                const valores = [group];
                connection.query(sql, valores, function (err, res) {
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

    createChallenge(title, description, group, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } else 
            {
                const sql = 'INSERT INTO desafio (titulo, descripcion,activo,idGrupo) VALUES (?,?,?,?) ;';
                const valores = [title,description,1,group];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al crear el desafío."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Invita a un estudiante a un grupo.
    inviteStudentToGroup(grupo, id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'INSERT INTO grupoestudiante (idGrupo,idEstudiante) VALUES (?,?);'; 
                const valores = [grupo, id];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al invitar al estudiante al grupo."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Expulsa a un estudiante de un grupo.
    kickStudentFromGroup(grupo, id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'DELETE FROM grupoestudiante WHERE idGrupo = ? AND idEstudiante = ?;'; 
                const valores = [grupo, id];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al expulsar al estudiante del grupo."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Crea un grupo nuevo.
    createGroup(nombre, id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'INSERT INTO grupo (nombre, idprofesor, activo) VALUES (?,?,1);'; 
                const valores = [nombre, id];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al invitar al estudiante al grupo."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

}



//Data export
module.exports = modelTeacher;  