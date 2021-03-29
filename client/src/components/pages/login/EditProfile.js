import React, { Component } from "react";
import { Redirect }from "react-router-dom";
import AuthService from "../../../services/authenticity/auth-service";
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username:'',
            surname:'',
            password:'',
            email:'',
            photo:'',
            currentUser:[]
        };
    }


    componentDidMount() {

        const currentUser = AuthService.getCurrentUser();
        this.setState( { currentUser: currentUser });

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

    render() {

        return (
            <>
                <div className="editPerfil-left">
                   <Button size="sm" variant="danger">
                        Eliminar cuenta
                   </Button>
                </div>
                <div className="container">
                    <h5>Modificar Datos</h5>
                    <Card className="card-profile">
                        <Card.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control  placeholder={this.state.currentUser.username} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Apellidos</Form.Label>
                                        <Form.Control  placeholder="apellidos" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Correo</Form.Label>
                                        <Form.Control  placeholder={this.state.currentUser.email} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control  placeholder="Password" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} >
                                        <Form.Label>Foto</Form.Label>
                                        <Form.File bsPrefix="form-file" id="exampleFormControlFile1" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Button  size="sm" bsPrefix="btn" variant="primary">
                                            Guardar
                                        </Button>
                                        <Button size="sm" bsPrefix="btn" variant="primary">
                                            Cancelar
                                        </Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </>
        );
    }
}
