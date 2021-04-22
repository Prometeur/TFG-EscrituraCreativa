/*
*  Name_file :CreateGroup.js
*  Description: Pagina que sirve para crear grupos nuevos
*/
import React, { Component } from 'react';
import { Link} from "react-router-dom";
import adminService from '../../../services/admin/adminService';
import teacherService from '../../../services/teacher/teacherService';
import authHeader from '../../../services/authenticity/auth-header.js';
import AuthUser from '../../../services/authenticity/auth-service.js';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';



class CreateGroup extends Component {

    state = {
        data: [],
        filteredData: [],
        groupName: '',
        currentUserId: '',
        currentUserRole: '',

    }

      /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
   componentDidMount() {      
    const dataUser = AuthUser.getCurrentUser();
    this.setState({
        currentUserId: dataUser.id
    });
    this.setState({
        currentUserRole: dataUser.rol
    });

}

/*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
handleChangeName = async e => {
    await this.setState({
            [e.target.name]: e.target.value
    });
}

/*Se hacen peticiones al servidor renombrar grupo*/
createGroup = () => {
    teacherService.createGroup(this.state.currentUserId, this.state.groupName ).then(response => {
        console.log(response);
        window.location.href = '/teacher';
    }).catch(error => {
        console.log(error.message);
    })
}


/*Dibuja la pagina  */
render() {

    let botonCrearGrupo = <div><button text='Crear Grupo' onClick={() => this.createGroup()}>Crear Grupo</button></div>;

    if(this.state.groupName === ""){
        botonCrearGrupo = <div><button disabled text='Crear Grupo' onClick={() => this.createGroup()}>Crear Grupo</button></div>;
    }

    return (

        <div className="container">
         <Card className="card-edit">
                <Card.Body>
                
        <h1>Crear grupo</h1>
        
        
        <div>
            <label>Nombre del grupo nuevo: </label>
            <br />
            <input type="text" name="groupName" onChange={this.handleChangeName} />
            {botonCrearGrupo}
        </div>


                <div>


                </div>
                </Card.Body>
            </Card>
        </div>
      
       
    );
}

}

export default CreateGroup;
