import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../../services/authenticity/auth-service";

export default class Profile extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

   if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
         {console.log(currentUser.accessToken.substring(0, 20))} ...{" "}
          {console.log(currentUser.accessToken.substr(currentUser.accessToken.length - 20))}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.correo}
        </p>
        <strong>Authorities:</strong>
        <p>
          {currentUser.rol}
        </p>
      </div>: null}
      </div>
    );
  }
}
