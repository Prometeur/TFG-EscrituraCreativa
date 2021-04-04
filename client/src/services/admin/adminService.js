  /*
*  Name_file :adminService.js
*  Description: contiene las llamadas al servidor de las funcionalidades del Admin
*/
import axios from '../../axios';
import authHeader from '../authenticity/auth-header';


class AdminService {

    

    getUsers(searchName, searchType) {
        return axios.post("/admin/getUsers", {  clave: searchName, tipo: searchType},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
        })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })

    }

    getProfile(idUser) {
           
        return axios.get("/admin/getProfile", { params: { idUser: idUser} },{ headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    getScriptsByStudent(idStudent) {
      
        return axios.get("/admin/getScriptsByStudent", { params: { id:idStudent} },{ headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then(response => {
             return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    getAllGroups() {
        
        return axios.get("/admin/getAllGroups", { params: {} },{ headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then( response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })

    }

    deactivateUser(id){
        return axios.post("/admin/deactivateUser/", { idUser: id  }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }

    deleteUser(id){
        return axios.post("/admin/deleteUser/", { idUser: id  }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.message);
        })
    }


}

export default new AdminService;   