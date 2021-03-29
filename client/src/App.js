/*
*  Name_file :App.js
*  Description: redirije a routes.js
*/
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AuthService from './services/authenticity/auth-service.js';
import Login from './components/pages/login/Login.js';
import Home from './components/pages/home/Home.js';
import Register from './components/pages/login/register.js';
import Profile from './components/pages/login/profile.js';
import TeacherBoard from '../src/components/pages/teacher/TeacherBoard.js';
import StudentBoard from '../src/components/pages/student/StudentBoard.js';
import EditProfile from './components/pages/login/EditProfile.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styleGeneral.css';
import './styles/styleNavBar.css';

import Messenger from './components/pages/student/Messenger.js';
import Message from './components/pages/student/Message.js';

class App extends Component {

  constructor(props) {
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

    if (user) {
      this.setState({
        currentUser: user,
        showStudent: user["rol"].includes("S"),
        showTeacher: user["rol"].includes("T"),
        showAdmin: user["rol"].includes("A"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showStudent, showTeacher, showAdmin } = this.state;

    return (
      <Router>
        <div className= "full-wrapper">
          <header>
              <Navbar collapseOnSelect expand="lg" >
                <Navbar.Brand href="/home">Creativa</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {currentUser ? (
                        <Nav className="mr-auto">
                          {showAdmin && (
                              <Nav.Link href="/admin">Dashboard</Nav.Link>
                          )}
                          {showStudent && (
                              <Nav.Link href="/student">Dashboard</Nav.Link>
                          )}
                          {showTeacher && (
                              <Nav.Link href="/teacher">Dashboard</Nav.Link>
                          )}
                          <Nav.Link href="/profile"> {currentUser.username}</Nav.Link>
                          <Nav.Link href="/student/messenger"> Mensajeria</Nav.Link>
                          <Nav.Link href="/login" onClick={this.logOut}>Cerrar sesión</Nav.Link>
                        </Nav>
                      ) : (
                      <Nav className="mr-auto">
                        <Nav.Link href="/login">Iniciar</Nav.Link>
                        <Nav.Link href="/register">Registar</Nav.Link>
                      </Nav>
                    )}
                 </Navbar.Collapse>
                </Navbar>
                </header>
                  <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/admin' component={Register} />
                    <Route exact path='/editProfile' component={EditProfile} />
                    <Route exact path='/teacher' component={TeacherBoard} />
                    <Route exact path="/student/messenger" component={Messenger} />
                    <Route exact path="/student/message/:idMessage" component={Message} />
                    <Route exact path='/teacher' component={TeacherBoard} />
                    <Route exact path='/student' component={StudentBoard} />
                 </Switch>
             </div>
      </Router>
    );
  }
}

export default App;
