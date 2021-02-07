/*
*  Name_file :ProfileInfo.js
*  Description: Contiene los datos de un usuario segun un ID dado. Es un componente de Porfile.
*    
*/
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

//const baseUrl = "http://localhost:3001/teacher/getGroups";
const baseUrl = "http://localhost:3001/user/getProfile";

const cookies = new Cookies();


class ProfileInfo extends Component {

    state = {
        data: [],

    }

    /*Se hacen peticiones al servidor para que me devuelva lso datos del estudiante*/
    peticionGet = () => {
        axios.get(baseUrl, { params: { idUser: cookies.get('idRequestedUser') } }).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
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

    //Acepta al estudiante como usuario de la aplicación.
    acceptApplicant = (idApplicant) => 
     {
         //window.location.href = './acceptApplicant/'+ idApplicant;
         let targetUrl = "http://localhost:3001/User/" + 'acceptApplicant';
         let newUrl = "http://localhost:3000/Profile"
         axios.get(targetUrl, { params: { idUser: idApplicant } }).then(response => {
            this.setState({ data: response.data });
            window.location.href = newUrl;
        }).catch(error => {
            console.log(error.message);
        })
        
     }

    /*Dibuja la pagina  */
    render() {
        let cartel =<div> </div>;
        let contenido = <div>
                        <h3>ID: {this.state.data.id}</h3>
                        <h3>Nombre: {this.state.data.nombre}</h3>
                        <h3>Apellidos: {this.state.data.apellidos}</h3>
                        <h3>Correo: {this.state.data.correo}</h3>
                    </div>;

        if(this.state.data.activo === 0)
        {
            cartel = <nav>
                        <h2> Este estudiante aún no ha sido aceptado por un profesor.</h2>
                    </nav>;
            contenido = <div>
                        <h3>ID: {this.state.data.id}</h3>
                        <h3>Nombre: {this.state.data.nombre}</h3>
                        <h3>Apellidos: {this.state.data.apellidos}</h3>
                        <h3>Correo: {this.state.data.correo}</h3>
                        <div><button text='Aceptar solicitud' onClick={() => this.acceptApplicant(this.state.data.id)}>Aceptar solicitud</button></div>
            </div>;
        }


        return (
            <>
                <h1>Perfil:</h1>
                <nav>
                    <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                </nav>
                <div>
                
                    {cartel}
                

                    {contenido}


                </div>
            </>
        );
    }


}

export default ProfileInfo;