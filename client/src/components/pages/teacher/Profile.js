/*
*  Name_file :Profile.js
*  Description: Contiene los datos de un usuario segun un ID dado.
*    
*/
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import datos from "./ProfileComponents/ProfileInfo";
import escritos from "./ProfileComponents/ProfileScripts";


//const baseUrl = "http://localhost:3001/teacher/getGroups";
const baseUrl = "http://localhost:3001/user/getProfile";

const cookies = new Cookies();


class Profile extends Component {

    state = {
        data:[],
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
        this.peticionGet();
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
    }

    /*Se hacen peticiones al servidor para que me devuelva lso datos del estudiante*/
    peticionGet = () => {
        axios.get(baseUrl, { params: { idUser: cookies.get('idRequestedUser') } }).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }


    cambiaVentana = (opcion) =>{
        this.setState({ventana : opcion});
    }

    /*Dibuja la pagina  */
    render() {
        
        let componente = datos;
        if(this.state.ventana == 2)
        {
            componente = escritos;
        }

        let botones = <nav>
            <button onClick={() => this.cambiaVentana(1)}>Datos</button>
            <button onClick={() => this.cambiaVentana(2)}>Escritos</button>
        </nav>;

        if(this.state.data.activo === 0)
        {
            botones = <div></div>;
        }

        return (
            <div>
                <h2> {this.state.data.nombre} {this.state.data.apellidos}</h2>
                <nav>
                    <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                </nav>
                {botones}
                <div>
                    
                    {React.createElement(componente)}

                </div>
            </div>
        );

    }


}

export default Profile;