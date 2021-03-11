/*
*  Name_file :GroupTeacher.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import StudentService from '../../../services/student/student-service.js';
import moment from 'moment';
//import CreateChallenge from './CreateChallenge.js';
<<<<<<< HEAD
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
       
=======
import { Link } from "react-router-dom";

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
>>>>>>> luis
        StudentService.getChallenges(this.props.groupSelect).then(response => {
            this.setState({ data: response });
        }).catch(error => {
            console.log(error.message);
        })

<<<<<<< HEAD
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
=======
        /**Obtiene los escritos del estudiante segun su grupo */
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
            <div>
                <table>
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

                                <td className ="challenge-td"><Link to={`/student/writing/${this.props.groupSelect}/${challenge.id}`}><button disabled={n}>Nuevo Escrito</button></Link></td>
                                {/* <td><Link to={`/student/editWriting/${this.props.groupSelect}/${challenge.id}`}><button disabled={e}>Editar Escrito</button></Link></td> */}
                                <td className ="challenge-td"><Link to={`/student/editWriting/${this.props.groupSelect}/${challenge.id}/${idWriting}`}><button disabled={e}>Editar Escrito</button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
>>>>>>> luis
            </div>
        );
    }
}

export default Challenges;