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
        /**Obtiene los desafios del estudiante segun su grupo */
        StudentService.getChallenges(this.props.groupSelect).then(response => {
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


    disabledButtonEdit = (challenge,n) => {
        //si no tiene equipo o si el escrito ya esta finalizado  
        if (this.state.dataTeamStudent.length === 0)
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

    disabledButtonCreate = (challenge,n) => {
        //Si no tiene equipo 
        if (this.state.dataTeamStudent.length === 0 )
            return true;

        

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
    showNameTeam = () => {
        if (this.state.dataTeamStudent.length > 0) {
            return this.state.dataTeamStudent[0].nombreEquipo
        }
    }

    /*Dibuja la pagina  */
    render() {
        let formatedDate;
        const { data } = this.state;
        let n = false;
        let idWriting = '';
        return (
            <div className="table-margin">
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            {/* <th className ="challenge-th">idDesafio</th> */}
                            <th className="challenge-th">Desafio</th>
                            <th className="challenge-th">Equipo</th>
                            <th className="challenge-th">categoria</th>
                            <th className="challenge-th">tipo</th>
                            <th className="challenge-th">fecha</th>
                            <th className="challenge-th">Hora</th>
                            {/* <th>activo</th> */}
                            {/* <th className="challenge-th">Acciones</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter(challenge1 => challenge1.colaborativo === 2).map((challenge) => (
                            <tr key={challenge.id}>
                                {/* <td className ="challenge-td">{challenge.id}</td> */}
                                <td className="challenge-td">{challenge.titulo}</td>
                                <td>{this.showNameTeam()}</td>
                                {/* <td>{challenge.tipoCalificacion}</td> */}
                                <td className="challenge-td">{challenge.nombre}</td>
                                {/* <td className ="challenge-td">{challenge.colaborativo}</td> */}
                                <td className="challenge-td">{this.showCollaborative(challenge)}</td>
                                <td className="challenge-td">{formatedDate = moment(challenge.fechaFin).format('DD/MM/YYYY')}</td>
                                <td className="challenge-td">{formatedDate = moment(challenge.fechaFin).format('LT')}</td>
                                {/* <td>{challenge.activo}</td> */}

                                {n = false}
                                {/* Si el desafio tiene un escrito*/}
                                {this.state.dataWritingTeam.filter(writing => writing.idDesafio === challenge.id)
                                    .map((item, index) => {
                                        n = true;
                                        idWriting = item.id;
                                    }
                                    )}
                                <td className="challenge-td"><Link to={`/student/writing/${this.props.groupSelect}/${challenge.id}`}><Button variant="outline-primary" disabled={this.disabledButtonCreate(challenge,n)}>Nuevo Escrito</Button></Link></td>
                                <td className="challenge-td"><Link to={`/student/editWriting/${this.props.groupSelect}/${challenge.id}/${idWriting}`}><Button variant="outline-primary" disabled={this.disabledButtonEdit(challenge,n)}>Editar Escrito</Button></Link></td>
                                
                                <td className="challenge-td"><Link to={`/student/editWritingTeam/${this.props.groupSelect}/${challenge.id}/${idWriting}`}><Button variant="outline-primary" disabled={this.disabledButtonEdit(challenge,n)}>Editar Escrito Team</Button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ChallengesTeam;