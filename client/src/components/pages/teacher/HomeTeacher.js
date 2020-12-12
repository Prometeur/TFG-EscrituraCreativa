/*
*  Name_file :HomeTeacher.js
*  Description: Página home del profesor, contiene la vista del profesor
*    
*/
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

//const baseUrl = "http://localhost:3001/teacher/getGroups";
const baseUrl = "http://localhost:3001/user/getGroups";

const cookies = new Cookies();

class HomeTeacher extends Component {

    state = {
        data: [],
        searchStudent: '',
        searchType: 'nombre'

    }

    /*Se hacen peticiones al servidor para que me devuelva todos los grupos del profesor*/
    peticionGet = () => {
        axios.get(baseUrl, { params: { idEstudiante: cookies.get('id') } }).then(response => {
            console.log(response.data);
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

     /*cambia la vista a la vista de desafios del grupo seleccionado por el profesor*/
    changeView = (idGroup) => 
    {
        cookies.set('groupSelect', idGroup, { path: "/" });
        window.location.href = './groupTeacher';
    }

     /*cambia la vista a la vista de los estudiantes buscados*/
     changeViewStudents = () => 
     {
         cookies.set('searchStudent', this.state.searchStudent, { path: "/", sameSite: 'lax' });
         cookies.set('searchType', this.state.searchType, { path: "/", sameSite: 'lax' });
         window.location.href = './StudentList';
     }

    /*si vuelvo a la pagina de login, comprueba si el usuario ya inicio sension anteriomente
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
            <h2>  Soy Home del Profesor</h2>
            <nav>
                <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                <button text='Estudiantes' onClick={() => this.changeViewStudents()}>Estudiantes  </button>
            </nav>
            <div>

                <table>
                    <thead>
                        <tr>
                            <th>idGrupo</th>
                            <th>idProfesor</th>
                            <th>nombre</th>
                            <th>activo</th>

                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map(grupo => {
                            return (
                                <tr>
                                    <td>{grupo.id}</td>
                                    <td>{grupo.idprofesor}</td>
                                    <td>{grupo.nombre}</td>
                                    <td>{grupo.activo}</td>
                                    <td> <button onClick={() => this.changeView(grupo.id)}>ir grupo</button></td>
                                </tr>

                            )
                        })}

                    </tbody>

                </table>

            </div>
        </>);
    }

}

export default HomeTeacher;