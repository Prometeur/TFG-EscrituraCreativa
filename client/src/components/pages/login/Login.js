/*
*  Name_file :Login.js
*  Description: Pagina de inicio de sesion, contiene la vista del Login
*    
*/
import React, { Component } from 'react';
import AuthService  from "../../../services/authenticity/auth-service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
<<<<<<< HEAD
import '../../../styles/styleGeneral.css';
import '../../../styles/styleButton.css';
import '../../../styles/styleCard.css';
import Card from "react-bootstrap/Card";

import Alert from "react-bootstrap/Alert";
=======
>>>>>>> luis


const required = value => {
    if (!value) {
      return (
<<<<<<< HEAD
          <Alert variant="danger" bsPrefix="alert-heading">
              ¡Todos los campos son obligatorios!
          </Alert>
=======
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
>>>>>>> luis
      );
    }
  };

//const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
          username: "",
          password: "",
          loading: false,
          message: ""
        };
    }

    componentDidMount(){
       if(AuthService.getCurrentUser()){
         this.props.history.push("/profile");
         window.location.reload();
       }
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
    }
    
    onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
    }
    
    
   handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
<<<<<<< HEAD
=======
     
>>>>>>> luis
        AuthService.login(this.state.username, this.state.password)
        .then( ()=> {
             this.props.history.push("/profile");
             window.location.reload();
          })
        .catch(e => {
          console.log(e);
        });
      } 
      else 
      {
        this.setState({
          loading: false
        });
        console.log("error");
      }
    }
    
  render() {
      return (
<<<<<<< HEAD
          <>
          <div className="container">
            <Card className="card-login">
              <Card.Body>
                <Card.Title>Sign In</Card.Title>
                  <Form  
                    onSubmit={this.handleLogin}
                    ref= {c => {
                    this.form = c;
                    }}
                  >
                  <div className="form-group">
                      <div className="section-column">
                        <Input 
                            type="text" 
                            name="username" 
                            placeholder="Usuario"
                            value={this.state.username}
                            onChange={this.onChangeUsername} 
                            validations={[required]}

                        />
                      </div>
                      <div className="section-column">
                        <Input
                            type="text" 
                            name="password"
                            placeholder="Contraseña"
                            value={this.state.password} 
                            onChange={this.onChangePassword}
                            validations={[required]}
                        />
                      </div>
                    </div>
                    <div class="box">
                      <button className="btn btn-white btn-animation-1" > Login </button>
                    </div>
                    <CheckButton
                      text='Log In' 
                      style={{ display: "none" }}
                      ref={c => {
                        this.checkBtn = c}}
                    />
                    </Form>
                  </Card.Body>
              </Card>
            </div>
          </>
=======
          <div>
              <h1>Login</h1>
              <Form  
                onSubmit={this.handleLogin}
                 ref= {c => {
                this.form = c;
                }}
               >
                  <label >Usuario: </label>
                  <br />
                  <Input 
                      type="text" 
                      name="username" 
                      value={this.state.username}
                      onChange={this.onChangeUsername} 
                      validations={[required]}

                  />
                  <br />
                  <label> Password: </label>
                  <br />
                  <Input 
                      type="text" 
                      name="password"
                      value={this.state.password} 
                      onChange={this.onChangePassword}
                      validations={[required]}
                  />
                <br />
                <button > Login </button>

                <CheckButton
                text='Log In' 
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c}}
               />
              </Form>
          </div>
>>>>>>> luis
      );
  }
}

export default Login;
