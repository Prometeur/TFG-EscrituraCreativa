/*
*  Name_file :App.js
*  Description: redirije a routes.js
*/
import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Switch, Link } from 'react-router-dom';
import AuthService from './services/authenticity/auth-service.js';
import Login from './components/pages/login/Login.js';
import Home from './components/pages/home/Home.js';
import Register from './components/pages/login/register.js';
import Profile from './components/pages/login/profile.js';
import TeacherBoard from '../src/components/pages/teacher/TeacherBoard.js';
import StudentBoard from '../src/components/pages/student/StudentBoard.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styleGeneral.css';
import './styles/styleNavBar.css';

class App extends Component {

    constructor(props){
       super(props);
     
      this.logOut = this.logOut.bind(this);

       this.state = {
        currentUser: undefined,
        showStudent: false,
        showTeacher: false,
        showAdmin: false,

       };
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

    logOut(){
       AuthService.logout();
    }

    render() {
       const { currentUser,showStudent, showTeacher, showAdmin } = this.state;
        return (
          <Router>
            <div className="full-wrapper">
              <header>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald&family=Oswald&display=swap"></link>
                <div className ="menuBar">
                  <nav>
                     <ul>
                        { showAdmin && (
                        <li>
                          <Link to={"/admin"} >
                             Dashboard
                          </Link>
                        </li>
                        )}
                        {showStudent && (
                        <li>
                          <Link to={"/student"}>
                            Dashboard
                          </Link>
                        </li>
                      )}
                      {showTeacher && (
                        <li>
                          <Link to={"/teacher"}>
                              Dashboard
                          </Link> 
                      </li>
                      )}
                    
                      { currentUser ? ( 
                        <>
                            <li>
                              <Link to={"/profile"}>
                                {currentUser.username}
                              </Link>
                            </li>
                            <li>
                              <a href="/login" onClick={this.logOut}>
                                Cerrar sesión
                              </a>
                            </li>
                            </>
                            ):(
                              <>
                                <li>
                                  <Link to={"/home"}>
                                    Home
                                  </Link>
                                </li> 
                                <li>
                                  <Link to={"/login"} >
                                    Iniciar
                                  </Link>
                                </li>
                                <li>
                                  <Link to={"/register"}>
                                    Registarse
                                  </Link>
                              </li>
                             </>
                          )}
                       </ul>
                    </nav>
                  </div>
                </header>
                  <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/admin' component={Register} />
                    <Route exact path='/teacher' component={TeacherBoard} />
                    <Route exact path='/student' component={StudentBoard} />
                  </Switch>
              </div>
            </Router> 
        );
    }
}


export default App;
