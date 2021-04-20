/*
*  Name_file :ViewTeamInfo.js
*  Description: Contiene los datos de un equipo segun un ID dado.
*    
*/
import React, { Component } from 'react';
import authHeader from '../../../services/authenticity/auth-header.js';
import AuthUser from '../../../services/authenticity/auth-service.js';
import TeacherService from '../../../services/teacher/teacherService.js';
import AdminService from '../../../services/admin/adminService.js';

import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link} from "react-router-dom";


class ViewTeamInfo extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            
            data: [],
            memberData: [],
           
    
        };
    }


    /*Se hacen peticiones al servidor para que me devuelva los datos del estudiante*/
    peticionGet() {
        TeacherService.getTeam(this.props.idTeam).then(response => {
              this.setState({data:response});
              this.peticionGetMembers();
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para que me devuelva los datos del estudiante*/
    peticionGetMembers() {
        TeacherService.getMembersTeam(this.props.idTeam).then(response => {
              this.setState({memberData:response});
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Cargo todos los datos que necesito nada más cargar la página, como los datos del usuario o los grupos.*/
   componentDidMount() {
        this.peticionGet();
     
   }

    /*Dibuja la pagina  */
    render() {
        
        let cartel =<div> </div>;
        let contenido = <div>
                        <h3>Nombre: {this.state.data.nombre}</h3>
                        <div>
                        <ListGroup variant="flush">
                        {this.state.memberData.map((user) => 
                            (
                                <React.Fragment>
                                <ListGroup.Item>
                                    {user.nombreEstudiante} {user.apellidoEstudiante} 
                                    <Link key={user.id} to={`/teacher/students/viewProfile/${user.idEstudiante}`}><button text='Ver Perfil'> Ver perfil </button></Link>
                                </ListGroup.Item>
                                </React.Fragment>
                                
                            )
                        )}
                        </ListGroup>
                        </div>
                    </div>;


        return (
            <>
                <h1>Perfil:</h1>
            
                <div>
                
                    {cartel}


                    {contenido}


                </div>
            </>
        );
    }


}

export default ViewTeamInfo;