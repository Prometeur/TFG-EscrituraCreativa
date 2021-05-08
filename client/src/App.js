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
import AdminBoard from '../src/components/pages/admin/AdminBoard';
import EditProfile from './components/pages/login/EditProfile.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styleGeneral.css';
import './styles/styleNavBar.css';

import Messenger from './components/pages/student/Messenger.js';
import Message from './components/pages/student/Message.js';

import NoMatch from "./components/pages/errors/404";
import InternalEror from "./components/pages/errors/500";

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
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Pontano+Sans&display=swap" rel="stylesheet"></link>
              <Navbar collapseOnSelect expand="lg" >
                <Navbar.Brand href="/home">Creativa</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {currentUser ? (
                        <Nav className="mr-auto">
                          {showAdmin && (
                              <Nav.Link bsPrefix="nav-link" href="/admin">Dashboard</Nav.Link>
                          )}
                          {showStudent && (
                              <Nav.Link  bsPrefix="nav-link" href="/student">Dashboard</Nav.Link>
                          )}
                          {showTeacher && (
                              <Nav.Link  bsPrefix="nav-link" href="/teacher">Dashboard</Nav.Link>
                          )}
                          <Nav.Link bsPrefix="nav-link" href="/profile"> {currentUser.username}</Nav.Link>
                          <Nav.Link bsPrefix="nav-link" href="/student/messenger"> Mensajeria</Nav.Link>
                          <Nav.Link bsPrefix="nav-link" href="/login" onClick={this.logOut}>Cerrar sesión</Nav.Link>
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
                    <Route exact path='/admin' component={AdminBoard} />
                    <Route exact path='/editProfile' component={EditProfile} />
                    <Route exact path='/teacher' component={TeacherBoard} />
                    <Route exact path="/student/messenger" component={Messenger} />
                    <Route exact path="/student/message/:idMessage" component={Message} />
                    <Route exact path='/teacher' component={TeacherBoard} />
                    <Route exact path='/student' component={StudentBoard} />
                    <Route exact path='/500' component={InternalEror} /> {/*Esta dirección sirve para el error 500 (interno del servidor).*/}
                    <Route path='*' component={NoMatch}/> {/*Esta dirección sirve para el error 404.*/}
                 </Switch>
             </div>
      </Router>
    );
  }
}

export default App;
