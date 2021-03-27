// Functionality systems
class modelTeacher {
    constructor(pool) {
        this.pool = pool;
    }

    //-------------------------------------------------GROUP------------------------------------------------------------------//
    /*Obtiene todos los grupos del profesor*/
    getGroups(group, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            }
            else {
                const sql = "SELECT * FROM grupo WHERE idprofesor= ? AND activo = 1";
                const valores = [group];
                connection.query(sql, valores, function (err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar los grupos del profesor."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Busca todos los estudiantes que contengan "clave" bien en su nombre o en su correo. Esta elección está pensada para elegirse desde un combobox.
    inviteStudentToGroup(grupo, id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'INSERT INTO grupoestudiante (idGrupo,idEstudiante) VALUES (?,?);';
                const valores = [grupo, id];
                connection.query(sql, valores, function (err, res) {
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
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'DELETE FROM grupoestudiante WHERE idGrupo = ? AND idEstudiante = ?;';
                const valores = [grupo, id];
                connection.query(sql, valores, function (err, res) {
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

    //-------------------------------------------------CHALLENGE------------------------------------------------------------------//

    /*Obtiene todas las categorias de los desafios*/
    getCategories(callback) {
        // const sqlSelect = "SELECT column_type FROM information_schema.columns WHERE table_name = 'desafio' AND column_name = 'categoria'";
        //const sqlSelect = "SELECT SUBSTRING(COLUMN_TYPE,5) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='escrituracreativa' AND TABLE_NAME='desafio' AND COLUMN_NAME='categoria'"; 
        const sqlSelect = "SELECT * FROM categoria";
        this.pool.query(sqlSelect, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene el desafio del profesor*/
    getChallenge(idChallenge, callback) {
        const sqlSelect = "SELECT * FROM desafio where id= ?";

        this.pool.query(sqlSelect, idChallenge, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene los desafios del profesor segun su grupo*/
    getChallenges(groupID, callback) {
        const sqlSelect = "SELECT * FROM desafio where idGrupo= ?";
        this.pool.query(sqlSelect, groupID, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Crea desafio del profesor */
    createChallenge(idGroup, title, description, qualification, category, type, date, callback) {
        const sqlInsert = "INSERT INTO desafio (idGrupo,titulo,descripcion,tipoCalificacion,idCategoria,colaborativo,fechaFin,activo)  VALUES (?,?,?,?,?,?,?,?)";
        this.pool.query(sqlInsert, [idGroup, title, description, qualification, category, type, date, 1], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Edita el desafio del profesor*/
    editChallenge(idChallenge, idGroup, title, description, qualification, category, type, date, callback) {
        //const sqlInsert = "INSERT INTO desafio (idGrupo,titulo,descripcion,imagen,idCategoria,colaborativo,fechaFin,activo) VALUES (?,?,?,?,?,?,?,?)";
        const sqlInsert = "UPDATE desafio SET idGrupo = ?,titulo = ?,descripcion = ?,tipoCalificacion = ?,idCategoria = ?,colaborativo = ?,fechaFin = ?,activo = ? WHERE id=?";
        this.pool.query(sqlInsert, [idGroup, title, description, qualification, category, type, date, 1, idChallenge], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene los ficheros multimedia del desafio del profesor*/
    getMultimedia(idChallenge, callback) {
        const sqlSelect = "SELECT * FROM multimediadesafio where idDesafio=?";
        this.pool.query(sqlSelect, [idChallenge], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Envia los ficheros multimedia del desafio del profesor*/
    sendMultimedia(values, callback) {
        const sqlInsert = "INSERT INTO multimediadesafio (idDesafio,ruta) VALUES ?";
        this.pool.query(sqlInsert, [values], (err, result) => {
            if (err) {
                callback(new Error("----------------ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Elimina el fichero multimedia del desafio*/
    deleteFile(idMultimedia, callback) {
        const sqlDelete = "DELETE FROM multimediadesafio WHERE id=?";
        this.pool.query(sqlDelete, idMultimedia, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Elimina/desactiva desafio*/
    deleteChallenge(idChallenge, callback) {
        const sqlUpdate = "UPDATE desafio SET activo =? WHERE id=?";


        this.pool.query(sqlUpdate, [0, idChallenge], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }
}

//Data export
module.exports = modelTeacher;