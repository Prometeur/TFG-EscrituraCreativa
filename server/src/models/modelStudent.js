// Functionality systems
class modelStudent {
    constructor(pool) {
        this.pool = pool;
    }

    getGroupStudent(student, callback) {
        const sqlSelect = "SELECT * FROM grupoestudiante where idEstudiante= ?";
        this.pool.query(sqlSelect, student, (err, result) => {
            if(err){
                callback(new Error("Error modelStudent getGroupStudent"));     
            }
            else{
                callback(null, result);
            } 
        });
    }

    getChallenges(group, callback) {
        const sqlSelect = "SELECT * FROM desafio where idGrupo= ?";
        this.pool.query(sqlSelect, group, (err, result) => {
            if(err){
                callback(new Error("Error modelStudent getChallenges"));     
            }
            else{
                callback(null, result);
            }   
        });
    }

    getWritings(idUser,idGroup,callback) {
        const sqlSelect = "SELECT * FROM escrito where idEscritor= ? AND idGrupo=?;";
        this.pool.query(sqlSelect, [idUser,idGroup], (err, result) => {
            if(err){
                callback(new Error("Error modelStudent getWritings"));     
            }
            else{
                callback(null, result);
            }   
        });
    }


    getChallenge(challenge, callback) {
        const sqlSelect = "SELECT * FROM desafio where id= ?";
        this.pool.query(sqlSelect, challenge, (err, result) => {
            if(err){
                callback(new Error("Error modelStudent getChallenge"));     
            }
            else{
                callback(null, result);
            }   
        });

    }

    postWriting(desafio, escritor, texto, callback) {
        const sqlInsert = "INSERT INTO escrito (idDesafio,idEscritor,texto) VALUES (?,?,?)";
        this.pool.query(sqlInsert, [desafio, escritor, texto], (err, result) => {
            if(err){
                callback(new Error("Error modelStudent postWriting"));     
            }
            else{
                callback(null, result);
            }   
        });
    }
}

//Data export
module.exports = modelStudent;    