import axios from "axios";
import authHeader from './auth-header';

const querystring = require('querystring');
const API_URL = "http://tanwailiang.ddns.net/auth-route/";


class AuthService {

  login(username, password) {
    return axios
      .post(API_URL + "login", 
      querystring.stringify({
        username,
        password
      })
      ).then(response => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
  }

  logout() {
    const user = this.getCurrentUser();
    localStorage.removeItem("user");
    return axios
    .post(API_URL + "logout",
    querystring.stringify({
      refreshToken: user.refreshToken
    })
    );
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", 
    querystring.stringify({
      username,
      email,
      password
    })
    );
  }
  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  postChangeRole(username,roles){
    return axios.post(API_URL + 'change-role', querystring.stringify({
      username,
      roles
    }),
    { headers: authHeader()});
  }

  deleteUser(username){
    return axios.post(API_URL + 'delete-user', querystring.stringify({
      username
    }),
    { headers: authHeader()});
  }

}

export default new AuthService();
