import axios from '../../axios';
import authHeader from '../authenticity/auth-header';

class UserService {
 
  getPublicContent() {
    return axios.get('all');
  }

  getUserBoard() {
    return axios.get('user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get('teacher', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get('admin', { headers: authHeader() });
  }
}

export default new UserService();