import Axios from "../axios";


class UserService {

    getAll(){
        return Axios.get("/user/grupo/3")
    }

   /* insert(data){
        return Axios.post("/users",data);
    }

    update(data){
        return Axios.put("/users",data)
    }

    delete(id){
        return Axios.delete(`/users/${id}`)
    }*/

}

export default new UserService();