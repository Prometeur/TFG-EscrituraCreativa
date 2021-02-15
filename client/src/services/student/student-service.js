import axios from '../../axios';
import authHeader from '../authenticity/auth-header';

class StudentService {

    
    getWriting(idChallenge, idWriter,writingForm){
      
        return  axios.post("/student/getWriting", {params:{ idChallenge:idChallenge , idWriter: idWriter, writingForm: writingForm}},
        { headers: {"Authorization" : `Bearer ${authHeader()}`}
        }).then(response => {
                return response;
        }).catch(error => {
            console.log(error.message);
        })
    }

    getWritings(idUser,idGroup) {

       return  axios.get("student/getWritings", { params: { idUser: idUser,idGroup:idGroup}},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
       }).then(response => {
             return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    getChallenge(){
        
    }

    getChallenges(idGroup) {
        console.log(idGroup);
        return axios.get("/student/getChallenges",{params:{ idGroup: idGroup }},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
        }).then(response => {
             return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }


    allGroups(idStudent){
       
        return axios.post("/student/challenges", {idStudent:idStudent},{headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then( response => {
                return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }


}

export default new StudentService();