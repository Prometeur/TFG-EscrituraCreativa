import axios from '../../axios';
import authHeader from '../authenticity/auth-header';

class UserService {
 
<<<<<<< HEAD
  searchStudent(searchStudent, searchType , url) {

      return axios.post("teacher/searchStudent", { searchStudent: searchStudent, type :searchType},{ headers: {"Authorization" : `Bearer ${authHeader()}`}
     })
      .then(response => {
            return response.data;
      }).catch(error => {
          console.log(error.message);
      })

   }
=======
  getPublicContent() {
    return axios.get('all');
  }

  getStudentBoard() {
   
    return axios.get('/student', { headers: authHeader()});
  }

  getTeacherBoard() {

    return axios.get('/teacher', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get('/admin', { headers: authHeader() });
  }
>>>>>>> luis
}

export default new UserService();