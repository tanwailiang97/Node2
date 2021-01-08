import axios from "axios";

const querystring = require('querystring');
const API_URL = "http://127.0.0.1:5000/auth/";

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
}

export default new AuthService();
