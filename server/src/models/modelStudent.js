// Functionality systems
class modelStudent {

    constructor(pool) {
        this.pool = pool;
    }

    /*Obtiene los grupos del estudiante*/
    getGroups(student, callback) {
        const sqlSelect = "SELECT grupoestudiante.idGrupo, grupoestudiante.idEstudiante, grupo.nombre, grupo.idProfesor FROM grupoestudiante INNER JOIN grupo ON grupoestudiante.idGrupo = grupo.id WHERE grupoestudiante.idEstudiante=?";
        this.pool.query(sqlSelect, student, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

//-----------------------------------------------------CHALLENGE----------------------------------------------------------------//

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

    /*Obtiene los ficheros multimedia del desafio*/
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

//-----------------------------------------------WRITING----------------------------------------------------------------//

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

       /*Obtiene el escrito del estudiante segun su grupo*/
       getWritingWriter(idGroup,idChallenge,idWriter, callback) {
        const sqlSelect = "SELECT * FROM escrito where idGrupo= ? AND idDesafio=? AND idEscritor=?;";
        this.pool.query(sqlSelect, [idGroup,idChallenge,idWriter], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene los escritos del estudiante*/
    getWritingsStudent(idStudent, idGroup, callback) {
        const sqlSelect = "SELECT u.nombre ,u.apellidos, c.titulo as nombreDesafio, w.id,w.idGrupo,w.idDesafio,w.idEscritor,w.puntuacion,w.comentario,w.colaborativo,w.finalizado,w.fecha,w.activo FROM escrito as w INNER JOIN usuario as u ON w.idEscritor= u.id INNER JOIN desafio as c ON w.idDesafio= c.id where w.idEscritor= ? AND w.idGrupo=?;";
        this.pool.query(sqlSelect, [idStudent, idGroup], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene los escritos del equipo*/
    getWritingsTeam(idTeam, idGroup, callback) {
        const sqlSelect = "SELECT t.nombre as nombreEquipo, c.titulo as nombreDesafio, w.id,w.idGrupo,w.idDesafio,w.idEscritor,w.puntuacion,w.comentario,w.colaborativo,w.finalizado,w.fecha,w.activo FROM escrito as w INNER JOIN equipo as t ON w.idEscritor= t.id INNER JOIN desafio as c ON w.idDesafio= c.id where w.idEscritor= ? AND w.idGrupo=?;";
        this.pool.query(sqlSelect, [idTeam, idGroup], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Envio el escrito del estudiante */
    sendWriting(idGroup, desafio, idWriter, title,texto, type, callback) {
        const sqlInsert = "INSERT INTO escrito (idGrupo,idDesafio,idEscritor,nombre,texto,colaborativo,activo) VALUES (?,?,?,?,?,?,?)";
        this.pool.query(sqlInsert, [idGroup, desafio, idWriter, title,texto, type, 1], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Edito el escrito del estudiante */
    editWriting(idWriting, idGroup, idChallenge, idWriter, title,text, type, callback) {
        const sqlInsert = "UPDATE escrito SET idGrupo = ?,idDesafio = ?, idEscritor = ?, nombre=?,texto = ?, colaborativo = ? WHERE id=?";
        this.pool.query(sqlInsert, [idGroup, idChallenge, idWriter,title, text, type, idWriting], (err, result) => {
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

    /*Elimina el fichero multimedia del escrito*/
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

//-------------------------------------------------TEAM------------------------------------------------------------------//
    /*Obtiene todos los equipos del estudiante*/
    getTeams(idStudent, callback) {
        // const sqlSelect = "SELECT * FROM equipoestudiante INNER JOIN equipo ON equipoestudiante.idEquipo = equipo.id INNER JOIN grupo ON equipo.idGrupo = grupo.id where idEstudiante= ?";

        const sqlSelect = "SELECT ts.idEquipo as idEquipo,t.nombre as nombreEquipo , g.nombre as nombreGrupo FROM equipoestudiante AS ts INNER JOIN equipo AS t ON ts.idEquipo = t.id INNER JOIN grupo AS g ON t.idGrupo = g.id where ts.idEstudiante= ?";
        this.pool.query(sqlSelect, idStudent, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene el equipo del remitente*/
    getTeam(idSender, callback) {
        const sqlSelect = "SELECT * FROM equipo WHERE idCreador = ?";
        this.pool.query(sqlSelect, idSender, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }


    /*Obtiene los equipos del grupo*/
    getTeamsGroup(idGroup, callback) {
        const sqlSelect = "SELECT t.id as idEquipo, t.nombre as nombreEquipo, t.idCreador as idCreador, t.idGrupo as idGrupo,g.idprofesor as idProfesor ,g.nombre as nombreGrupo FROM equipo as t INNER JOIN grupo as g ON t.idGrupo=g.id  WHERE t.idGrupo = ?";
        this.pool.query(sqlSelect, idGroup, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
    getTeamStudentGroup(idStudent, idGroup, callback) {
        // const sqlSelect = "SELECT t.id as idEquipo, t.nombre as nombreEquipo, t.idCreador as idCreador, t.idGrupo as idGrupo,g.idprofesor as idProfesor ,g.nombre as nombreGrupo FROM equipo as t INNER JOIN grupo as g ON t.idGrupo=g.id  WHERE t.idGrupo = ?";
        const sqlSelect = "SELECT t.id as idEquipo,t.nombre as nombreEquipo, t.idCreador as idCreador, ts.idEstudiante as idEstudiante, g.id as idGrupo, g.nombre as nombreGrupo  FROM equipoestudiante as ts INNER JOIN equipo as t ON ts.idEquipo= t.id INNER JOIN grupo as g ON t.idGrupo=g.id WHERE ts.idEstudiante=? AND t.idGrupo=? ";
        this.pool.query(sqlSelect, [idStudent, idGroup], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }


    /*Obtengo la tabla entera de equipoestudiante*/
    getTeamStudent(callback) {
        const sqlSelect = "SELECT ts.id as id, ts.idEquipo as idEquipo, ts.idEstudiante as idEstudiante, u.nombre as nombre,u.apellidos, u.correo as correo FROM equipoestudiante as ts INNER JOIN usuario as u ON ts.idEstudiante=u.id";
        this.pool.query(sqlSelect, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Se une a un equipo el estudiante*/
    joinTeam(idTeam, idStudent, callback) {
        //const sqlInsert = "INSERT INTO escrito (idGrupo,idDesafio,idEscritor,texto,colaborativo,activo) VALUES (?,?,?,?,?,?)";
        const sqlInsert = "INSERT INTO equipoestudiante (idEquipo,idEstudiante) VALUES (?,?) ";
        this.pool.query(sqlInsert, [idTeam, idStudent], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }
    /*Envia mensaje de un usuario*/
    createTeam(idCreator, idGroup, teamName, callback) {
        const sqlInsert = "INSERT INTO equipo (nombre,idCreador,idGrupo,activo) VALUES (?,?,?,?)";
        this.pool.query(sqlInsert, [teamName, idCreator, idGroup, 1], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Envia mensaje de un usuario*/
    editTeam(idTeam, name, idCreator, idGroup, callback) {

        const sqlUpdate = "UPDATE equipo SET nombre = ?,activo=?,idCreador=?,idGrupo=? WHERE id=? ";
        this.pool.query(sqlUpdate, [name, 1, idCreator, idGroup, idTeam], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Elimina un equipo*/
    deleteTeam(idTeam, callback) {
        const sqlDelete = "DELETE FROM equipo WHERE id=?  ";
        this.pool.query(sqlDelete, idTeam, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Agrega un estudiante a un equipo*/
    addStudentTeam(idTeam, idStudent, callback) {
        const sqlInsert = "INSERT INTO equipoestudiante (idEquipo,idEstudiante) VALUES (?,?)";
        this.pool.query(sqlInsert, [idTeam, idStudent], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Elimina un estudiante de un equipo*/
    leaveStudentTeam(idTeam, idStudent, callback) {
        //  const sqlDelete = "DELETE FROM multimediaescrito WHERE id=?";
        const sqlDelete = "DELETE FROM equipoestudiante WHERE idEquipo=? and idEstudiante=? ";
        this.pool.query(sqlDelete, [idTeam, idStudent], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    //Obtiene estudiantes sin equipos del grupo
    getStudentWithoutTeam(idGroup, callback) {
        // var rol="S";
        // const sqlSelect = "SELECT desafio.id,desafio.idGrupo,desafio.titulo,desafio.descripcion,desafio.tipoCalificacion,categoria.nombre,desafio.colaborativo,desafio.fechaIni,desafio.fechaFin, desafio.activo FROM desafio INNER JOIN categoria ON desafio.idCategoria = categoria.id WHERE desafio.idGrupo = ? ";
        //  const sqlSelect = "SELECT * from equipoestudiante as ts INNER JOIN usuario as u ON ts.idEstudiante <> u.id AND u.rol = ?   ";
        const sqlSelect = "SELECT u.id, u.nombre,u.apellidos  from usuario as u INNER JOIN grupoestudiante as gs ON u.id=gs.idEstudiante WHERE gs.idGrupo = ?  AND NOT EXISTS (SELECT * FROM equipoestudiante as ts INNER JOIN equipo as t ON ts.idEquipo = t.id WHERE ts.idEStudiante = u.id AND t.idGrupo = ?)";
        // this.pool.query(sqlSelect, [rol,idGroup], (err, result) => {
        this.pool.query(sqlSelect, [idGroup, idGroup], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene los integrantes de un equipo */
    getMembersTeam(idTeam, callback) {

        // const sqlSelect = "SELECT desafio.id,desafio.idGrupo,desafio.titulo,desafio.descripcion,desafio.tipoCalificacion,categoria.nombre,desafio.colaborativo,desafio.fechaIni,desafio.fechaFin, desafio.activo FROM desafio INNER JOIN categoria ON desafio.idCategoria = categoria.id WHERE desafio.idGrupo = ? ";
        // const sqlSelect = "SELECT * from equipoestudiante as ts INNER JOIN usuario as u ON ts.idEstudiante <> u.id AND u.rol = ?  INNER JOIN grupoestudiante as gs ON gs.idEstudiante = u.id WHERE gs.idGrupo=? ";
        const sqlSelect = "SELECT ts.idEquipo, ts.idEstudiante ,u.nombre as nombreEstudiante, u.apellidos as apellidoEstudiante from equipoestudiante as ts INNER JOIN usuario as u ON ts.idEstudiante = u.id WHERE ts.idEquipo =?   ";
        // this.pool.query(sqlSelect, [rol,idGroup], (err, result) => {
        this.pool.query(sqlSelect, idTeam, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

//----------------------------------------------MESSAGE----------------------------------------------------------------//

    /*Obtiene los mensajes del estudiante*/
    getMessages(idStudent, callback) {
        // const sqlSelect = "SELECT * FROM equipoestudiante INNER JOIN equipo ON equipoestudiante.idEquipo = equipo.id INNER JOIN grupo ON equipo.idGrupo = grupo.id where idEstudiante= ?";
        const sqlSelect = "SELECT m.id,u.nombre as nombreEmisor, u.correo ,m.mensaje, m.fecha FROM mensajeria AS m INNER JOIN usuario AS u ON  m.idEmisor = u.id WHERE m.idReceptor = ? AND m.activo=1";
        this.pool.query(sqlSelect, idStudent, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene los mensajes del estudiante*/
    getMessage(idMessage, callback) {
        // const sqlSelect = "SELECT m.id as id, m.idEmisor as idEmisor, m.mensaje as mensaje, u.nombre as nombreEmisor FROM mensajeria AS m INNER JOIN usuario AS u ON m.idEmisor = u.id WHERE m.id = ? ";
        const sqlSelect = "SELECT * FROM mensajeria WHERE id = ? ";
        this.pool.query(sqlSelect, idMessage, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*cambia el tipo de mensaje*/
    editMessage(idMessage, callback) {
        //   const sqlInsert = "UPDATE escrito SET idGrupo = ?,idDesafio = ?, idEscritor = ?, texto = ?, colaborativo = ? WHERE id=?";

        const sqlUpdate = "UPDATE mensajeria SET tipo = 0 WHERE id=? ";
        this.pool.query(sqlUpdate, idMessage, (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Envia mensaje de un usuario*/
    sendMessage(idSender, idReceiver, idCreator, message, type, callback) {
        const sqlInsert = "INSERT INTO mensajeria (idEmisor,idReceptor, idCreador,mensaje,tipo,activo) VALUES (?,?,?,?,?,?)";
        this.pool.query(sqlInsert, [idSender, idReceiver, idCreator, message, type, 1], (err, result) => {
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