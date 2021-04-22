/*
*  Name_file :Login.js
*  Description: Pagina de inicio de sesion, contiene la vista del Login
*    
*/
import React, { Component } from 'react';
import { Redirect, Link }from "react-router-dom";
import AuthService  from "../../../services/authenticity/auth-service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../../../styles/styleGeneral.css';
import '../../../styles/styleButton.css';
import '../../../styles/styleCard.css';
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from '@material-ui/core/Button'


const required = value => {
    if (!value) {
      return (
          <Alert variant="danger" bsPrefix="alert-login">
              ¡Todos los campos son obligatorios!
          </Alert>

      );
    }
  };


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
          message: "",
          error: false,
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
      loading: true,
    });

    this.form.validateAll();


    if (this.checkBtn.context._errors.length === 0) {
        AuthService.login(this.state.username, this.state.password)
        .then( ()=> {
             this.props.history.push("/profile");
             window.location.reload();
          })
        .catch(e => {
          console.log(e);
            this.setState({
                error:true,
            });
        });
      } 
      else 
      {
        this.setState({
          loading: false,
        });
        console.log("error");
      }
    }
    
  render() {
        console.log(this.state.error);
      return (
          <div className="container">

                  <Form  
                    onSubmit={this.handleLogin}
                    ref= {c => {
                    this.form = c;
                    }}
                  >
                  <div className="form-group-login">
                          <h4>Iniciar sesión</h4>
                          <div className="section-column">
                            <Input
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder=" Usuario"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required]}

                            />
                          </div>
                          <div className="section-column">
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder=" Contraseña"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                          </div>
                           <Link to={""}>¿Has olvidado tu contraseña?</Link>
                          <div className="section-column">
                            <button className="button button5" > Login </button>
                          </div>
                           <p className="p-login">
                               Al crear la cuenta, aceptas nuestros términos y condiciones.
                               Por favor, lee nuestra política de privacidad y nuestra política de cookies.
                           </p>
                        <CheckButton
                          text='Log In'
                          style={{ display: "none" }}
                          ref={c => {
                            this.checkBtn = c}}
                        />
                       </div>
                  </Form>
              <img className="img-login" src="literaturatesis.png" ></img>
          </div>
      );
  }
}

export default Login;
