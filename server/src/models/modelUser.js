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
}

//Data export
module.exports = modelUser;  