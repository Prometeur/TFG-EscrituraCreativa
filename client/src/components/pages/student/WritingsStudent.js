import React, { Component } from 'react';
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

class WritingsStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        }

    }


    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
    si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {

        //obtiene los escritos del estudiante
        StudentService.getWritingsStudent(AuthUser.getCurrentUser().id, this.props.groupSelect)
            .then(response => {
                this.setState({ data: response });
            })
    }

    /*Dibuja la pagina  */
    render() {
        let formatedDate;
        let { data } = this.state;
        return (
            <>
                <div className="table-margin">
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th >Desafío</th>
                                <th >Autor</th>
                                <th >Autor</th>
                                <th >Puntuación</th>
                                <th >Fecha</th>
                                <th >Hora</th>
                                <th >Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((writing) => (
                                <tr>
                                    <td>{writing.nombreDesafio}</td>
                                    <td>{writing.nombre}</td>
                                    <td>{writing.apellidos}</td>
                                    <td>{writing.puntuacion}</td>
                                    <td >{formatedDate = moment(writing.fecha).format('DD/MM/YYYY')}</td>
                                    <td >{formatedDate = moment(writing.fecha).format('LT')}</td>
                                    <td>
                                        {/* <button>Ver</button> */}

                                    </td>
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

export default WritingsStudent;