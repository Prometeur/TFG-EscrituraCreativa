/*
*  Name_file :HomeAdmin.js
*  Description: Pagina home del administrador, contiene la vista del administrador
*    
*/
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const baseUrl = "http://localhost:3001/admin/getUsers";
const cookies = new Cookies();//para almacenar los datos de sesion del usuario



// //import AdminService from '../../../services/admin/adminService';
// //const service = new AdminService();

// const adminService = require("../../../services/admin/adminService");
// const service = new adminService();

class HomeAdmin extends Component {

    state =
        {
            data: []
        }
    /*Se hacen peticiones al servidor para que me devuelva la tabla entera usuarios*/
    peticionGet = () => {
        axios.get(baseUrl).then(response => {
            console.log(response.data);
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    // peticionGet = () => 
    //  {
    //     service.peticionGet(baseUrl);
    //  }


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

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sension anteriomente
    si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        this.peticionGet();
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
    }

    /*Dibuja la pagina */
    render() {
        console.log('id: ' + cookies.get('id'));
        console.log('correo: ' + cookies.get('correo'));
        console.log('nombre: ' + cookies.get('nombre'));
        console.log('apellidos: ' + cookies.get('apellidos'));
        console.log('foto: ' + cookies.get('foto'));
        console.log('activo: ' + cookies.get('activo'));
        console.log('rol: ' + cookies.get('rol'));
        return (<>
            <h2> Soy Home del Admin</h2>
            <nav>
                <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
            </nav>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>correo</th>
                            <th>password</th>
                            <th>nombre</th>
                            <th>apellidos</th>
                            <th>activo</th>
                            <th>rol</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.data.map(usuario => {
                                return (
                                    <tr>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.password}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellidos}</td>
                                        <td>{usuario.activo}</td>
                                        <td>{usuario.rol}</td>
                                    </tr>
                                )
                            })}

                    </tbody>

                </table>


            </div>
        </>);
    }

}

export default HomeAdmin;