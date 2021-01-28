// Functionality systems
class modelUser {
    constructor(pool) {
        this.pool = pool;
    }


    /*Obtiene todos los grupos del profesor*/
    getGroups(group, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "SELECT * FROM grupo where idprofesor= ?";
                const valores = [group];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar usuarios en el grupo " + group + "."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Busca todos los estudiantes que contengan "clave" bien en su nombre o en su correo. Esta elección está pensada para elegirse desde un combobox.
    searchStudent(clave, tipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                let consulta = 'SELECT id, nombre, apellidos, foto, correo FROM usuario WHERE (nombre LIKE ? OR apellidos LIKE ?)AND rol = "S" AND activo = 1;';
                if(tipo == "email"){
                    consulta = 'SELECT id, nombre, apellidos, foto, correo FROM usuario WHERE correo LIKE ? AND rol = "S" AND activo = 1;';
                }
                const sql = consulta; 
                const valores = [ "%" + clave + "%", "%" + clave + "%"];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar esudiantes con " + tipo + " similar a " + clave + "."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Busca todos los estudiantes solicitantes (aún no aprobados) que contengan "clave" bien en su nombre o en su correo. 
    searchApplicant(clave, tipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                let consulta = 'SELECT id, nombre, apellidos, foto, correo FROM usuario WHERE (nombre LIKE ? OR apellidos LIKE ?)AND rol = "S" AND activo = 0;';
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

         /*Obtiene los datos de perfil del alumno*/
     getProfile(idUser, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "SELECT id, nombre, apellidos, foto, correo, activo FROM usuario where id =  ?";
                const valores = [idUser];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar al usuario."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    getStudentOfGroup(idGrupo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = 'SELECT id, nombre, apellidos, foto, correo FROM usuario INNER JOIN grupoestudiante ON usuario.id = grupoestudiante.idEstudiante WHERE usuario.rol = "S" AND grupoestudiante.idGrupo = ?;';
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

     /*Obtiene los datos de perfil del alumno*/
     getProfile(idUser, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "SELECT id, nombre, apellidos, foto, correo, activo FROM usuario where id =  ?";
                const valores = [idUser];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al buscar al usuario."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    /*Obtiene los datos de perfil del alumno*/
    deleteChallenge(id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "UPDATE desafio SET activo = 0 WHERE id =  ?";
                const valores = [id];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al eliminar el desafío."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }
    
}

//Data export
module.exports = modelUser;  