import axios from '../../axios';
import authHeader from '../authenticity/auth-header';

class UserService {

  searchStudent(searchStudent, searchType ) {
      console.log(searchStudent);
      return axios.post("teacher/searchStudent", { searchStudent: searchStudent, type :searchType},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
     })
      .then(response => {
            return response.data;
      }).catch(error => {
          console.log(error.message);
      })

   }
 }


export default new UserService();