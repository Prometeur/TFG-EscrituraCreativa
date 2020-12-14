/*
*  Name_file :GroupTeacher.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import estudiantes from './GroupComponents/StudentList';
import desafios from './GroupComponents/ChallengueList';


const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class GroupTeacher extends Component {

    state = {
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

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
    }


    cambiaVentana = (opcion) =>{
        this.setState({ventana : opcion});
    }

    /*Dibuja la pagina  */
    render() {

        let componente = desafios;
        if(this.state.ventana == 2)
        {
            componente = estudiantes;
        }

        return (
            <>
                <h2> Group Teacher</h2>
                <nav>
                    <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                </nav>
                <nav>
                    <button onClick={() => this.cambiaVentana(1)}>Desafíos</button>
                    <button onClick={() => this.cambiaVentana(2)}>Estudiantes</button>
                </nav>
                <div>
                    
                    {React.createElement(componente)}

                </div>
            </>
        );
    }

}

export default GroupTeacher;