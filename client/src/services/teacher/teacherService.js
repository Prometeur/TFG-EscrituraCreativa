import axios from '../../axios';
import authHeader from '../authenticity/auth-header';

class TeacherService {

    /*Obtiene los  grupos del profesor */
    getGroups(idTeacher) {
        return axios.post("/teacher/getGroups", { idTeacher: idTeacher }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
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

    /*Envia los archivos multimedia del profesor*/
    sendMultimedia(file, idTeacher, idChallenge, path) {
        const form = new FormData();
        form.append("file", file);
        form.append("idTeacher", idTeacher);
        form.append("idChallenge", idChallenge);
        form.append("path", path);

        return axios.post("/teacher/sendMultimedia", form, { params: { idUser: idTeacher } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

     /*Edita los archivos multimedia del estudiante*/
     editMultimedia(file,idMultimedia,idTeacher, idChallenge, path) {
        const form = new FormData();
        form.append("file", file);
        form.append("idMultimedia", idMultimedia);
        form.append("idTeacher", idTeacher);
        form.append("idChallenge", idChallenge);
        form.append("path", path);

        return axios.post("/teacher/editMultimedia", form,{ params: { idUser: idTeacher } }, {
            headers: { "Authorization": `Bearer ${authHeader()}` }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }


}

export default new TeacherService();