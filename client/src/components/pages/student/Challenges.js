/*
*  Name_file :GroupTeacher.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import StudentService from '../../../services/student/student-service.js';
import moment from 'moment';
//import CreateChallenge from './CreateChallenge.js';
import { Link} from "react-router-dom";

class Challenges extends Component {
   
    constructor(props) {
        super(props);
    
        this.state = {
            data: []
        };
    }


    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
   peticionGet(){
       
        StudentService.getChallenges(this.props.groupSelect).then(response => {
            this.setState({ data: response });
        }).catch(error => {
            console.log(error.message);
        })

   }


   componentDidMount() {
    
        this.peticionGet();

   }

    /*Dibuja la pagina  */
    render() {
        
        let formatedDate;
        const {data} = this.state;
    
        return (
         <div>    
             <table>
                    <thead>
                        <tr>
                            <th>idDesafio</th>
                            <th>idGrupo</th>
                            <th>Titulo</th>
                            <th>categoria</th>
                            <th>colaborativo</th>
                            <th>fecha</th>
                            <th>Hora</th>
                            <th>activo</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((challenge) => (
                                <tr key={challenge.id}>
                                        {/* <td>{challenge.id}</td>
                                        <td>{challenge.idGrupo}</td> */}
                                        <td>{challenge.titulo}</td>
                                        {/* <td>{challenge.descripcion}</td> */}
                                        {/* <td>
                                            <img src={challenge.imagen} height="50" width="50"/>
                                        </td> */}
                                        {/* <td>{challenge.tipoCalificacion}</td> */}
                                        <td>{challenge.categoria}</td>
                                        <td>{challenge.colaborativo}</td>
                                        {/* <td>{challenge.fechaIni}</td> */}
                                        <td>{challenge.fechaFin}</td>
                                        <td>{challenge.activo}</td>
                                    <td><Link to={`/student/groups/${this.props.groupSelect}/viewChallenge/${challenge.id}`}><button>Ver Desafio</button></Link></td>
                                    <td><Link to={`/student/groups/${this.props.groupSelect}/newWriting/${challenge.id}`}><button>Escrito</button></Link></td>
                                </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        );
    }
}

export default Challenges;