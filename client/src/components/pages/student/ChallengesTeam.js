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
import Card from "react-bootstrap/Card";
import Alert from 'react-bootstrap/Alert';

//Estilos
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';

class ChallengesTeam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataTeams: [],//Contiene los equipos del estudiante
            dataTeamStudent: [],//Contiene el equipo del estudiante
            data: [],//contiene desafios del estudiante
            dataWritingTeam: [],//contiene escritos del equipo del estudiante
            showChallenges: false,
        };
    }

    componentDidMount() {
        if (this.props.groupSelect === undefined) {
            //obtener desafios idUser y type(individual=1 o colaborativo=2)
            // StudentService.getChallengesIndividual(AuthUser.getCurrentUser().id, 2)
            //     .then(response => {
            //         if (response.length !== 0) {
            //             this.setState({ data: response, showChallenges: true });
            //         }
            //     }).catch(error => {
            //         console.log(error.message);
            //     })

            StudentService.getTeams(AuthUser.getCurrentUser().id)
                .then(responseTeams => {
                    //si el usuario tiene equipos puede ver  desafios
                    if (responseTeams.length != 0) {
                        this.setState({ dataTeams: responseTeams });
                        StudentService.getChallengesIndividual(AuthUser.getCurrentUser().id, 2)
                            .then(responseChallenges => {
                                //si existen desafios colaborativos
                                if (responseChallenges.length !== 0) {
                                    this.setState({ data: responseChallenges, showChallenges: true });
                                    //obtiene los escritos colaborativos del estudiante
                                    StudentService.getWritingsCollaborative(AuthUser.getCurrentUser().id)
                                        .then(responseWritings => {
                                            this.setState({ dataWritingTeam: responseWritings.data });
                                        })
                                }
                            }).catch(error => {
                                console.log(error.message);
                            })
                    }
                    else {
                        this.setState({ showChallenges: false });
                    }

                }).catch(error => {
                    console.log(error.message);
                })


            // //obtiene los escritos colaborativos del estudiante
            // StudentService.getWritingsCollaborative(AuthUser.getCurrentUser().id)
            //     .then(responseWritings => {
            //         this.setState({ dataWritingTeam: responseWritings.data });
            //     })
        }
        else {
            /**Obtiene los desafios del estudiante segun su grupo */
            StudentService.getChallenges(this.props.groupSelect, 2).then(response => {
                if (response.length !== 0) {
                    this.setState({ data: response, showChallenges: true });
                }
            }).catch(error => {
                console.log(error.message);
            })

            
            /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
            StudentService.getTeamStudentGroup(AuthUser.getCurrentUser().id, this.props.groupSelect)
                .then(respuesta => {
                   
                    //si el estudiante tiene equipo
                    if (respuesta.length != 0) {
                        this.setState({ dataTeams: respuesta });
                        /**Obtiene los escritos del equipo del estudiante */
                        StudentService.getWritingsTeam(respuesta[0].idEquipo, this.props.groupSelect)
                            .then(response => {
                                this.setState({ dataWritingTeam: response });
                            }).catch(error => {
                                console.log(error.message);
                            })
                    }
                    else {
                        this.setState({ showChallenges: false });
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

    disabledButtonCreate = (challenge, n, existsTeam) => {


        //si no tiene equipo en el grupo de ese desafio
        if (!existsTeam) {
            return true;
        }
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
        const { data, showChallenges, dataWritingTeam, dataTeams } = this.state;
        let existsWriting = false;
        let existsTeam = false;
        let idWriting = '';
        let formatedDate;
        let writingAux = '';
        return (
            <div className="container">
                <Card className="card-long">
                    <Card.Body>
                        {showChallenges ? (
                            <div className="table-margin">
                                <h3>Lista de escritos</h3>
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
                                                {existsTeam = false}
                                                {/* Si el desafio tiene un escrito*/}
                                                {dataWritingTeam.filter(writing => writing.idDesafio === challenge.id)
                                                    .map((item, index) => {
                                                        existsWriting = true;
                                                        idWriting = item.id;
                                                        writingAux = item;
                                                    }
                                                    )}
                                                {dataTeams.filter(team => team.idGrupo === challenge.idGrupo)
                                                    .map((item, index) => {
                                                        existsTeam = true;
                                                    }
                                                    )}

                                                {/* <td><Link to={`/student/writing/${challenge.idGrupo}/${challenge.id}`}><Button variant="outline-primary" disabled={this.disabledButtonCreate(challenge, existsWriting, existsTeam)}>Crear Escrito</Button></Link></td> */}
                                                {existsTeam ? (
                                                    <td><Link to={`/student/writing/${challenge.idGrupo}/${challenge.id}`}><Button variant="outline-primary" disabled={this.disabledButtonCreate(challenge, existsWriting, existsTeam)}>Crear Escrito</Button></Link></td>
                                                ) : (
                                                    <></>

                                                )}

                                                {/* <td><Link to={`/student/writing/${challenge.idGrupo}/${challenge.id}`}><Button variant="outline-primary" disabled={this.disabledButtonCreate(challenge, n)}>Nuevo Escrito</Button></Link></td>
                                <td><Link to={`/student/editWriting/${challenge.idGrupo}/${challenge.id}/${idWriting}`}><Button variant="outline-primary" disabled={this.disabledButtonEdit(challenge, n)}>Editar Escrito</Button></Link></td>
                                <td><Link to={`/student/editWritingTeam/${challenge.idGrupo}/${challenge.id}/${idWriting}`}><Button variant="outline-primary" disabled={this.disabledButtonEdit(challenge, n)}>Editar Escrito Team Beta</Button></Link></td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>

                        ) : (
                            <div className="row-edit">
                                <Alert variant={"danger"}>
                                    No dispones de desafios para mostrar o no dispones de equipo.
                                </Alert>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default ChallengesTeam;