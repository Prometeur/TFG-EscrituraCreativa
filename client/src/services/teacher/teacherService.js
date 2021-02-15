import axios from '../../axios';
import authHeader from '../authenticity/auth-header';

class TeacherService {

    createChallenge(form){
        
         return axios.post("/teacher/getGroups/createChallenge",{form: form},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
         }).then( response => {
                return response.data;
         })
    }

    editChallenge(form){
        return  axios.post("/teacher/getGroups/editChallenge",{params:{form:form}},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
        }).then( response => {
            return response.data;
        })
    }

    getChallenges(idGroup)
    {
        return axios.get("/teacher/getGroups/Challenges",{params: { idGroup:idGroup}},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
        }).then( response =>{
            return response.data;
           
        })
    }

    getChallenge(idChallenge){
    
       return axios.get("/teacher/getGroups/getChallenge",{params:{idChallenge:idChallenge}},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
       }).then( response => {
            return response.data;
       })
    }

    getCategories() {
        return axios.get("/teacher/getGroups/getCategories",{ headers: {"Authorization" : `Bearer ${authHeader()}`}
        }).then( response => {
                return response.data;
        })
                
    }

    allGroups(idTeacher) 
    {   
        return axios.post("/teacher/getGroups", {idTeacher: idTeacher} ,{ headers: {"Authorization" : `Bearer ${authHeader()}`} 
        }).then( response => {
              return response.data;
        })
    }
}

export default new TeacherService();