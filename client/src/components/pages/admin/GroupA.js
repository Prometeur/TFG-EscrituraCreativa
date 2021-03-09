/*
*  Name_file :GroupA.js
*  Description: Pagina del grupo seleccionado por administrador, contiene la vista de los desafio, información y estudiantes 
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import info from './GroupAComponents/GroupAInfo';
import estudiantes from './GroupAComponents/GroupAStudents';
import desafios from './GroupAComponents/GroupAChallenges';


const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class GroupTeacher extends Component {

    state = {
        data: [],
        ventana: 1,

    }

    /*Elimina los datos de sesion almacenada por las cookies*/
    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('correo', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('apellidos', { path: "/" });
        cookies.remove('foto', { path: "/" });
        cookies.remove('activo', { path: "/" });
        cookies.remove('rol', { path: "/" });
        window.location.href = './';
    }

    /*Se hacen peticiones al servidor para que me devuelva lso datos del grupo*/
    peticionGet = () => {
        axios.get("http://localhost:3001/admin/getGroupData", { params: { idGroup: cookies.get('groupSelect') } }).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        this.peticionGet();
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
    }


    cambiaVentana = (opcion) =>{
        this.setState({ventana : opcion});
    }

    goHome = () => 
     {
         window.location.href = './homeAdmin';
     }

    /*Dibuja la pagina  */
    render() {

        let componente = info;
        if(this.state.ventana == 2)
        {
            componente = estudiantes;
        }
        if(this.state.ventana == 3)
        {
            componente = desafios;
        }

        return (
            <>
                <h2> Grupo</h2>
                <nav>
                    <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                </nav>
                <nav>
                    <button onClick={() => this.goHome()}>Volver a Home</button>
                </nav>
                <nav>
                    <button onClick={() => this.cambiaVentana(1)}>Información</button>
                    <button onClick={() => this.cambiaVentana(2)}>Estudiantes</button>
                    <button onClick={() => this.cambiaVentana(3)}>Desafíos</button>
                </nav>

                <div>
                    <div>
                        <h2>{this.state.data.nombre}</h2>
                    </div>
                    
                    {React.createElement(componente)}

                </div>
            </>
        );
    }

}

//{React.createElement(componente)}

export default GroupTeacher;