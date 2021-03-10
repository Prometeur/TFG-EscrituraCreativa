/*
*  Name_file :GroupTeacher.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import TeacherService from '../../../services/teacher/teacherService';
import moment from 'moment';
import { Link} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import '../../../styles/styleGeneral.css';

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
         <>
            <div className="table-margin">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Colaborativo</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Activo</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((challenge) => (
                                <tr key={challenge.id}>
                                    <td>{challenge.titulo}</td>
                                    {categories.filter(category => category.id === challenge.idCategoria).map((item, index) =>
                                        <td>{item.nombre}</td>
                                    )}
                                    <td>{challenge.colaborativo}</td>
                                    <td>{formatedDate = moment(challenge.fechaFin).format('DD/MM/YYYY')}</td>
                                    <td>{formatedDate = moment(challenge.fechaFin).format('LT')}</td>
                                    <td>{challenge.activo}</td>
                                    
                                    <td><Link to={`/teacher/getGroups/${this.props.groupSelect}/editChallenge/${challenge.id}`}><Button variant="outline-primary" size="sm">Editar</Button></Link></td>
                                    <td><Link to={`/teacher/getGroups/${this.props.groupSelect}/editChallenge/${challenge.id}`}><Button variant="outline-primary" size="sm">Eliminar</Button></Link></td>
                                </tr>
                        ))}
                    </tbody>
                 </Table>
               </div>
            </>
        );
    }
}

export default Challenges;