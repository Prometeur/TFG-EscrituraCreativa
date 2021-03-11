import axios from '../../axios';
import authHeader from '../authenticity/auth-header';

class TeacherService {

<<<<<<< HEAD
    createChallenge(form) {
        
         return axios.post("/teacher/getGroups/createChallenge",{form: form},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
         }).then( response => {
                return response.data;
         })
    }

    editChallenge(form) {
        return  axios.post("/teacher/getGroups/editChallenge",{params:{form:form}},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
        }).then( response => {
=======
    /*Obtiene los  grupos del profesor */
    getGroups(idTeacher) {
        return axios.post("/teacher/getGroups", { idTeacher: idTeacher }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
>>>>>>> luis
            return response.data;
        })
    }

<<<<<<< HEAD
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
=======
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

    // /*Crea desafio del profesor */
    // createChallenge(form) {
    //     return axios.post("/teacher/createChallenge", { form: form }, {
    //         headers: { "Authorization": `Bearer ${authHeader()}` }
    //     }).then(response => {
    //         return response;
    //     })
    // }


    /*Crea desafio del profesor */
    createChallenge(idGroup, title, description, type, category, qualification, endDate) {
        return axios.post("/teacher/createChallenge", { idGroup: idGroup, title: title, description: description, type: type, category: category, qualification: qualification, endDate: endDate }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response;
        })
    }

    // /*Edita el desafio del profesor*/
    // editChallenge(form) {
    //     return axios.post("/teacher/editChallenge", { params: { form: form } }, {
    //         headers: { "Authorization": `Bearer ${authHeader()}` }
    //     }).then(response => {
    //         return response.data;
    //     })
    // }

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

    // /*Envia los archivos multimedia del profesor*/
    // sendMultimedia(file, idTeacher, idChallenge, path) {

    //     const form = new FormData();
    //     form.append("file", file);
    //     form.append("idTeacher", idTeacher);
    //     form.append("idChallenge", idChallenge);
    //     form.append("path", path);

    //     return axios.post("/teacher/sendMultimedia", form, { params: { idUser: idTeacher,idFolder:idChallenge } }, {
    //         headers: { "Authorization": `Bearer ${authHeader()}` }
    //     }).then(response => {
    //         return response.data;
    //     }).catch(error => {
    //         console.log(error.message);
    //     })
    // }


    /*Envia los archivos multimedia del profesor*/
    sendMultimedia(imgCollection, idTeacher, idChallenge) {
        const form = new FormData();

        for (const key of Object.keys(imgCollection)) {
            form.append('imgCollection', imgCollection[key])
        }
        
        form.append("idTeacher", idTeacher);
        form.append("idChallenge", idChallenge);

        return axios.post("/teacher/sendMultimedia", form, { params: { idUser: idTeacher, idFolder: idChallenge } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
>>>>>>> luis
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
<<<<<<< HEAD

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
=======
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

export default new TeacherService();
>>>>>>> luis
