// Functionality systems
class modelTeacher {
   
    constructor(pool) {

        this.pool = pool;
    }

  
        /*Obtiene todos los grupos del profesor*/
    getGroups(idTeacher, callback) {
        const sqlSelect = "SELECT * FROM grupo where idprofesor= ?";
        this.pool.query(sqlSelect, idTeacher, (err, result) => {
            if(err){
                callback(new Error("Error modelTeacher getGroups"));     
            }
            else{
                callback(null, result);
            }   
        });
    }
    
     /*Obtiene todos los grupos del profesor*/
     getCategories(callback) {
        
        // const sqlSelect = "SELECT column_type FROM information_schema.columns WHERE table_name = 'desafio' AND column_name = 'categoria'";
        //const sqlSelect = "SELECT SUBSTRING(COLUMN_TYPE,5) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='escrituracreativa' AND TABLE_NAME='desafio' AND COLUMN_NAME='categoria'"; 
        
        const sqlSelect = "SELECT * FROM categoria";
        
        this.pool.query(sqlSelect , (err, result) => {
         if(err){
             callback(new Error("Error modelTeacher getCategories"));     
         }
         else{
             callback(null, result);
         }   
         });
     }
 
     /*Obtiene todos los desafios del grupo seleccionado del profesor*/
     getChallenges(groupID, callback) {
         console.log(groupID);
         const sqlSelect = "SELECT * FROM desafio where idGrupo= ?";
 
         this.pool.query(sqlSelect, groupID, (err, result) => {
             if(err){
                 callback(new Error("Error modelTeacher getChallenges"));     
             }
             else{
                 callback(null, result);
             }   
         });
     }
 
 
       /*Obtiene todos los desafios del grupo seleccionado del profesor*/
       getChallenge(idChallenge, callback) {
         const sqlSelect = "SELECT * FROM desafio where id= ?";
 
         this.pool.query(sqlSelect, idChallenge, (err, result) => {
             if(err){
                 callback(new Error("Error modelTeacher getChallenge"));     
             }
             else{
                 callback(null, result);
             }   
         });
     }
 
 
     createChallenge(group,title, description, url,date,type,category,callback) {
 
         const sqlInsert = "INSERT INTO desafio (idGrupo,titulo,descripcion,imagen,idCategoria,colaborativo,fechaFin,activo) VALUES (?,?,?,?,?,?,?,?)";
         
         this.pool.query(sqlInsert, [ group,title, description,url,category,type,date,1], (err, result) => {
             if(err){
                 callback(new Error("Error modelTeacher postChallenge"));     
             }
             else{
                 callback(null, result);
             }   
         });
     }
 
     editChallenge(idChallenge,group,title, description, url,date,type,category,callback) {
 
         //const sqlInsert = "INSERT INTO desafio (idGrupo,titulo,descripcion,imagen,idCategoria,colaborativo,fechaFin,activo) VALUES (?,?,?,?,?,?,?,?)";
         const sqlInsert = "UPDATE desafio SET idGrupo = ?,titulo = ?,descripcion = ?,imagen = ?,idCategoria = ?,colaborativo = ?,fechaFin = ?,activo = ? WHERE id=?";
         this.pool.query(sqlInsert, [ group,title, description,url,category,type,date,1,idChallenge], (err, result) => {
             if(err){
                 callback(new Error("Error modelTeacher editChallenge"));     
             }
             else{
                 callback(null, result);
             }   
         });
     }

}

//Data export
module.exports = modelTeacher;  