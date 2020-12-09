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
    create(username, surname, email, password, callback) {

        this.pool.getConnection(function(err, connection) {
           
            if(err)
            {
                callback(new Error("No se puede conectar a la base de datos."))
            }
            else
            {
                const sql = "INSERT INTO usuario (correo, password,nombre,apellidos,activo,rol) values (?,?,?,?,?,?)";
                const valores = [email,password,username,surname,1,"E"];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) 
                    {
                        callback(new Error("Error al crear el desafío."));
                    } 
                    else
                    {
                        return callback(null, res[0]);
                    }
                })
            }
        });
    }
    
    findOneEmail (username, callback) {
       
        this.pool.getConnection(function(err, connection) {
           
            if(err)
            {
                callback(new Error("No se puede conectar a la base de datos."))
            }
            else
            {  
               
                const sql = "SELECT * FROM usuario where correo = ?;";
                const valores = [username];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) 
                    {
                        callback(new Error("Error al buscar usuarios en el grupo " + username + "."));
                    } 
                    else 
                    {
                      return callback(null,res[0]);
                      
                    }
                })
            }

        });
    }
}

//Data export
module.exports = modelUser;  