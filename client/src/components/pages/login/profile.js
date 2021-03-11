import React, { Component } from "react";
<<<<<<< HEAD
import { Redirect }from "react-router-dom";
import AuthService from "../../../services/authenticity/auth-service";

export default class Profile extends Component {
  
=======
import { Redirect } from "react-router-dom";
import AuthService from "../../../services/authenticity/auth-service";

export default class Profile extends Component {

>>>>>>> luis
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }
<<<<<<< HEAD
   
  

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
   
    if (!currentUser)
        this.setState({ redirect: "/home" });
  
=======



  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser)
      this.setState({ redirect: "/home" });

>>>>>>> luis
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
<<<<<<< HEAD
    
=======

>>>>>>> luis
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    //const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
<<<<<<< HEAD
        <div>
        <header className="jumbotron">
          <h3>
            <strong></strong> 
            Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>
        </p>
      </div>: null}
=======
          <div>
            <header className="jumbotron">
              <h3>
                <strong></strong>
            Profile
          </h3>
            </header>
          </div> : null}
>>>>>>> luis
      </div>
    );
  }
}
