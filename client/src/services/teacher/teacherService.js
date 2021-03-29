import axios from '../../axios';
import authHeader from '../authenticity/auth-header';

class TeacherService {


    /*Obtiene los  grupos del profesor */
    getGroups(idTeacher) {
        console.log(idTeacher);
        return axios.post("/teacher/groups", { idTeacher: idTeacher }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            console.log(response);
            return response.data;
            console.log(response.data);
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
        
        return axios.get("/teacher/getStudentGroups", { params: { idEstudiante: idStudent} },{ headers: {"Authorization" : `Bearer ${authHeader()}`}})
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

    /*Obtiene todas las categorias de los desafios */
    getCategories() {
        return axios.get("/teacher/getCategories", {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        })
    }

    /*Obtiene el desafio del profesor segun su grupo*/
    getChallenge(idChallenge) {

        return axios.get("/teacher/getChallenge", { params: { idChallenge: idChallenge } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        })
    }

    /*Obtiene los desafios del profesor segun su grupo*/
    getChallenges(idGroup) {
        return axios.get("/teacher/Challenges", { params: { idGroup: idGroup } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;

        })
    }


    /*Crea desafio del profesor */
    createChallenge(idGroup, title, description, type, category, qualification, endDate) {
        return axios.post("/teacher/createChallenge", { idGroup: idGroup, title: title, description: description, type: type, category: category, qualification: qualification, endDate: endDate }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response;
        })
    }


    /*Edita el desafio del profesor*/
    editChallenge(idChallenge, idGroup, title, description, type, category, qualification, endDate) {
        return axios.post("/teacher/editChallenge", { idChallenge: idChallenge, idGroup: idGroup, title: title, description: description, type: type, category: category, qualification: qualification, endDate: endDate }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        })
    }



    /*Obtiene multimedia del desafio del profesor */
    getMultimedia(idChallenge) {
        return axios.get("/teacher/getMultimedia", { params: { idChallenge: idChallenge } },
            {
                headers: { "Authorization": `Bearer ${authHeader()}` }
            }).then(response => {
                return response;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /*Envia los archivos multimedia del profesor*/
    sendMultimedia(imgCollection, idTeacher, idChallenge,type) {
        const form = new FormData();
        debugger;

        for (const key of Object.keys(imgCollection)) {
            form.append('imgCollection', imgCollection[key])
        }
        
        form.append("idTeacher", idTeacher);
        form.append("idChallenge", idChallenge);


        return axios.post("/teacher/sendMultimedia", form, { params: { id: idTeacher, idFolder: idChallenge,type:1 } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
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

    /*Elimina los archivos multimedia del profesor*/
    deleteMultimedia(idMultimedia, path) {
        return axios.post("/teacher/deleteFile", { idMultimedia: idMultimedia, path: path }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        })
    }

    /*Elimina desafio*/
    deleteChallenge(idChallenge) {
        return axios.post("/teacher/deleteChallenge", { idChallenge: idChallenge}, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        })
    }

}

export default new TeacherService;
