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
import '../../../styles/styleGeneral.css';
import '../../../styles/styleButton.css';
import '../../../styles/styleCard.css';
import Card from "react-bootstrap/Card";

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
          <>
            <Card style={{ width: '20rem', height:'20rem' }}>
              <Card.Body>
                <Card.Title>Sign In</Card.Title>
                  <Form  
                    onSubmit={this.handleLogin}
                    ref= {c => {
                    this.form = c;
                    }}
                  >
                  <div className="form-group">
                        <Card.Subtitle> Usuario:</Card.Subtitle>
                        <Input 
                            type="text" 
                            name="username" 
                            value={this.state.username}
                            onChange={this.onChangeUsername} 
                            validations={[required]}

                        />
                        <Card.Subtitle> Password:</Card.Subtitle>
                        <Input
                            type="text" 
                            name="password"
                            value={this.state.password} 
                            onChange={this.onChangePassword}
                            validations={[required]}
                        />
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
          </>
      );
  }
}

export default Login;
