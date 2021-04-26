import React, { Component } from 'react';
import { Link } from "react-router-dom";

import StudentService from '../../../services/student/student-service.js';

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

//Fecha y Hora
import moment from 'moment';

// Componentes estilos
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//Estilos
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';

class WritingsStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        //obtiene los escritos del estudiante
        if (this.props.groupSelect === undefined) {
            StudentService.getWritings(AuthUser.getCurrentUser().id)
                .then(response => {
                    this.setState({ data: response.data });
                })
                .catch(error => {
                    console.log(error.message);
                })
        }
        else {
            StudentService.getWritingsStudent(AuthUser.getCurrentUser().id, this.props.groupSelect)
                .then(response => {
                    this.setState({ data: response });
                })
                .catch(error => {
                    console.log(error.message);
                })
        }
    }

    //Devuelve string del escrito finalizado
    showWritingFinalized = (writing) => {
        if (writing.finalizado === 1)
            return "Si"
        else
            return "No"
    }

    //Devuelve string del desafio finalizado
    showChallengeFinalized = (writing) => {
        var dateActual = new Date();
        var dateFin = new Date(writing.fechaFin)//fecha fin del desafio
        //si ya se paso la fecha del desafio, desactivar button
        if (dateActual.getTime() > dateFin.getTime())
            return "Si"
        else
            return "No"
    }

    challengeFinalized = (writing) => {
        var dateActual = new Date();
        var dateFin = new Date(writing.fechaFin)//fecha fin del desafio
         //si ya se paso la fecha del desafio, desactivar button
        if (dateActual.getTime() > dateFin.getTime())
            return true;
        else
            return false;
    }

    /*Dibuja la pagina  */
    render() {
        let formatedDate;
        let { data } = this.state;
        return (
            <div className="container">
             <Card>
                 <Card.Body className="card-login">
                    <div className="table-margin">
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th >Escrito</th>
                                    <th >Grupo</th>
                                    <th >Desafío</th>
                                    <th>Desafio Finalizado</th>
                                    <th >Estudiante</th>
                                    <th >Fecha</th>
                                    <th >Hora</th>
                                    {/* <th>Corregido</th> */}
                                    {/* <th >Puntuación</th> */}
                                    <th >Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((writing) => (
                                    < tr key={writing.id} >
                                        <td>{writing.nombreEscrito}</td>
                                        <td>{writing.nombreGrupo}</td>
                                        <td>{writing.nombreDesafio}</td>
                                        <td>{this.showChallengeFinalized(writing)}</td>
                                        <td>{writing.nombre} {writing.apellidos}</td>
                                        <td >{formatedDate = moment(writing.fecha).format('DD/MM/YYYY')}</td>
                                        <td >{formatedDate = moment(writing.fecha).format('LT')}</td>
                                        {/* <td>{this.showWritingFinalized(writing)}</td> */}
                                        {/* <td>{writing.puntuacion}</td> */}
                                        {this.challengeFinalized(writing) ? (
                                            <td><Link to={`/student/viewWriting/${this.props.groupSelect}/${writing.idDesafio}/${writing.id}`} ><Button variant="outline-primary" disabled={writing.finalizado === 1 ? false : true}>Ver Escrito</Button></Link></td>
                                        ) : (
                                            <td ><Link to={`/student/editWriting/${writing.idGrupo}/${writing.idDesafio}/${writing.id}`}><Button variant="outline-primary" disabled={this.challengeFinalized(writing)}>Editar Escrito</Button></Link></td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                 </Card.Body>
             </Card>
            </div>
        );
    }
}

export default WritingsStudent;