import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import '../../../styles/styleGeneral.css';
import '../../../styles/styleButton.css';
import '../../../styles/styleCard.css';
import Card from "react-bootstrap/Card";
import AuthService  from "../../../services/authenticity/auth-service";
import Alert from 'react-bootstrap/Alert';

const required = value => {
    if (!value) {
      return (
          <Alert variant="danger" bsPrefix="alert-heading">
            ¡Todos los campos son obligatorios!
          </Alert>
      );
    }
  };

  const email = value => {
    if (!isEmail(value)) {
      return (
          <Alert variant="danger" bsPrefix="alert-heading">
              Este correo no es valido.
          </Alert>
      );
    }
  };
  
  const vusername = value => {
    if (value.length < 3 || value.length > 20) {
      return (
          <Alert variant="danger" bsPrefix="alert-heading">
              El nombre del usuario debe tener entre 3 a 20 caracteres.
          </Alert>
      );
    }
  };

  const vsurname = value => {
    if (value.length < 3 || value.length > 20) {
      return (
          <Alert variant="danger" bsPrefix="alert-heading">
              El Apellido del usuario debe tener entre 3 a 20 caracteres.
          </Alert>
      );
    }
  };
  
  const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
          <Alert variant="danger" bsPrefix="alert-heading">
              La contraseña debe tener entre 6 y 40 caracteres.
          </Alert>
      );
    }
  };


class Register extends Component {
  
    constructor(props) {
      super(props);
     
      this.handleRegister = this.handleRegister.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeSurname = this.onChangeSurname.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
  
      this.state = {
        username: "",
        surname: "",
        email: "",
        password: "",
        successful: false,
        message: ""
      };
    }
  
    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      });
    }

    onChangeSurname(e) {
        this.setState({
          surname: e.target.value
        });
      }
    
  
    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      });
    }
  
    onChangePassword(e) {
      this.setState({
        password: e.target.value
      });
    }
  
    handleRegister(e) {
      e.preventDefault();
  
      this.setState({
        message: "",
        successful: false
      });
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
       
        AuthService.register(
          this.state.username,
          this.state.surname,
          this.state.email,
          this.state.password
        ).then(
          response => {
            this.setState({
              message: response.data.message,
              successful: true
            });
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
      }
    }
  
    render() {
      return (
        <div className="container">
          <Card className="card-register">
              <Card.Body>
                <Card.Title>Sign Up</Card.Title>
                <Form
                  onSubmit={this.handleRegister}
                  ref={c => {
                    this.form = c;
                  }}
                >
                  {!this.state.successful && (
                    <div className="form-group">
                        <Input
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="Nombre"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          validations={[required, vusername]}
                        />

                        <Input
                          type="text"
                          className="form-control"
                          name="surname"
                          placeholder="Apellido"
                          value={this.state.surname}
                          onChange={this.onChangeSurname}
                          validations={[required, vsurname]}
                        />

                        <Input
                          type="text"
                          className="form-control"
                          name="email"
                          placeholder="Correo"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          validations={[required, email]}
                        />

                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Contraseña"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[required, vpassword]}
                        />

                        <div className="box">
                            <button className="btn btn-white btn-animation-1"> Sign Up</button>
                        </div>
                    </div>
                  )}

                  {this.state.message && (
                    <div className="form-group">
                      <div
                        className={
                          this.state.successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {this.state.message}
                      </div>
                    </div>
                  )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>
              </Card.Body>
            </Card>
        </div>
      );
    }
  }
  
  export default Register;