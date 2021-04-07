import axios from '../../axios';
import authHeader from '../authenticity/auth-header';

class StudentService {

    /**Obtiene los grupos del estudiante */
    getGroups(idStudent) {
        return axios.post("/student/getGroups", { idStudent: idStudent }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    //Envia un mensaje
    sendMessage(idSender, idReceiver, idCreator, message, type) {
        return axios.post("/student/sendMessage", { idSender: idSender, idReceiver: idReceiver, idCreator: idCreator, message: message, type: type }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    //Estudiante crea un equipo
    createTeam(idCreator, idGroup, teamName) {
        return axios.post("/student/createTeam", { idCreator: idCreator, idGroup: idGroup, teamName: teamName }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    //Agrega un estudiante a un equipo
    addStudentTeam(idTeam, idStudent) {
        return axios.post("/student/addStudentTeam", { idTeam: idTeam, idStudent: idStudent }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    //Estudiante abandona equipo
    leaveStudentTeam(idTeam, idStudent) {
        return axios.post("/student/leaveStudentTeam", { idTeam: idTeam, idStudent: idStudent }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }


    /**Obtiene los equipos del estudiante */
    getTeams(idStudent) {
        return axios.get("/student/getTeams", { params: { idStudent: idStudent } }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**Obtiene el equipo del estudiante */
    getTeam(idSender) {
        return axios.get("/student/getTeam", { params: { idSender: idSender } }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**Obtengo la tabla entera de equipoestudiante */
    getTeamStudent() {
        return axios.get("/student/getTeamStudent", { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    // Obtiene los integrantes de un equipo
    getMembersTeam(idTeam) {
        return axios.get("/student/getMembersTeam", { params: { idTeam: idTeam } }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /*Obtiene estudiantes sin equipos del grupo */
    getStudentWithoutTeam(idGroup) {
        return axios.get("/student/getStudentWithoutTeam", { params: { idGroup: idGroup } }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
    getTeamStudentGroup(idStudent, idGroup) {
        return axios.get("/student/getTeamStudentGroup", { params: { idStudent: idStudent, idGroup: idGroup } }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }


    /**Obtengo los equipos del grupo*/
    getTeamsGroup(idGroup) {

        return axios.get("/student/getTeamsGroup", { params: { idGroup: idGroup } }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**Obtiene los mensajes del estudiante */
    getMessages(idStudent) {
        return axios.get("/student/getMessages", { params: { idStudent: idStudent } }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**Obtiene mensaje del estudiante */
    getMessage(idMessage) {
        return axios.get("/student/getMessage", { params: { idMessage: idMessage } }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**Estudiante se une a un equipo */
    joinTeam(idTeam, idStudent) {
        return axios.get("/student/joinTeam", { params: { idTeam: idTeam, idStudent: idStudent } }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**edita el equipo*/
    editTeam(idTeam, name, idCreator, idGroup) {
        return axios.post("/student/editTeam", { idTeam: idTeam, name: name, idCreator: idCreator, idGroup: idGroup }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**edita el equipo*/
    deleteTeam(idTeam) {
        return axios.post("/student/deleteTeam", { idTeam: idTeam }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**modifica el tipo de mensaje */
    editMessage(idMessage) {
        return axios.post("/student/editMessage", { idMessage: idMessage }, { headers: { "Authorization": `Bearer ${authHeader()}` } })
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /**Obtiene el desafio del estudiante segun su grupo */
    getChallenge(idChallenge) {
        return axios.get("student/getChallenge", { params: { idChallenge: idChallenge } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    /**Obtiene los desafios del estudiante segun su grupo */
    getChallenges(idGroup) {
        return axios.get("/student/getChallenges", { params: { idGroup: idGroup } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Obtiene el escrito del estudiante */
    getWriting(idWriting) {
        return axios.get("/student/getWriting", { params: { idWriting: idWriting } },
            {
                headers: { "Authorization": `Bearer ${authHeader()}` }
            }).then(response => {
                return response;
            }).catch(error => {
                console.log(error.message);
            })
    }

      /*Obtiene el escrito del estudiante */
      getWritingWriter(idGroup,idChallenge,idWriter) {
        return axios.get("/student/getWritingWriter", { params: { idGroup:idGroup,idChallenge: idChallenge,idWriter:idWriter} },
            {
                headers: { "Authorization": `Bearer ${authHeader()}` }
            }).then(response => {
                return response;
            }).catch(error => {
                console.log(error.message);
            })
    }

    /*Obtiene los escritos del estudiante en un grupo*/
    getWritingsStudent(idStudent, idGroup) {
        return axios.get("student/getWritingsStudent", { params: { idStudent: idStudent, idGroup: idGroup } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }


    /*Obtiene los escritos de un equipo */
    getWritingsTeam(idTeam, idGroup) {
        return axios.get("student/getWritingsTeam", { params: { idTeam: idTeam, idGroup: idGroup } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Edito el escrito del estudiante */
    editWriting(idWriting, idGroup, idChallenge, idWriter, title, escrito, type) {
        return axios.post("/student/editWriting", { idWriting: idWriting, idGroup: idGroup, idChallenge: idChallenge, idWriter: idWriter, title: title, escrito: escrito, type: type }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Envia el escrito del estudiante segun su grupo*/
    sendWriting(idGroup, idChallenge, idWriter, title, escrito, type) {
        return axios.post("/student/sendWriting", { idGroup: idGroup, idChallenge: idChallenge, idWriter: idWriter, title: title, escrito: escrito, type: type }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Obtiene multimedia del escrito del estudiante */
    getMultimediaWriting(idChallenge, idWriter) {
        return axios.get("/student/getMultimediaWriting", { params: { idChallenge: idChallenge, idWriter: idWriter } },
            {
                headers: { "Authorization": `Bearer ${authHeader()}` }
            }).then(response => {
                return response;
            }).catch(error => {
                console.log(error.message);
            })
    }


    /*Obtiene ficheros multimedia del desafio */
    getMultimediaChallenge(idChallenge) {
        return axios.get("/student/getMultimediaChallenge", { params: { idChallenge: idChallenge } },
            {
                headers: { "Authorization": `Bearer ${authHeader()}` }
            }).then(response => {
                return response;
            }).catch(error => {
                console.log(error.message);
            })
    }

    // /*Envia los archivos multimedia del estudiante*/
    // sendMultimedia(imgCollection, idWriter, idChallenge) {
    //     const form = new FormData();

    //     for (const key of Object.keys(imgCollection)) {
    //         form.append('imgCollection', imgCollection[key])
    //     }

    //     form.append("idWriter", idWriter);
    //     form.append("idChallenge", idChallenge);

    //     return axios.post("/student/sendMultimedia", form, { params: { idUser: idWriter, idFolder: idChallenge } }, {
    //         headers: { "Authorization": `Bearer ${authHeader()}` }
    //     }).then(response => {
    //         return response.data;
    //     }).catch(error => {
    //         console.log(error.message);
    //     })
    // }

    /*Envia los archivos multimedia del estudiante*/
    sendMultimedia(imgCollection, idWriter, idChallenge, type) {
        const form = new FormData();

        for (const key of Object.keys(imgCollection)) {
            form.append('imgCollection', imgCollection[key])
        }

        form.append("idWriter", idWriter);
        form.append("idChallenge", idChallenge);

        return axios.post("/student/sendMultimedia", form, { params: { id: idWriter, idFolder: idChallenge, type: type } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })

    }

    /*Edita los archivos multimedia del estudiante*/
    editMultimedia(idMultimedia, idWriter, idChallenge, path) {
        const form = new FormData();

        form.append("idMultimedia", idMultimedia);
        form.append("idWriter", idWriter);
        form.append("idChallenge", idChallenge);
        form.append("path", path);

        return axios.post("/student/editMultimedia", form, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Elimina fichero multimedia del escrito */
    deleteMultimedia(idMultimedia, path) {
        return axios.post("/student/deleteFile", { idMultimedia: idMultimedia, path: path }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        })
    }
}

export default new StudentService();