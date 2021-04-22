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

/*Componentes de estilo Bootstrap*/
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';


//Estilos
// import '../../../styles/styleGeneral.css';

class Teams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTeams: [],//contiene los equipos del estudiante
            dataTeamStudent: [],//contiene tabla entera de equipoestudiante
            dataAux: [],
            showTeamStudent: false,

        }
    }

    componentDidMount() {
        /*Obtiene todos los equipos del estudiante (de distintos grupos)*/
        StudentService.getTeams(AuthUser.getCurrentUser().id)
            .then(response => {
                if (response.length !== 0) {
                    this.setState({ dataTeams: response, showTeamStudent: true });
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

        /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
        /**Esto lo hago para saber si tengo un equipo  */
        // StudentService.getTeamStudentGroup(AuthUser.getCurrentUser().id, this.props.groupSelect)
        //     .then(response => {

        //         // this.setState({ dataTeamStudentGroup: response });
        //         this.setState({ teamStudent: response[0] });
        //     }).catch(error => {
        //         console.log(error.message);
        //     })
    }


    // prueba = (team) => {
    //     var aux=[];
    //     var devolver=[];
    //     StudentService.getMembersTeam(team.idEquipo)
    //     .then(response => {
    //         debugger;
    //         // var nombre;
    //         // response.filter(member1 => member1.idEstudiante === this.state.idLider).map((member) => ( 
    //         //     nombre = member.nombreEstudiante +" "+ member.apellidoEstudiante
    //         // ));
    //         aux.push([team,response])
    //         this.setState({ dataAux: aux });

    //     }).catch(error => {
    //         console.log(error.message);
    //     })

    // };

    /*Dibuja la pagina  */
    render() {
        const { showTeamStudent } = this.state;
        return (
            <>
                {showTeamStudent ? (
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
                                {this.state.dataTeams.map(team => {
                                    return (
                                        <tr key={team.idEquipo}>
                                            <td>{team.nombreEquipo}</td>
                                            <td>{team.nombreGrupo}</td>
                                            {this.state.dataTeamStudent.filter(teamStudent => teamStudent.idEquipo === team.idEquipo).map((item, index) =>
                                                <tr>{item.nombre} {item.apellidos}</tr>
                                            )}
                                            <td><Link to={`/student/teamStudent/${team.idGrupo}`}><Button  >Gestionar</Button></Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        {/* <td><Link to={`/teacher/createChallenge/${this.props.groupSelect}`}><button >Crear Desafio</button></Link></td> */}
                    </div>
                ) : (

                    <div className="table-margin">
                        
                        <p>Todavia no dispones de un equipo para mostrar</p>
                    </div>
                )}
            </>
        );
    }
}

export default Teams;