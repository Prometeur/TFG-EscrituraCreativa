/*
*  Name_file: Teams.js
*  Description: Pagina de equipos del estudiante, contiene la vista de todos los equipos 
*  que tiene el estudiante
*    
*/

import React, { Component } from 'react';
import { Link } from "react-router-dom";

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/**Servicios del estudiante */
import StudentService from '../../../services/student/student-service.js';

// import {
//     Table,
//     Button,
//     Container,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     FormGroup,
//     ModalFooter,
// } from "reactstrap";

// Componentes estilos
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';

//Estilos
// import '../../../styles/styleGeneral.css';

class TeamsGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalSuccesfulSendJoinTeam: false,
            dataTeamsGroup: [],//contiene los equipos del grupo
            dataTeamStudent: [],//contiene tabla entera de equipoestudiante
            dataTeamStudentGroup: [],
            teamStudent: ''

        }
    }

    componentDidMount() {
        //Obtiene los equipos del grupo 
        StudentService.getTeamsGroup(this.props.groupSelect)
            .then(response => {
             
                this.setState({ dataTeamsGroup: response });
            }).catch(error => {
                console.log(error.message);
            })

        /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
        /**Esto lo hago para saber si tengo un equipo  */
        StudentService.getTeamStudentGroup(AuthUser.getCurrentUser().id, this.props.groupSelect)
            .then(response => {
            
                // this.setState({ dataTeamStudentGroup: response });
                this.setState({ teamStudent: response[0] });
            }).catch(error => {
                console.log(error.message);
            })

        //Me traigo la tabla entera de equipoestudiante
        StudentService.getTeamStudent()
            .then(response => {

                this.setState({ dataTeamStudent: response });

            }).catch(error => {
                console.log(error.message);
            })
    }

    //Obtiene el nombre del desafio
    sendRequest = (team, cont) => {
        //Obtiene los equipos con su grupo correspondiente del estudiante  

        //si no estoy en ningun equipo o si el equipo no esta completo
        // if (!this.state.teamStudent.idEquipo) {
        if (this.state.teamStudent === undefined) {
            var nombre = AuthUser.getCurrentUser().username;
            var apellidos = AuthUser.getCurrentUser().surname;
            var messageBody = "te envía una petición para unirse a tu equipo";
            var equipo = team.nombreEquipo;
            var grupo = team.nombreGrupo;

            var message = nombre + " " + apellidos + " " + messageBody + " " + equipo + " del Grupo de " + grupo;

            //si soy el creador
            if (team.idCreador === AuthUser.getCurrentUser().id) {
                console.log("Soy el creador");
            }
            else {//no soy el creador
                StudentService.sendMessage(AuthUser.getCurrentUser().id, team.idCreador, team.idCreador, message, 2)
                    .then(response => {
                        this.showModalSuccesfulSendJoinTeam();

                    }).catch(error => {
                        console.log(error.message);
                    })
            }
        }
        // StudentService.sendRequest(AuthUser.getCurrentUser().id,)
        //     .then(response => {


        //     }).catch(error => {
        //         console.log(error.message);
        //     })

    }

    //activa/desactiva el boton de unirse a un equipo
    disabledButtonJoin = () => {
        //si no tengo equipo, desactivar boton invitar o si no soy el creador del equipo desactivar boton invitar o si el equipo esta completo
        if ((this.state.teamStudent!==undefined))
            return true;
        else
            return null;
    }

    showModalSuccesfulSendJoinTeam = () => {

        this.setState({
            //   form: dato,
            modalSuccesfulSendJoinTeam: true,
        });
    };

    closeModalSuccesfulSendJoinTeam = () => {
        setTimeout(
            () => this.setState({ modalSuccesfulSendJoinTeam: false }),
            4000
        );
    };

    /*Dibuja la pagina  */
    render() {
        return (
            <>
                   <div className="table-margin">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Equipo</th>
                                <th>Grupo</th>
                                <th>Integrantes</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dataTeamsGroup.map(team => {
                                return (
                                    <tr key={team.idEquipo}>
                                        <td>{team.nombreEquipo}</td>
                                        <td>{team.nombreGrupo}</td>

                                        {this.state.dataTeamStudent.filter(teamStudent => teamStudent.idEquipo === team.idEquipo).map((item, index) =>
                                            <tr> {item.nombre} {item.apellidos}</tr>
                                        )}

                                        <td ><Button onClick={() => this.sendRequest(team)} disabled={this.disabledButtonJoin()}>Unirse</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    {/* <td><Link to={`/teacher/createChallenge/${this.props.groupSelect}`}><button >Crear Desafio</button></Link></td> */}
                </div>

                <Modal show={this.state.modalSuccesfulSendJoinTeam}>
                    <Modal.Header>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <FormGroup> */}
                            <p> Petición enviada correctamente</p>
                            {this.closeModalSuccesfulSendJoinTeam()}
                        {/* </FormGroup> */}

                    </Modal.Body>

                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default TeamsGroup;