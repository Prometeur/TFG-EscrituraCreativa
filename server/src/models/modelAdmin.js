// Functionality systems
class modelUser {
    constructor(pool) {
        this.pool = pool;
    }

    //Expulsa a un estudiante de un grupo.
    deactivateUser( id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'UPDATE  usuario SET activo = 0 WHERE id = ?;'; 
                const valores = [id];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al desactivar al usuario."));
                    } else {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Expulsa a un estudiante de un grupo.
    deleteUser( id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("No se puede conectar a la base de datos."))
            } else {
                const sql = 'DELETE FROM usuario WHERE id = ?;'; 
                const valores = [id];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error al eliminar al usuario."));
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