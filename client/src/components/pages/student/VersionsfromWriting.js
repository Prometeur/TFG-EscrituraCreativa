import React, { Component } from "react";
import { Link } from "react-router-dom";
import StudentService from '../../../services/student/student-service.js';
import AuthUser from '../../../services/authenticity/auth-service.js';

//Fecha y Hora
import moment from 'moment';

import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

//Estilos
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';


class VersionsfromWriting extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            challenge: '', //contiene el desafio 
        }
    
    }


    componentDidMount() {
        //obtiene las versiones del escrito del estudiante o del grupo
        StudentService.getVersionfromWriting(this.props.match.params.idWriting, AuthUser.getCurrentUser().id)
            .then(response => {
                if (response.length !== 0) {
                    this.setState({ data: response.data });
                }
            })
            .catch(error => {
                console.log(error.message);
            })
    }


    //Devuelve el tipo de desafio
    showCollaborative = () => {
        if (this.state.challenge.colaborativo === 1) {
            return "Individual"
        }
        else {
            return "Colaborativo"
        }
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
            <div class="container">
                <Card className="card-long">
                    <Card.Body>
                        {
                            <>
                            <div className={"row-edit"}>
                                <label className={"form-label"} htmlFor="">Lista de escritos</label>
                            </div>
                            <div className="row-edit">
                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th >Escrito</th>
                                            <th> Version</th>
                                            <th >Desafío</th>
                                            <th >Estudiante</th>
                                            <th >Fecha</th>
                                            <th >Hora</th>
                                            <th >Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((writing) => (
                                            < tr key={writing.idEscrito}>
                                                <td>{writing.nombreEscrito}</td>
                                                <td>{writing.idVersion}</td>
                                                <td>{writing.nombreDesafio}</td>
                                                <td>{writing.nombre} {writing.apellidos}</td>
                                                <td >{formatedDate = moment(writing.fechaFin).format('DD/MM/YYYY')}</td>
                                                <td >{formatedDate = moment(writing.fechaFin).format('LT')}</td>

                                                <td >
                                                        <Link to={`/student/editVersionfromWriting/${writing.idGrupo}/${writing.idDesafio}/${writing.id}`}>
                                                            <img src="/edit.png" alt=""/>
                                                            <Button variant="link">
                                                                 Editar
                                                            </Button>
                                                       </Link>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            </>
                        }

                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default VersionsfromWriting;
