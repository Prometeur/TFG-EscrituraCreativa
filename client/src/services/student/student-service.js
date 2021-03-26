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

    /*Obtiene los escritos del estudiante segun su grupo */
    getWritings(idUser, idGroup) {
        return axios.get("student/getWritings", { params: { idUser: idUser, idGroup: idGroup } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Edito el escrito del estudiante */
    editWriting(idWriting, idGroup, idChallenge, idWriter, escrito, type) {
        return axios.post("/student/editWriting", { idWriting: idWriting, idGroup: idGroup, idChallenge: idChallenge, idWriter: idWriter, escrito: escrito, type: type }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Envia el escrito del estudiante segun su grupo*/
    sendWriting(idGroup, idChallenge, idWriter, escrito, type) {

        return axios.post("/student/sendWriting", { idGroup: idGroup, idChallenge: idChallenge, idWriter: idWriter, escrito: escrito, type: type }, {
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


       /*Obtiene multimedia del desafio */
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

    /*Envia los archivos multimedia del estudiante*/
    sendMultimedia(imgCollection,idWriter, idChallenge) {

       const form = new FormData();

       imgCollection.map((row)=>{
           form.append('imgCollection', row);
       });

        form.append("idWriter", idWriter);
        form.append("idChallenge", idChallenge);

        console.log(form);
        return axios.post("/student/sendMultimedia", form, {params: { idUser: idWriter,idFolder:idChallenge} },{
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }


    /*Edita los archivos multimedia del estudiante*/
    editMultimedia(idMultimedia,idWriter, idChallenge, path) {
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

export default new StudentService;