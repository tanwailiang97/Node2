import React, { Component } from "react";

import UserService from "../services/user-service";
import homeImage from "../images/Poke-wallpaper.jpg";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <div className="text-center">
          <img src={homeImage} className="img-fluid mx-auto" alt="Home Pages"></img>
        </div>
      </div>
    );
  }
}
