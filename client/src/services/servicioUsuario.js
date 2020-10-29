import Axios from "../axios";


class servicioUsuario {

    getAll(){
        return Axios.get("/usuario/grupo/3")
    }

}

export default new servicioUsuario();