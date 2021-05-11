/*
*  Name_file: Messenger.js
*  Description: Pagina de equipos del estudiante, contiene la vista de todos los equipos 
*  que tiene el estudiante
*    
*/
import React, { Component } from 'react';
import { Link } from "react-router-dom";

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/*Importacion del css*/
import '../../../styles/Writing.css';
import '../../../styles/Student.css';

import moment from 'moment';

/**Servicios del estudiante */
import StudentService from '../../../services/student/student-service.js';

// Componentes estilos
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Card from "react-bootstrap/Card";

//Estilos
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';

class Messenger extends Component {

    constructor(props) {
        super(props);
        //const dataUser = AuthUser.getCurrentUser();
        this.state = {
            dataMessages: [],
            showMessages: false,
            modalDeleteMessage: false,
            // dataTeamStudent: []
        }
    }

    componentDidMount() {
        //Obtiene los mensajes del usuario 
        StudentService.getMessages(AuthUser.getCurrentUser().id)
            .then(response => {
                if (response.length > 0) {
                    debugger;
                    this.setState({
                        dataMessages: response,
                        showMessages: true,
                        deleteMessage: "",
                    });

                }

            }).catch(error => {
                console.log(error.message);
            })

        // StudentService.getTeamStudent()
        // .then(response => {
        //     // debugger;
        //     this.setState({ dataTeamStudent: response });

        // }).catch(error => {
        //     console.log(error.message);
        // })

    }

    deleteMessage = (message) => {
        this.closeModalDeleteMessage();
        var contador = 0;
        var arreglo = this.state.dataMessages;
        arreglo.map((registro) => {
            if (message.id === registro.id) {
                arreglo.splice(contador, 1);
            }
            contador++;
        });
        this.setState({ dataMessages: arreglo });
        if(arreglo.length===0){
            this.setState({ showMessages: false });
        }
        StudentService.deleteMessage(message.id).then(response => {
        }).catch(error => {
            console.log(error.message);
        })
    }

    askDeleteMessage = (message) => {
        this.setState({
            modalDeleteMessage: true,
            deleteMessage: message
        });
    }
    //Cierra el modal de eliminar fichero
    closeModalDeleteMessage = () => {
        this.setState({ modalDeleteMessage: false });
    };

    /*Dibuja la pagina  */
    render() {
        const { showMessages } = this.state;
        let formatedDate;
        return (
            <>
                <div className="container">
                    <Card className="card-long">
                        <Card.Body>
                            <div className="items-column"><h3>Lista de mensajes</h3></div>

                            {showMessages ? (
                                <div className="table-margin">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Emisor</th>
                                                <th>Grupo</th>
                                                <th>Mensaje</th>
                                                <th>Fecha</th>
                                                <th>Hora</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.dataMessages.map(message => {
                                                return (
                                                    <tr key={message.id}>
                                                        {/* <td>{message.nombreEmisor}</td> */}
                                                        <td>{message.correo}</td>
                                                        {/* width: 230px;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                        overflow: hidden; */}
                                                        {/* <div style={{ width: "210px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}><td>{message.mensaje}</td></div> */}
                                                        <td>{message.nombreGrupo}</td>
                                                        <div className="message-text"><td>{message.mensaje}</td></div>

                                                        {/* <td><textarea name="mensaje" rows="1" cols="30" value ={message.mensaje} readOnly = {true} ></textarea></td> */}
                                                        <td>{formatedDate = moment(message.fecha).format('DD/MM/YYYY')}</td>
                                                        <td>{formatedDate = moment(message.fecha).format('LT')}</td>
                                                        <td><Link to={`/student/message/${message.id}`} ><Button size="sm">Ver</Button></Link></td>

                                                        <td ><Button variant="danger" size="sm" onClick={() => this.askDeleteMessage(message)}>Eliminar</Button></td>

                                                        {/* <td><Link to={`/teacher/createChallenge/${this.props.groupSelect}`}><button >Eliminar</button></Link></td> */}

                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="table-margin">
                                    <p>Todavia no dispones de mensajes para mostrar</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>

                {/* <td><Link to={`/teacher/createChallenge/${this.props.groupSelect}`}><button >Crear Desafio</button></Link></td> */}


                <Modal show={this.state.modalDeleteMessage}>
                    <Modal.Header>
                        <div><h5>¿Seguro que desea eliminar el mensaje?</h5> </div>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <FormGroup>
                        </FormGroup> */}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.deleteMessage(this.state.deleteMessage)}>Aceptar</Button>
                        <Button variant="danger" onClick={() => this.closeModalDeleteMessage()}>Cancelar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Messenger;