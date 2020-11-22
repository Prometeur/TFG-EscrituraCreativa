  
import axios from 'axios';


class AdminService {

    

    peticionGet(baseUrl) {
        axios.get(baseUrl).then(response => {
            console.log(response.data);
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })

    }
}

module.exports = AdminService;   