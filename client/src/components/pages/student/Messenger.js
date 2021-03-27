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

//Estilos
import '../../../styles/styleGeneral.css';

class Messenger extends Component {

    constructor(props) {
        super(props);
        //const dataUser = AuthUser.getCurrentUser();
        this.state = {
            dataMessages: [],
            showMessages: false
            // dataTeamStudent: []
        }
    }

    componentDidMount() {
        //Obtiene los mensajes del usuario 
        StudentService.getMessages(AuthUser.getCurrentUser().id)
            .then(response => {
                if (response.length > 0) {
                    this.setState({
                        dataMessages: response,
                        showMessages: true,
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


    /*Dibuja la pagina  */
    render() {
        const { showMessages } = this.state;
        let formatedDate;
        return (
            <>
                <div className="table-margin">

                    {showMessages ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Emisor</th>
                                    {/* <th>Correo</th> */}
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
                                            <div className="message-text"><td>{message.mensaje}</td></div>

                                            {/* <td><textarea name="mensaje" rows="1" cols="30" value ={message.mensaje} readOnly = {true} ></textarea></td> */}
                                            <td>{formatedDate = moment(message.fecha).format('DD/MM/YYYY')}</td>
                                            <td>{formatedDate = moment(message.fecha).format('LT')}</td>
                                            <td><Link to={`/student/message/${message.id}`}><Button >Ver</Button></Link></td>
                                            {/* <td><Link to={`/teacher/createChallenge/${this.props.groupSelect}`}><button >Eliminar</button></Link></td> */}

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    ) : (
                        <div >No hay mensajes</div>
                    )}

                    {/* <td><Link to={`/teacher/createChallenge/${this.props.groupSelect}`}><button >Crear Desafio</button></Link></td> */}
                </div>
            </>
        );
    }
}

export default Messenger;