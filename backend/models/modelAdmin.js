/*
* Name_file : modelAdmin
* Descripcion: Archivo de operaciones de la base de datos para las funciones exclusivas de los administradores.
* parameters:
    @pool
*/


/*--------------------------------------------------*/
// Dependencies
"use strict";

/*--------------------------------------------------*/
// Functionality systems
class modelAdmin {
    constructor(pool) {
        this.pool = pool;
    }
    
    //Devuelve a todos los usuarios de todos los tipos que hayan sido aceptados (activo a 1)
    getUsers(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = "SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 1;";
                const valores = [idGrupo];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) 
                    {
                        callback(new Error("Error al buscar usuarios."));
                    } 
                    else 
                    {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Devuelve todos los usuarios que sean administradores.
    getAdmins(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = 'SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 1 AND rol = "A";';
                const valores = [idGrupo];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) 
                    {
                        callback(new Error("Error al buscar administradores."));
                    } 
                    else 
                    {
                        callback(null, res);
                    }
                })
            }
        });
    }

    //Busca a todos los profesores que aún no han sido aceptados (activo a 0)
    getRequests(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) 
            {
                callback(new Error("No se puede conectar a la base de datos."))
            } 
            else 
            {
                const sql = 'SELECT id,  nombre, apellidos, foto, correo FROM usuario WHERE activo = 0 AND rol = "T";';
                const valores = [idGrupo];
                connection.query(sql, valores, function(err, res) {
                    connection.release();
                    if (err) 
                    {
                        callback(new Error("Error al buscar solicitudes."));
                    } 
                    else 
                    {
                        callback(null, res);
                    }
                })
            }
        });
    }
    
}


/*---------------------------------------------------------*/
//Data export
module.exports =modelAdmin;