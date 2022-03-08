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
            challenge: ''
        }
    
    }

    componentDidMount() {
        //obtiene las versiones del escrito del estudiante o del grupo
        StudentService.getVersionsfromWriting(this.props.match.params.idWriting)
            .then(response => {
                if (response.length !== 0) {
                    this.setState({ data: response.data, challenge: response.data[0].nombreDesafio });
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
        let { data, challenge } = this.state;
        return (
            <div class="container">
                <Card className="card-long">
                    <Card.Body>
                        {
                            <>
                            <div className={"row-edit"}>
                                <label className={"form-label"} htmlFor="">Lista de versiones</label>
                            </div>
                            <hr />
                            <ul className={"flex-row"}>
                                <li className={"flex-item-form"}>
                                    <label className='form-label'>Desafío</label>
                                    <h5> {challenge} </h5>
                                </li>
                            </ul>
                            <div className="row-edit">
                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th> Versión</th>
                                            <th> Título</th>
                                            <th >Estudiante</th>
                                            <th >Fecha de modificación</th>
                                            <th >Hora</th>
                                            <th >Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((writing) => (
                                            < tr key={writing.idEscrito}>
                                                <td>{writing.idVersion}</td>
                                                <td>{writing.nombreEscrito}</td>
                                                <td>{writing.nombre} {writing.apellidos}</td>
                                                <td >{formatedDate = moment(writing.fecha).format('DD/MM/YYYY')}</td>
                                                <td >{formatedDate = moment(writing.fecha).format('LT')}</td>
                                                <td >
                                                        <Link to={`/student/editVersionfromWriting/${writing.idGrupo}/${writing.idDesafio}/${writing.idEscrito}/${writing.idVersion}`}>
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
