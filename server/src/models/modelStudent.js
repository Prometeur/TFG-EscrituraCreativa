// Functionality systems
class modelStudent {

    constructor(pool) {
        this.pool = pool;
    }

    /*Obtiene los grupos del estudiante*/
    getGroups(student, callback) {
        const sqlSelect = "SELECT grupoestudiante.idGrupo, grupoestudiante.idEstudiante, grupo.nombre, grupo.idProfesor "
            + "FROM grupoestudiante INNER JOIN grupo ON grupoestudiante.idGrupo = grupo.id WHERE grupoestudiante.idEstudiante=?";
        this.pool.query(sqlSelect, student, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene el equipo del estudiante*/
    getTeam(idStudent, callback) {
        const sqlSelect = "SELECT * FROM equipoestudiante where idEstudiante= ?";
        this.pool.query(sqlSelect, idStudent, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene el desafio del estudiante segun su grupo*/
    getChallenge(idChallenge, callback) {
        // const sqlSelect = "SELECT * FROM desafio where id= ?";
        const sqlSelect = "SELECT desafio.id,desafio.idGrupo,desafio.titulo,desafio.descripcion,desafio.tipoCalificacion,categoria.nombre,desafio.colaborativo,desafio.fechaIni,desafio.fechaFin, desafio.activo FROM desafio INNER JOIN categoria ON desafio.idCategoria = categoria.id WHERE desafio.id= ? ";
        this.pool.query(sqlSelect, idChallenge, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene los desafios del estudiante segun su grupo*/
    getChallenges(idGroup, callback) {
        const sqlSelect = "SELECT desafio.id,desafio.idGrupo,desafio.titulo,desafio.descripcion,desafio.tipoCalificacion,categoria.nombre,desafio.colaborativo,desafio.fechaIni,desafio.fechaFin, desafio.activo FROM desafio INNER JOIN categoria ON desafio.idCategoria = categoria.id WHERE desafio.idGrupo = ? ";
        this.pool.query(sqlSelect, idGroup, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene el escrito del estudiante segun su grupo*/
    getWriting(idWriting, callback) {
        const sqlSelect = "SELECT * FROM escrito where id= ?;";
        this.pool.query(sqlSelect, idWriting, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene los escritos del estudiante segun su grupo*/
    getWritings(idUser, idGroup, callback) {
        const sqlSelect = "SELECT * FROM escrito where idEscritor= ? AND idGrupo=?;";
        this.pool.query(sqlSelect, [idUser, idGroup], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Envio el escrito del estudiante */
    sendWriting(idGroup, desafio, idWriter, texto, type, callback) {
        const sqlInsert = "INSERT INTO escrito (idGrupo,idDesafio,idEscritor,texto,colaborativo,activo) VALUES (?,?,?,?,?,?)";
        this.pool.query(sqlInsert, [idGroup, desafio, idWriter, texto, type, 1], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Edito el escrito del estudiante */
    editWriting(idWriting, idGroup, idChallenge, idWriter, text, type, callback) {
        const sqlInsert = "UPDATE escrito SET idGrupo = ?,idDesafio = ?, idEscritor = ?, texto = ?, colaborativo = ? WHERE id=?";
        this.pool.query(sqlInsert, [idGroup, idChallenge, idWriter, text, type, idWriting], (err, result) => {
            if (err) {
                console.log("Error");
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }


    /*Obtiene los ficheros multimedia del escrito del estudiante*/
    getMultimedia(idChallenge, idWriter, callback) {
        const sqlSelect = "SELECT * FROM multimediaescrito where idEscritor= ? AND idDesafio=?";
        this.pool.query(sqlSelect, [idWriter, idChallenge], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene los ficheros multimedia del escrito del estudiante*/
    getMultimediaChallenge(idChallenge, callback) {
        const sqlSelect = "SELECT * FROM multimediadesafio where  idDesafio=?";
        this.pool.query(sqlSelect, idChallenge, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Envia los ficheros multimedia del escrito del estudiante*/
    sendMultimedia(reqFiles, callback) {
        const sqlInsert = "INSERT INTO multimediaescrito (idEscritor,idDesafio,ruta) VALUES ?";
        this.pool.query(sqlInsert, [reqFiles], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Elimina el fichero multimedia del desafio*/
    deleteFile(idMultimedia, callback) {
        const sqlDelete = "DELETE FROM multimediaescrito WHERE id=?";
        this.pool.query(sqlDelete, idMultimedia, (err, result) => {
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
module.exports = modelStudent;