import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://tanwailiang.ddns.net/user-route/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getTempBoard() {
    return axios.get(API_URL + 'temp', { headers: authHeader() });
  }

  
}

export default new UserService();
