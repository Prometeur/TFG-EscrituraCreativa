import axios from '../../axios';
import authHeader from '../authenticity/auth-header';

class TeacherService {

    createChallenge(form) {
        
         return axios.post("/teacher/getGroups/createChallenge",{form: form},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
         }).then( response => {
                return response.data;
         })
    }

    editChallenge(form) {
        return  axios.post("/teacher/getGroups/editChallenge",{params:{form:form}},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
        }).then( response => {
            return response.data;
        })
    }

    getChallenges(idGroup) {
        return axios.get("/teacher/getGroups/Challenges",{params: { idGroup:idGroup}},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
        }).then( response =>{
            return response.data;
           
        })
    }

    getChallenge(idChallenge) {
    
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

    getProfile(idStudent) {
           
        return axios.get("/teacher/getProfile", { params: { idUser: idStudent} },{ headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    getGroupsStudent(idStudent) {
        
        return axios.get("/teacher/getStudentGroups", { params: { idStudent: idStudent} },{ headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then( response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })

    }

    getScriptsByStudent(idStudent) {
      
        return axios.get("/teacher/getScriptsByStudent", { params: { id:idStudent} },{ headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then(response => {
             return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    allGroups(idTeacher) 
    {   
        return axios.post("/teacher/getGroups", {idTeacher: idTeacher} ,{ headers: {"Authorization" : `Bearer ${authHeader()}`} 
        }).then( response => {
              return response.data;
        })
    }


    searchStudent(searchStudent, searchType) {

        return axios.post("/teacher/searchStudent", { searchStudent: searchStudent, type :searchType},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
        })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })

    }

    acceptApplicantStudent(idApplicant) {
      
        return axios.get("/user/acceptAplplicant", { params: { idUser: idApplicant } }, { headers: {"Authorization" : `Bearer ${authHeader()}`}})
          .then(response => {
             return response.data;
       }).catch(error => {
           console.log(error.message);
       })
    }

    inviteToGroup(idGroup, idStudent) {

        return axios.post("/teacher/inviteStudentToGroup", { grupo: idGroup, idEstudiante: idStudent},{ headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })

    }

    kickFromGroup(idGroup, idStudent) {
        
        return axios.post("/teacher/kickStudentFromGroup", { grupo: idGroup, idEstudiante: idStudent},{ headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then(response => {
                return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }
}

export default new TeacherService;