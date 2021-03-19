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
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import '../../../styles/styleGeneral.css';
/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

class Challenges extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            dataWriting: []
        };
    }

    componentDidMount() {

        /**Obtiene los desafios del estudiante segun su grupo */
        StudentService.getChallenges(this.props.groupSelect).then(response => {
            this.setState({ data: response });
        }).catch(error => {
            console.log(error.message);
        })

        /**Obtiene los desafios del estudiante segun su grupo */
        StudentService.getWritings(AuthUser.getCurrentUser().id, this.props.groupSelect).then(response => {
            this.setState({ dataWriting: response });
        }).catch(error => {
            console.log(error.message);
        })

    }


    prueba = (item,p) => {

        debugger;
        console.log(item);
    };

     //Obtiene el nombre del desafio/escrito
     showCollaborative = (challenge) => {
        if (challenge.colaborativo === 1){
            return "individual"
        }
        else{
            return "equipo"
        }
    }

    /*Dibuja la pagina  */
    render() {
        let formatedDate;
        const { data } = this.state;
        let e = false;
        let n = false;
        let idWriting = '';
        return (
            <div className="table-margin">
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            {/* <th className ="challenge-th">idDesafio</th> */}
                            <th className ="challenge-th">Desafio</th>
                            <th className ="challenge-th">categoria</th>
                            <th className ="challenge-th">tipo</th>
                            <th className ="challenge-th">fecha</th>
                            <th className ="challenge-th">Hora</th>
                            {/* <th>activo</th> */}
                            <th className ="challenge-th">acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((challenge) => (
                            <tr key={challenge.id}>
                                {/* <td className ="challenge-td">{challenge.id}</td> */}
                                <td className ="challenge-td">{challenge.titulo}</td>
                                {/* <td>{challenge.tipoCalificacion}</td> */}
                                <td className ="challenge-td">{challenge.nombre}</td>
                                {/* <td className ="challenge-td">{challenge.colaborativo}</td> */}
                                <td className ="challenge-td">{this.showCollaborative(challenge)}</td>
                                <td className ="challenge-td">{formatedDate = moment(challenge.fechaFin).format('DD/MM/YYYY')}</td>
                                <td className ="challenge-td">{formatedDate = moment(challenge.fechaFin).format('LT')}</td>
                                {/* <td>{challenge.activo}</td> */}

                                {e = true}{n = false}
                                {this.state.dataWriting.filter(writing => writing.idDesafio === challenge.id)
                                    .map((item, index) =>{
                                        n=true;
                                        e=false;
                                        idWriting=item.id;
                                    }
                                )}

                                <td className ="challenge-td"><Link to={`/student/writing/${this.props.groupSelect}/${challenge.id}`}><Button variant="outline-primary" disabled={n}>Nuevo Escrito</Button></Link></td>
                                {/* <td><Link to={`/student/editWriting/${this.props.groupSelect}/${challenge.id}`}><button disabled={e}>Editar Escrito</button></Link></td> */}
                                <td className ="challenge-td"><Link to={`/student/editWriting/${this.props.groupSelect}/${challenge.id}/${idWriting}`}><Button variant="outline-primary" disabled={e}>Editar Escrito</Button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Challenges;