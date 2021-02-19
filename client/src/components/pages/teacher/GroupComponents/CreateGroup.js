/*
*  Name_file :CreateGroup.js
*  Description: Componente de creación de grupos para el profesor.  
*  Vive como parte de la página de grupos del profesor(temporalmente, en HomeTeacher)      <================= LEÉME PLS
*/
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';



const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class GroupTeacher extends Component {

    state = {
        nombre: ""

    }

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChangeName = async e => {
        await this.setState({
                [e.target.name]: e.target.value
        });
    }

    /*Se hacen peticiones al servidor para cear un nuevo grupo*/
    createGroup = () => {
        axios.post("http://localhost:3001/teacher/createGroup", { nombre: this.state.nombre, idTeacher: cookies.get('id')  }).then(response => {
            window.location.href = "http://localhost:3000/homeTeacher"; //<======== REDIRECCIÓN TEMPORAL
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Dibuja la pagina  */
    render() {

        return (
            <>
                <h2> Crear nuevo grupo</h2>


                <div>
                    <input type="text" name="nombre" onChange={this.handleChangeName} />
                </div>
                <div>
                    <button text='Crear grupo' onClick={() => this.createGroup()}>Crear grupo</button>
                </div>
            </>
        );
    }

}

export default GroupTeacher;