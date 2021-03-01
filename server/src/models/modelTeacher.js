// Functionality systems
class modelTeacher {

    constructor(pool) {
        this.pool = pool;
    }

    /*Obtiene todos los grupos del profesor*/
    getGroups(idTeacher, callback) {
        const sqlSelect = "SELECT * FROM grupo where idprofesor= ?";
        this.pool.query(sqlSelect, idTeacher, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

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

    /*Obtiene el desafio del profesor segun su grupo*/
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
                // console.log("------>Esto deberia estar genial--->",result.insertId);
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
    sendMultimedia(idChallenge, path, callback) {
        const sqlInsert = "INSERT INTO multimediadesafio (idDesafio,ruta) VALUES (?,?)";
        this.pool.query(sqlInsert, [idChallenge, path], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Edita los ficheros multimedia del escrito del estudiante*/
    editMultimedia(idMultimedia, path, callback) {
        const sqlUpdate = "UPDATE multimediadesafio SET ruta = ? WHERE id=?";
        this.pool.query(sqlUpdate, [path, idMultimedia], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
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
}

//Data export
module.exports = modelTeacher;  