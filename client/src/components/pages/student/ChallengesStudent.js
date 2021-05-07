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

/**Componentes estilos */
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//Estilos
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';

class ChallengesStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],//contiene desafios del estudiante
            dataWritingStudent: [],//contiene escritos del estudiante
            showChallenges: false,
        };
    }

    componentDidMount() {
        if (this.props.groupSelect === undefined) {
            //obtener desafios iduser y type(individual=1 o colaborativo=2)
            StudentService.getChallengesIndividual(AuthUser.getCurrentUser().id, 1)
                .then(response => {
                    if (response.length !== 0) {
                        this.setState({ data: response, showChallenges: true });
                    }

                }).catch(error => {
                    console.log(error.message);
                })

            StudentService.getWritings(AuthUser.getCurrentUser().id)
                .then(response => {
                    if (response.data.length !== 0) {
                        this.setState({ dataWritingStudent: response.data, showChallenges: true });
                    }
                })
        }
        else {
            /**Obtiene los desafios del estudiante segun su grupo */
            StudentService.getChallenges(this.props.groupSelect, 1)
                .then(response => {

                    this.setState({ data: response });
                }).catch(error => {
                    console.log(error.message);
                })

            /**Obtiene los escritos del estudiante segun su grupo */
            StudentService.getWritingsStudent(AuthUser.getCurrentUser().id, this.props.groupSelect)
                .then(response => {
                    this.setState({ dataWritingStudent: response });
                }).catch(error => {
                    console.log(error.message);
                })
        }
    }

    disabledButton = (challenge) => {
        var dateActual = new Date();
        var dateFin = new Date(challenge.fechaFin)
        //si ya se paso la fecha del desafio, desactivar button
        if (dateActual.getTime() > dateFin.getTime()) {
            return true;
        }
        else
            return false;
    };

    //Muestra el tipo de desafio
    showCollaborative = (challenge) => {
        if (challenge.colaborativo === 1)
            return "individual"
        else
            return "colaborativo"
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
        const { data, showChallenges } = this.state;
        let writingExist = false;
        let idWriting = '';
        let finish = '';
        let writingAux = '';
        return (
            <div className="container">
                <Card className="card-long">
                    <Card.Body>
                        <div className="items-column"><h3>Lista de desafios</h3></div>
                        {showChallenges ? (
                            <div className="table-margin">
                                <Table striped bordered hover >
                                    <thead>
                                        <tr>
                                            <th>Desafio</th>
                                            <th>Grupo</th>
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
                                                <td >{challenge.titulo}</td>
                                                <td >{challenge.nombreGrupo}</td>
                                                <td >{challenge.nombreCategoria}</td>
                                                <td >{this.showCollaborative(challenge)}</td>
                                                <td >{formatedDate = moment(challenge.fechaFin).format('DD/MM/YYYY')}</td>
                                                <td >{formatedDate = moment(challenge.fechaFin).format('LT')}</td>
                                                <td >{this.showChallengeFinalized(challenge)}</td>
                                                {writingExist = false}
                                                {this.state.dataWritingStudent.filter(writing => writing.idDesafio === challenge.id)
                                                    .map((item, index) => {
                                                        writingExist = true;
                                                        idWriting = item.id;
                                                        finish = item.finalizado;
                                                        writingAux = item;
                                                    }
                                                    )}
                                                <td ><Link to={`/student/writing/${challenge.idGrupo}/${challenge.id}`}><Button variant="outline-primary" disabled={this.disabledButton(challenge) || writingExist}>Crear Escrito</Button></Link></td>

                                                {/*
                                        {writingExist ? (
                                            <td ><Link to={`/student/editWriting/${challenge.idGrupo}/${challenge.id}/${idWriting}`}><Button variant="outline-primary" disabled={this.disabledButton(challenge)}>Editar Escrito</Button></Link></td>
                                        ) : (
                                            <td ><Link to={`/student/writing/${challenge.idGrupo}/${challenge.id}`}><Button variant="outline-primary" disabled={this.disabledButton(challenge)}>Nuevo Escrito</Button></Link></td>
                                        )}

                                        {writingExist && this.disabledButton(challenge) ? (
                                            <td><Link to={`/student/viewWriting/${challenge.idGrupo}/${challenge.id}/${idWriting}`} ><Button variant="outline-primary" disabled={!this.disabledButton(challenge)}>Ver</Button></Link></td>
                                        ) : (
                                            <></>
                                        )} */}


                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div >
                        ) : (

                            <div className="table-margin">
                                <p>Todavia no dispones de desafios para mostrar</p>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </div>

        );
    }
}

export default ChallengesStudent;