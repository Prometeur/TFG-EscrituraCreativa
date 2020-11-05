import Axios from "../axios";


class servicioUsuario {

    getAll(){
        return Axios.get("/user/group/3")
    }

}

export default new servicioUsuario();