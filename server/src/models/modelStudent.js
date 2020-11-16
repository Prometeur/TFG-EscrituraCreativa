// Functionality systems
class modelStudent {
    constructor(pool) {
        this.pool = pool;
    }

    getGroupStudent(student, callback) {
        const sqlSelect = "SELECT * FROM grupoestudiante where idEstudiante= ?";
        this.pool.query(sqlSelect, student, (err, result) => {
            console.log(err);
            callback(null, result);
        });

    }

    getChallenges(group, callback) {
        const sqlSelect = "SELECT * FROM desafio where idGrupo= ?";
        this.pool.query(sqlSelect, group, (err, result) => {
            console.log(err);
            callback(null, result);
        });

    }

    getChallenge(challenge, callback) {
        const sqlSelect = "SELECT * FROM desafio where id= ?";
        this.pool.query(sqlSelect, challenge, (err, result) => {
            console.log(err);
            callback(null, result);
        });

    }

    postWriting(desafio, escritor, texto, callback) {
        const sqlInsert = "INSERT INTO escrito (idDesafio,idEscritor,texto) VALUES (?,?,?)";
        this.pool.query(sqlInsert, [desafio, escritor, texto], (err, result) => {
            console.log(err);
            callback(null, result);
        });

    }
}

//Data export
module.exports = modelStudent;    