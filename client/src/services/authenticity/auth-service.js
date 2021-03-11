import axios from "../../axios";

class AuthService {
 
    login(username, password) {
<<<<<<< HEAD
      
=======
   
>>>>>>> luis
        return axios.post("/auth/signin", { username: username, password: password }, { 
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            } 
        })
        .then(response =>{
<<<<<<< HEAD
=======
            
>>>>>>> luis
            if (response.data.accessToken) 
            {
                // Obtenemos los datos desde el servidor y almacenamos los datos del usuario
                localStorage.setItem("user", JSON.stringify(response.data));
            }
        
            return response.data;
      
         });
    }

    logout() {

        localStorage.removeItem("user");
    }

    register(username, surname, email, password) {
       
        return axios.post("/auth/signup", {
            username: username,
            surname: surname,
            email: email,
            password: password,
        }, { headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         } 
        });
    }

    getCurrentUser() {
<<<<<<< HEAD
        return JSON.parse(localStorage.getItem('user'));;
=======
        return JSON.parse(localStorage.getItem('user'));
>>>>>>> luis
    }
}

export default new AuthService();