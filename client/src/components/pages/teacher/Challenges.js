/*
*  Name_file :GroupTeacher.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import TeacherService from '../../../services/teacher/teacherService';
import moment from 'moment';
//import CreateChallenge from './CreateChallenge.js';
import { Link} from "react-router-dom";

class Challenges extends Component {
   
    constructor(props) {
        super(props);
    
        this.state = {
            categories: [],
            data: [],
        };
    }

    peticionGet () {
        
        TeacherService.getChallenges(this.props.groupSelect).then(response => {
            this.setState({ data: response });
        }).catch(error => {
            console.log(error.message);
        })
    }
    


    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
       
        this.peticionGet(); 
         //carga las categorias del desafio al iniciar
        TeacherService.getCategories().then(response => {
            this.setState({categories: response });
            
        }).catch(error => {
            console.log(error.message);
        })
    }


    /*Dibuja la pagina  */
    render() {
        
        let formatedDate;
        const {categories,data} = this.state;
    
        return (
         <div>    
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
                                    <td>{challenge.id}</td>
                                    <td>{challenge.idGrupo}</td>
                                    <td>{challenge.titulo}</td>

                                    {categories.filter(category => category.id === challenge.idCategoria).map((item, index) =>
                                        <td>{item.nombre}</td>
                                    )}
                                    <td>{challenge.colaborativo}</td>
                                    <td>{formatedDate = moment(challenge.fechaFin).format('DD/MM/YYYY')}</td>
                                    <td>{formatedDate = moment(challenge.fechaFin).format('LT')}</td>
                                    <td>{challenge.activo}</td>
                                    
                                    <td><Link to={`/teacher/getGroups/${this.props.groupSelect}/editChallenge/${challenge.id}`}><button>Editar</button></Link></td>
                                    <td><Link to={`/teacher/getGroups/${this.props.groupSelect}/editChallenge/${challenge.id}`}><button>Borrar</button></Link></td>
                                </tr>
                        ))}
                    </tbody>
                 </table>
               </div>
                <Link to= {`/teacher/getGroups/createChallenge/${this.props.groupSelect}`}><button>Crear Desafio</button></Link>
            </div>
        );
    }
}

export default Challenges;