/*
*  Name_file: Collections.js
*  Description: Pagina de colecciones del estudiante, contiene la vista de todos los escritos 
*   que se han guardado en alguna colección.
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
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

//Estilos
 import '../../../styles/styleCard.css';

class Collections extends Component {

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

    }



    /*Dibuja la pagina  */
    render() {
        const { showTeamStudent,dataTeams } = this.state;
        return (
            <div className="container">
               <Card className="card-long">
                   <Card.Body>
                       <div className={"row-edit"}>
                           <div className={"section-title"}>
                               <h2>Listado de colecciones</h2>
                           </div>
                       </div>
                       <br/>
                        {showTeamStudent ? (
                            <>
                                {/* <div className="row-edit">
                                    <Alert variant={"info"}>
                                        <img src="/info.png" alt=""/>
                                        Desde aquí puedes gestionar todo sobre tus colecciones.
                                    </Alert>
                                </div> */}
                                <div className="row-edit">
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Equipo</th>
                                                <th>Grupo</th>
                                                <th>Integrantes</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataTeams.filter(team => team.activo === 1).map(team => {
                                                return (
                                                    <tr key={team.idEquipo}>
                                                        <td>{team.nombreEquipo}</td>
                                                        <td>{team.nombreGrupo}</td>
                                                        <td>
                                                        {this.state.dataTeamStudent.filter(teamStudent => teamStudent.idEquipo === team.idEquipo).map((item, index) =>
                                                            <div>{item.nombre} {item.apellidos}</div>
                                                        )}
                                                        </td>
                                                        <td>
                                                            <Link to={`/student/teamStudent/${team.idGrupo}`}>
                                                                <img src="/manage.png" alt=""/>
                                                                <Button variant="link">Gestionar</Button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </>
                        ) : (
                            <div className="row-edit">
                                <Alert variant={"danger"}>
                                    No dispones de equipos para mostrar.
                                </Alert>
                            </div>
                        )}
                   </Card.Body>
               </Card>
            </div>
        );
    }
}

export default Collections;