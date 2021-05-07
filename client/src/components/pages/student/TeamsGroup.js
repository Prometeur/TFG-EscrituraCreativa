/*
*  Name_file: TeamsGroup.js
*  Description: Pagina que muestra listado de equipos que hay en el grupo , contiene la vista de todos los equipos del grupo
*  que tiene el estudiante
*/

import React, { Component } from 'react';
import { Link } from "react-router-dom";

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/**Servicios del estudiante */
import StudentService from '../../../services/student/student-service.js';

// Componentes estilos
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

//Estilos
import '../../../styles/styleGeneral.css';
import studentService from '../../../services/student/student-service.js';

class TeamsGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalSuccesfulSendJoinTeam: false,
            modalErrorSendRequest: false,//modal que informa de un error al enviar una solicitud para unirse a un equipo
            dataTeamsGroup: [],//contiene los equipos del grupo
            dataTeamStudent: [],//contiene tabla entera de equipoestudiante
            teamStudent: '',
            showTeams: false,
        }
    }

    componentDidMount() {
        //Obtiene los equipos del grupo 
        StudentService.getTeamsGroup(this.props.groupSelect)
            .then(response => {
                //si existen equipos en el grupo
                if (response.length != 0) {
                    this.setState({ dataTeamsGroup: response, showTeams: true });

                    /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
                    /**Esto lo hago para saber si tengo un equipo en el grupo*/
                    StudentService.getTeamStudentGroup(AuthUser.getCurrentUser().id, this.props.groupSelect)
                        .then(response => {
                            //Si tengo equipo
                            if (response.length != 0) {
                                this.setState({ teamStudent: response[0] });
                            }
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
            }).catch(error => {
                console.log(error.message);
            })
    }

    componentDidUpdate(pP, pS, sS) {
        var u = 1
        u = u + 1
        console.log("hola------>", u++);
        if(pS.dataTeamStudent != this.state.dataTeamStudent){
            console.log("algo ha cambiado");
        }
    }

    //Envia una solicitud
    sendRequest = (team) => {
        //si no estoy en ningun equipo o si el equipo no esta completo
        if (this.state.teamStudent === "") {
            var nombre = AuthUser.getCurrentUser().username;
            var apellidos = AuthUser.getCurrentUser().surname;
            var messageBody = "te envía una petición para unirse a tu equipo";
            var equipo = team.nombreEquipo;
            var grupo = team.nombreGrupo;
            var idGroup=this.props.groupSelect;
            var message = nombre + " " + apellidos + " " + messageBody + " " + equipo + " del Grupo de " + grupo;
            
            //si soy el creador
            if (team.idCreador === AuthUser.getCurrentUser().id) {
                console.log("Soy el creador");
            }
            else {//no soy el creador
                StudentService.sendMessage( idGroup,AuthUser.getCurrentUser().id, team.idCreador, team.idCreador, message, 2)
                    .then(response => {
                        this.showModalSuccesfulSendJoinTeam();

                    }).catch(error => {
                        console.log(error.message);
                    })
            }
        }
    }

    //activa/desactiva el boton de unirse a un equipo
    disabledButtonJoin = () => {
        //si no tengo equipo, desactivar boton unirse  o si el equipo esta completo
        if ((this.state.teamStudent !== ""))
            return true;
        else
            return null;
    }

    showModalSuccesfulSendJoinTeam = () => {
        this.setState({
            modalSuccesfulSendJoinTeam: true,
        });
        //cierra el modal despues de 3 segundos
        setTimeout(
            () => this.setState({ modalSuccesfulSendJoinTeam: false }),
            2000
        );
    };

    showModalErrorSendRequest = () => {
        this.setState({
            modalErrorSendRequest: true,
        });
        //cierra el modal despues de 3 segundos
        setTimeout(
            () => this.setState({ modalErrorSendRequest: false }),
            2000
        );
    };

    //Comprueba 
    askSendRequest = (team) => {
        var idGroup=this.props.groupSelect
        var idIssuer=AuthUser.getCurrentUser().id;
        var idCreatorTeam=team.idCreador;//creador del equipo
        //var idTeam=this.state.teamStudent.idEquipo;
        
        studentService.searchMessage(idGroup,idIssuer,idCreatorTeam).then(response => { 
         
            if(response.length === 0){
                console.log("se puede enviar solicitud");
                this.sendRequest(team)
            }
            else{
                this.showModalErrorSendRequest();
            }

       })
      .catch(error => {
          console.log(error.message);
      })
    };

    /*Dibuja la pagina  */
    render() {
        const { showTeams, dataTeamsGroup, dataTeamStudent } = this.state;
        return (
            <>
                <div className="container">
                    <Card className="card-long">
                        <Card.Body>
                            <div className="items-column"><h3>Lista de equipos</h3></div>
                            {showTeams ? (
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
                                            {dataTeamsGroup.map(team => {
                                                return (
                                                    <tr key={team.idEquipo}>
                                                        <td>{team.nombreEquipo}</td>
                                                        <td>{team.nombreGrupo}</td>
                                                        {dataTeamStudent.filter(teamStudent => teamStudent.idEquipo === team.idEquipo).map((item, index) =>
                                                            <tr> {item.nombre} {item.apellidos}</tr>
                                                        )}
                                                        <td ><Button onClick={() => this.askSendRequest(team)} disabled={this.disabledButtonJoin()}>Enviar Solicitud</Button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                    {/* <td><Link to={`/teacher/createChallenge/${this.props.groupSelect}`}><button >Crear Desafio</button></Link></td> */}
                                </div>
                            ) : (
                                <div className="table-margin">
                                    <p>Todavia no hay equipos para mostrar</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>
                <Modal show={this.state.modalSuccesfulSendJoinTeam}>
                    <Modal.Header>
                    </Modal.Header>
                    <Modal.Body>
                         <p> Petición enviada correctamente</p>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.modalErrorSendRequest}>
                    <Modal.Header>
                    </Modal.Header>
                    <Modal.Body>
                         <p> Ya has enviado una solicitud anteriormente</p>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default TeamsGroup;
