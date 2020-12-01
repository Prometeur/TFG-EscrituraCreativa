/*
*  Name_file :HomeStudent.js
*  Description: Pagina home del estudiante,contiene la vista del home del estudiante
*    
*/
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const baseUrl = "http://localhost:3001/student/getGroupStudent";
const cookies = new Cookies();

class HomeStudent extends Component 
{

    state = {
        data: [],

    }

     /*Se hacen peticiones al servidor para que me devuelva la tabla grupoestudiante, me muestra todos los grupos del estudiante*/
    peticionGet = () => 
    {
        axios.get(baseUrl, { params: { idEstudiante: cookies.get('id') } }).then(response => {
            console.log(response.data);//muestra consola navegador
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Elimina los datos de sesion almacenada por las cookies*/
    cerrarSesion = () => 
    {
        cookies.remove('id', { path: "/" });
        cookies.remove('correo', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('apellidos', { path: "/" });
        cookies.remove('foto', { path: "/" });
        cookies.remove('activo', { path: "/" });
        cookies.remove('rol', { path: "/" });
        window.location.href = './';
    }

    /*Cambia la vista a otra grupoStudent */
    changeView = (idGroup) => 
    {
        cookies.set('groupSelect', idGroup, { path: "/" });
        window.location.href = './groupStudent';
    }

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
    si es el caso lo redirige a la home segun su rol*/
    componentDidMount() 
    {
        this.peticionGet();
        if (!cookies.get('correo'))
        {
            window.location.href = "./";
        }
    }

    /*Dibuja la pagina */
    render() 
    {
        return (
            <>
                <h2> Soy Home del Estudiante</h2>
                <nav>
                    <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                </nav>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>idGrupo</th>
                                <th>idEstudiante</th>

                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map(grupo => {
                                return (
                                    <tr>
                                        <td>{grupo.idGrupo}</td>
                                        <td>{grupo.idEstudiante}</td>
                                        <td> <button onClick={() => this.changeView(grupo.idGrupo)}>ir grupo</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default HomeStudent;