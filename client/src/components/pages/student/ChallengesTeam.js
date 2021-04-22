/*
*  Name_file :GroupTeacher.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import StudentService from '../../../services/student/student-service.js';
import moment from 'moment';
//import CreateChallenge from './CreateChallenge.js';
import { Link } from "react-router-dom";

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';


/**Estilos*/
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import '../../../styles/styleGeneral.css';

class ChallengesTeam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataTeamStudent: [],//Contiene el equipo del estudiante
            data: [],//contiene desafios del estudiante
            dataWritingTeam: [],//contiene escritos del equipo del estudiante
        };
    }

    componentDidMount() {
        if (this.props.groupSelect === undefined) {
            //obtener desafios idUser y type(individual=1 o colaborativo=2)
            StudentService.getChallengesIndividual(AuthUser.getCurrentUser().id, 2)
                .then(response => {
                    this.setState({ data: response });
                }).catch(error => {
                    console.log(error.message);
                })
            //obtiene los escritos colaborativos del estudiante
            StudentService.getWritingsCollaborative(AuthUser.getCurrentUser().id)
                .then(response => {
                 
                    this.setState({ dataWritingTeam: response.data });
                })
        }
        else {
            /**Obtiene los desafios del estudiante segun su grupo */
            StudentService.getChallenges(this.props.groupSelect, 2).then(response => {
                this.setState({ data: response });
            }).catch(error => {
                console.log(error.message);
            })

            /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
            StudentService.getTeamStudentGroup(AuthUser.getCurrentUser().id, this.props.groupSelect)
                .then(response => {
                    this.setState({ dataTeamStudent: response });
                    //si el estudiante tiene equipo
                    if (response.length != 0) {
                        /**Obtiene los escritos del equipo del estudiante */
                        StudentService.getWritingsTeam(response[0].idEquipo, this.props.groupSelect)
                            .then(response => {
                                this.setState({ dataWritingTeam: response });
                            }).catch(error => {
                                console.log(error.message);
                            })

                    }
                }).catch(error => {
                    console.log(error.message);
                })
        }
    }

    disabledButtonEdit = (challenge, n) => {
        //si no tiene equipo 
        if (this.state.dataWritingTeam.length === 0)
            return true;
        var dateActual = new Date();
        var dateFin = new Date(challenge.fechaFin)
        //si ya se paso la fecha del desafio, desactivar button
        if (dateActual.getTime() > dateFin.getTime()) {
            return true;
        }
        if (n)
            return false;
        else
            return true;
    };

    disabledButtonCreate = (challenge, n) => {     
        var dateActual = new Date();
        var dateFin = new Date(challenge.fechaFin)

        //si ya se paso la fecha del desafio, desactivar button
        if (dateActual.getTime() > dateFin.getTime()) {
            return true;
        }
        if (n)
            return true;
        else
            return false;
    };

    //Devuelve el tipo de desafio
    showCollaborative = (challenge) => {
        if (challenge.colaborativo === 1) {
            return "individual"
        }
        else {
            return "colaborativo"
        }
    }

    //Devuelve el nombre del equipo
    // showNameTeam = () => {
    //     if (this.state.dataTeamStudent.length > 0) {
    //         return this.state.dataTeamStudent[0].nombreEquipo
    //     }
    // }

    showNameTeam = () => {
        if (this.state.dataWritingTeam.length > 0) {
            return this.state.dataWritingTeam[0].nombreEquipo
        }
    }

    //Devuelve string de escrito finalizado
    showChallengeFinalized = (challenge) => {
        var dateActual = new Date();
        var dateFin = new Date(challenge.fechaFin)
        if (dateActual.getTime() > dateFin.getTime())
            return "Si"
        else
            return "No"
    }

    /*Dibuja la pagina  */
    render() {
        let formatedDate;
        const { data } = this.state;
        let existsWriting = false;
        let idWriting = '';
        return (
            <div className="table-margin">
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Desafio</th>
                            <th>Grupo</th>
                            {/* <th>Equipo</th> */}
                            <th>Categoria</th>
                            <th>Tipo</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Finalizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((challenge) => (
                            <tr key={challenge.id}>
                                <td>{challenge.titulo}</td>
                                <td>{challenge.nombreGrupo}</td>
                                {/* <td>{this.showNameTeam()}</td> */}
                                <td>{challenge.nombreCategoria}</td>
                                <td>{this.showCollaborative(challenge)}</td>
                                <td>{formatedDate = moment(challenge.fechaFin).format('DD/MM/YYYY')}</td>
                                <td>{formatedDate = moment(challenge.fechaFin).format('LT')}</td>
                                <td >{this.showChallengeFinalized(challenge)}</td>

                                {existsWriting = false}
                                {/* Si el desafio tiene un escrito*/}
                                {this.state.dataWritingTeam.filter(writing => writing.idDesafio === challenge.id)
                                    .map((item, index) => {
                                        existsWriting = true;
                                        idWriting = item.id;
                                    }
                                    )}
                                <td><Link to={`/student/writing/${challenge.idGrupo}/${challenge.id}`}><Button variant="outline-primary" disabled={this.disabledButtonCreate(challenge, existsWriting)}>Crear Escrito</Button></Link></td>

                                {/* <td><Link to={`/student/writing/${challenge.idGrupo}/${challenge.id}`}><Button variant="outline-primary" disabled={this.disabledButtonCreate(challenge, n)}>Nuevo Escrito</Button></Link></td>
                                <td><Link to={`/student/editWriting/${challenge.idGrupo}/${challenge.id}/${idWriting}`}><Button variant="outline-primary" disabled={this.disabledButtonEdit(challenge, n)}>Editar Escrito</Button></Link></td>
                                <td><Link to={`/student/editWritingTeam/${challenge.idGrupo}/${challenge.id}/${idWriting}`}><Button variant="outline-primary" disabled={this.disabledButtonEdit(challenge, n)}>Editar Escrito Team</Button></Link></td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ChallengesTeam;