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

    //Busca todos los estudiantes que contengan "clave" bien en su nombre o en su correo. Esta elección está pensada para elegirse desde un combobox.
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

}



//Data export
module.exports = modelTeacher;  