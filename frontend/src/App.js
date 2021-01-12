import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";


import AuthService from "./services/auth-service";
import Login from "./components/login-component";
import Register from "./components/register-component";
import Home from "./components/home-component";
import Profile from "./components/profile-component";
import BoardUser from "./components/board-user-component";
import BoardModerator from "./components/board-moderator-component";
import BoardAdmin from "./components/board-admin-component";


import "bootstrap/dist/css/bootstrap.min.css";

import "jquery/dist/jquery"
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    //console.log(user);
    if (user && user.roles) {  
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("moderator")||user.roles.includes("admin"),
        showAdminBoard: user.roles.includes("admin"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    
    window.onbeforeunload = (e) => {
      window.localStorage.unloadTime = JSON.stringify(new Date());
      };
      window.onload = () => {
      let loadTime = new Date();
      let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
      let refreshTime = loadTime.getTime() - unloadTime.getTime();
      if(refreshTime>1000 && document.getElementById("logout-a")!=null){//1000 milliseconds
        document.getElementById("logout-a").click();       
      }
    };

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            M2G10
          </Link>
          <button className="navbar-toggler" 
                  type="button" 
                  data-toggle="collapse" 
                  data-target="#navbarTogglerDemo02" 
                  aria-controls="navbarTogglerDemo02" 
                  aria-expanded="false" 
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Attendance Record
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </ul>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" id="logout-a" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
        <nav className="navbar navbar-light bg-light mt-3">
          <div className="mx-auto">
           Capstone project by M2G10©
          </div>  
        </nav>
      </div>
    );
  }
}

export default App;
