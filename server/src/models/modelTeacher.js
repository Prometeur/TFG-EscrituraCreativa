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
                        callback(new Error("Error al crear el grupo."));
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
        // const sqlSelect = "SELECT * FROM desafio where id= ?";
        const sqlSelect = "SELECT categoria.nombre,desafio.id,desafio.idGrupo,desafio.titulo,desafio.descripcion,desafio.tipoCalificacion,desafio.idCategoria,desafio.colaborativo,desafio.fechaIni,desafio.fechaFin, desafio.activo FROM desafio INNER JOIN categoria ON desafio.idCategoria = categoria.id WHERE desafio.id= ? ";

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

    //-------------------------------------------------MULTIMEDIA CHALLENGE------------------------------------------------------------------//

    /*Obtiene los ficheros multimedia del desafio del profesor*/
    getMultimediaChallenge(idChallenge, callback) {
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
    sendMultimediaChallenge(values, callback) {
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

    //-------------------------------------------------WRITING--------------------------------------------------------------------//

    /*Edito el escrito del estudiante */
    editWriting(idWriting, idGroup, idChallenge, idWriter, title, text,score,commentary,type,finish, callback) {
        const sqlInsert = "UPDATE escrito SET idGrupo = ?,idDesafio = ?, idEscritor = ?, nombre=?,texto = ?,puntuacion=?,comentario=? ,colaborativo = ? ,finalizado=? WHERE id=?";
        this.pool.query(sqlInsert, [idGroup, idChallenge, idWriter, title, text,score,commentary,type,finish, idWriting], (err, result) => {
            if (err) {
                console.log("Error");
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene todos los escritos individuales dado un grupo y un desafio segun su grupo*/
    getWritingsStudent(idGroup, idChallenge, callback) {
        const sqlSelect = "SELECT c.id as idDesafio, c.titulo as nombreDesafio, u.id as idEstudiante, u.nombre as nombreEstudiante, u.apellidos as apellidosEstudiante, w.id as idEscrito, w.idGrupo, w.idEscritor, w.nombre as nombreEscrito,w.texto ,w.puntuacion,w.comentario,w.colaborativo,w.finalizado,w.fecha,w.activo FROM escrito as w INNER JOIN desafio as c ON w.idDesafio = c.id INNER JOIN usuario as u ON w.idEscritor=u.id where w.idGrupo= ? AND w.idDesafio=? ;";

        this.pool.query(sqlSelect, [idGroup, idChallenge], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }
      /*Obtiene todos los escritos colaborativos dado un grupo y un desafio segun su grupo*/
      getWritingsTeam(idGroup, idChallenge, callback) {
        const sqlSelect = "SELECT c.id as idDesafio, c.titulo as nombreDesafio, t.id as idEquipo, t.nombre as nombreEquipo, w.id as idEscrito, w.idGrupo, w.idEscritor, w.nombre as nombreEscrito,w.texto ,w.puntuacion,w.comentario,w.colaborativo,w.finalizado,w.fecha,w.activo FROM escrito as w INNER JOIN desafio as c ON w.idDesafio = c.id INNER JOIN equipo as t ON w.idEscritor=t.id where w.idGrupo= ? AND w.idDesafio=? ;";

        this.pool.query(sqlSelect, [idGroup, idChallenge], (err, result) => {
            if (err) {
                callback(new Error("----ERROR SQL----\n" + err.sql + "\n" + err.sqlMessage));
            }
            else {
                callback(null, result);
            }
        });
    }

    /*Obtiene el escrito del estudiante segun su grupo */
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

    //----------------------------------------------MULTIMEDIA WRITING------------------------------------------------------------------//

    /*Obtiene los ficheros multimedia del escrito del estudiante*/
    getMultimediaWriting(idChallenge, idWriter, callback) {
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
    //-------------------------------------------------TEAM--------------------------------------------------------------------//

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


    //Busca todos los estudiantes solicitantes (aún no aprobados) que contengan "clave" bien en su nombre o en su correo. 
    searchApplicant(clave, tipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                let consulta = 'SELECT id, nombre, apellidos, foto, correo FROM usuario WHERE (nombre LIKE ? OR apellidos LIKE ?) AND activo = 0;';
                if(tipo == "email"){
                    consulta = 'SELECT id, nombre, apellidos, foto, correo FROM usuario WHERE correo LIKE ? AND rol = "S" AND activo = 0;';
                }
                const sql = consulta; 
                const valores = [ "%" + clave + "%", "%" + clave + "%"];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar solicitudes con " + tipo + " similar a " + clave + "."));
                    } else {
                        callback(null, res);
                    }
                })
               }
        });
    }



    /*Obtiene los datos de perfil del alumno*/
    acceptApplicant(idUser, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "UPDATE usuario SET activo = 1 WHERE id =  ?";
                const valores = [idUser];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al aceptar al solicitante."));
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