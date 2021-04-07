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
//Estilos
import '../../../styles/styleGeneral.css';

class WritingsTeam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataTeamStudent: [],
            dataWritingTeam: [],
            data: []
        }
    }


    componentDidMount() {

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

    /*Dibuja la pagina  */
    render() {
        let formatedDate;
        let { dataWritingTeam } = this.state;
        return (
            <>
                <div className="table-margin">
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Desafio</th>
                                <th>Equipo</th>
                                <th>Puntuación</th>
                                <th>Fecha</th>
                                <th>Hora</th>

                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataWritingTeam.filter(writing1 => writing1.finalizado === 1).map((writing) => (
                                <tr key={writing.id} >
                                    <td>{writing.nombreDesafio}</td>
                                    <td>{writing.nombreEquipo}</td>
                                    <td>{writing.puntuacion}</td>
                                    <td >{formatedDate = moment(writing.fecha).format('DD/MM/YYYY')}</td>
                                    <td >{formatedDate = moment(writing.fecha).format('LT')}</td>
                                    <td><Link to={`/student/viewWriting/${this.props.groupSelect}/${writing.idDesafio}/${writing.id}`}><Button variant="outline-primary">Ver</Button></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* <button>Cancelar</button> */}

                </div>
            </>
        );
    }
}

export default WritingsTeam;