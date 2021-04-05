import React, { Component } from "react";
import { Redirect }from "react-router-dom";
import AuthService from "../../../services/authenticity/auth-service";
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Alert from "react-bootstrap/Alert";
import {isEmail} from "validator";

const required = value => {
    if (!value) {
        return (
            <Alert variant="danger" bsPrefix="alert-login">
                Los campos deben contener algún dato
            </Alert>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <Alert variant="danger" bsPrefix="alert-login">
                Este correo no es valido.
            </Alert>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <Alert variant="danger" bsPrefix="alert-login">
                El nombre del usuario debe tener entre 3 a 20 caracteres.
            </Alert>
        );
    }
};

const vsurname = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <Alert variant="danger" bsPrefix="alert-login">
                El Apellido del usuario debe tener entre 3 a 20 caracteres.
            </Alert>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <Alert variant="danger" bsPrefix="alert-login">
                La contraseña debe tener entre 6 y 40 caracteres.
            </Alert>
        );
    }
};

const vconfirmpassword= value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <Alert variant="danger" bsPrefix="alert-login">
                La contraseña debe tener entre 6 y 40 caracteres.
            </Alert>
        );
    }
};

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onModal = this.onModal.bind(this);

        this.state = {

            stateModal:false,
            currentUser:[],
             updateUser : {
                 username: '',
                 surname: '',
                 password: '',
                 confirmPassword: '',
                 email: '',
                 photo: '',
             }
        };
    }


    componentDidMount() {

        const currentUser = AuthService.getCurrentUser();
        this.setState( { currentUser: currentUser });
        this.setState({
           updateUser:{
               ...this.state.updateUser,
               username: currentUser.username,
               surname: currentUser.surname,
               email: currentUser.email,
           }
        });

    }

    onChangeUsername(e) {

        if(e.target.value != this.state.currentUser.username) {
            this.setState({
                updateUser: {
                    ...this.state.updateUser,
                    username: e.target.value
                }
            });
        }
    }

    onChangeSurname(e) {

        if(e.target.value != this.state.currentUser.surname) {
            this.setState({
                updateUser: {
                    ...this.state.updateUser,
                    surname: e.target.value
                }
            });
        }
    }


    onChangeEmail(e) {

        if(e.target.value != this.state.currentUser.email) {
            this.setState({
                updateUser: {
                    ...this.state.updateUser,
                    email: e.target.value
                }
            });
        }
    }

    onChangePassword(e) {

         if(e.target.value != this.state.currentUser.password) {
             this.setState({
                 updateUser: {
                     ...this.state.updateUser,
                     password: e.target.value
                 }
             });
         }
    }

    onChangeConfirmPassword(e) {

        this.setState({
            updateUser: {
                ...this.state.updateUser,
                confirmPassword: e.target.value
            }
        });
    }

    onModal(modal) {

        this.setState({
            stateModal: modal
        });
    }

    //Carga los ficheros multimedia del escrito
    onFileChange(e) {

        if(e.target.value) {
            this.setState({
                updateUser: {
                    ...this.state.updateUser,
                    photo: e.target.value
                }
            });
        }
    }


    logout () {
        AuthService.logout();
    }

    editProfile() {

       if (this.state.updateUser.password == this.state.updateUser.confirmPassword) {
            AuthService.editProfile(this.state.currentUser.id, this.state.updateUser.username, this.state.updateUser.surname,
                this.state.updateUser.email,this.state.updateUser.password, this.state.updateUser.photo).then(response => {
                  this.logout();
                   window.location.href='/login';
            }).catch(error => {
                console.log(error.message);
            })
        }
       else
       {
            alert("Ambas contraseñas no coinciden");
       }
    }


    render() {
        return (
            <>
                <div className="editPerfil-left">
                   <Button  variant="danger">
                        Eliminar cuenta
                   </Button>
                </div>
                <div className="container">
                    <label className="form-label">Modificar Datos</label>
                    <Card className="card-profile">
                        <Card.Body>
                        <div className="row">
                            <Form
                                onSubmit={this.handleRegister}
                                ref={c => {
                                    this.form = c;
                                }}
                            >
                                {!this.state.successful && (
                                        <ul className="flex-container wrap">
                                            <li className="flex-item">
                                                <label className="form-label">Nombre</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="username"
                                                    placeholder={this.state.currentUser.username}
                                                    value={this.state.username}
                                                    onChange={this.onChangeUsername}
                                                    validations={[required, vusername]}
                                                />
                                            </li>
                                            <li className="flex-item">
                                                <label className="form-label">Apellidos</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="surname"
                                                    placeholder={this.state.currentUser.surname}
                                                    value={this.state.updateUser.surname}
                                                    onChange={this.onChangeSurname}
                                                    validations={[required, vsurname]}
                                                />
                                            </li>
                                            <li className="flex-item">
                                                <label className="form-label">Correo</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="email"
                                                    placeholder={this.state.currentUser.email}
                                                    value={this.state.updateUser.email}
                                                    onChange={this.onChangeEmail}
                                                    validations={[required, email]}
                                                />
                                            </li>
                                            <li className="flex-item-file">
                                                <label className="form-label">Foto de perfil</label>
                                                <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                                            </li>
                                            <li className="flex-item">
                                                <label className="form-label">Contraseña</label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    placeholder="Nueva contraseña"
                                                    value={this.state.updateUser.password}
                                                    onChange={this.onChangePassword}
                                                    validations={[required, vpassword]}
                                                />
                                            </li>
                                            <li className="flex-item">
                                                <label className="form-label">Confirmar contraseña</label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    name="confirmpassword"
                                                    placeholder="Confirmar nueva contraseña"
                                                    value={this.state.updateUser.confirmPassword}
                                                    onChange={this.onChangeConfirmPassword}
                                                    validations={[required, vconfirmpassword]}
                                                />
                                            </li>
                                        </ul>

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
                            </div>
                            <div className="row-edit">
                                <div className="section-card">
                                    <div className="form-select">
                                        <Button onClick={()=> this.onModal(true)}>Guardar</Button>
                                    </div>
                                    <div className="form-select">
                                        <Button href="/profile">Cancelar</Button>
                                    </div>
                                </div>
                           </div>
                            <Modal
                                centered
                                show={this.state.stateModal}
                                onHide={this.state.stateModal}
                            >
                                <Modal.Header>
                                    Aviso
                                </Modal.Header>
                                <Modal.Body>
                                    <p>
                                        ¿Esta seguro de aplicar estos cambios?
                                         Deberá iniciar nuevamente sesión de su cuenta
                                    </p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.onModal(false)}>No</Button>
                                    <Button variant="primary" onClick={() => this.editProfile()}>Aceptar los Cambios</Button>
                                </Modal.Footer>
                            </Modal>
                        </Card.Body>
                    </Card>
                </div>
            </>
        );
    }
}
