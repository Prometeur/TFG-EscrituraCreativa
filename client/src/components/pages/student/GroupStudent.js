/*
*  Name_file :GroupStudent.js
*  Description: Pagina del grupo seleccionado por estudiante, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el estudiante
*    
*/
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';


const baseUrl = "http://localhost:3001/student/getChallenges";
const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class GroupStudent extends Component {
    
    state = {
        data: [],
    }

    /*Se hacen peticiones al servidor para que me devuelva la tabla desafios, me muestra todos los desafios del grupo seleccioando 
    por el estudiante*/
    peticionGet = () => 
    {
        axios.get(baseUrl, { params: { idGroup: cookies.get('groupSelect') } }).then(response => {
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

      /*cambia la vista a la vista de crear Escritos*/
     changeView = (idChallenge) => 
    {
        cookies.set('challengeSelect', idChallenge, { path: "/" });
        window.location.href = './writing';
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

    /*Dibuja la pagina  */
    render() {
        return (
            <>
                <h2> Group Student</h2>
                <nav>
                    <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                </nav>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>idDesafio</th>
                                <th>titulo</th>
                                <th>descripcion</th>
                                <th>categoria</th>
                                <th>colaborativo</th>
                                <th>calificacion</th>
                                <th>fechaIni</th>
                                <th>fechaFin</th>
                                <th>activo</th>
                                <th>idGrupo</th>

                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map(challenge => {
                                return (
                                    <tr>
                                        <td>{challenge.id}</td>
                                        <td>{challenge.titulo}</td>
                                        <td>{challenge.descripcion}</td>
                                        <td>{challenge.categoria}</td>
                                        <td>{challenge.colaborativo}</td>
                                        <td>{challenge.calificacion}</td>
                                        <td>{challenge.fechaInicial}</td>
                                        <td>{challenge.fechaFin}</td>
                                        <td>{challenge.activo}</td>
                                        <td>{challenge.idGrupo}</td>
                                        <button onClick={() => this.changeView(challenge.id)}>Crear Escrito</button>
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

export default GroupStudent;