/*
*  Name_file :Login.js
*  Description: Pagina de inicio de sesion, contiene la vista del Login
*    
*/
import React, { Component } from 'react';
import AuthService  from "../../services/authenticity/auth-service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
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
        AuthService.login(this.state.username, this.state.password).then(
          response => {
            console.log(response.data);
            this.props.history.push("/profile");
            window.location.reload();
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              loading: false,
              message: resMessage
            });
          }
        );
      } 
      else 
      {
        this.setState({
          loading: false
        });
      }
  }


  render() {
      return (
          <div className='container'>
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
                <button className="btn btn-info btn-block login" > Login </button>
                <CheckButton
                text='Log In' 
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c}}
               />
              </Form>
          </div>
      );
  }
}

export default Login;
