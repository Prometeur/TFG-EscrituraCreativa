/*
*  Name_file :Router.js
*  Description: contiene rutas asociadas a componentes
*/

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import AuthService from "../services/authenticity/auth-service";
import Login from '../components/pages/login/login';
import Profile from '../components/pages/login/profile';
import Register from "../components/pages/login/register";


/*defino las rutas de los componentes
ejemplo ruta o url del login donde estara alojado/relacionado el componente Login*/
class Routes extends Component {

    constructor(props) {
      super(props);

      this.logOut = this.logOut.bind(this);

      this.state = {
        currentUser:undefined,
        showStudent: false,
        showTeacher: false,
        showAdmin: false,
      }
    }
  
    componentDidMount() {
      
      //Take info about server
      const user = AuthService.getCurrentUser();
      if(user) {
        this.setState({
          currentUser:user,
          showStudent: user["rol"].includes("E"),
          showTeacher: user["rol"].includes("T"),
          showAdmin: user["rol"].includes("A"),
        });
      }
    }

    logOut() {
      AuthService.logout();
    }

    render() {
      const { currentUser,showStudent, showTeacher, showAdmin} = this.state;
  
      return (
        <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
           
            <div className="navbar-nav mr-auto">
        
              {showTeacher && (
                <li className="nav-item">
                  <Link to={"/loign"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}
  
              {showAdmin && (
                <li className="nav-item">
                  <Link to={"/loign"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {showStudent && (
                <li className="nav-item">
                  <Link to={"/loign"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
  
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/loign"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
              
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
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
          </nav>
  
          <div className="container mt-3">
            <Switch>  
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
        </Router>      
      );
    }
}

/*
function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
*/
export default Routes;