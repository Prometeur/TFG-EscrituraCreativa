import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';


const baseUrl = "http://localhost:3001/student/getWritings";
const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class Writings extends Component {
    state = {
        data: [],
    }

    
    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
    si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        this.peticionGet();
        if (!cookies.get('correo')) {
            window.location.href = "/";
        }
    }

     /*cambia la vista a la vista de crear Escritos*/
     changeView = (name,idWriting) => {
        cookies.set('idWriting', idWriting, { path: "/" });
       // window.location.href = './writing';
    }

    /*Se hacen peticiones al servidor para que me devuelva la tabla de escritos del estudiante,
     me muestra todos los escritos del grupo seleccioando por el estudiante*/
    peticionGet = () => {
        axios.get(baseUrl, { params: { idUser: cookies.get('id'),idGroup:cookies.get('groupSelect') } }).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Dibuja la pagina  */
    render() {
        return (
            <>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Desafío</th>
                                <th>Escritor</th>
                                <th>Escrito</th>
                                <th>Puntuación</th>
                                <th>Fecha Creación</th>
                                <th>Activo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map(writing => {
                                return (
                                    <tr>
                                       
                                        <td>{writing.idDesafio}</td>
                                        <td>{writing.idEscritor}</td>
                                        <td>{writing.nombre}</td>
                                        <td>{writing.puntuacion}</td>
                                        <td>{writing.fecha}</td>
                                        <td>{writing.activo}</td>
                                        <td>
                                            <button onClick={() => this.changeView("see",writing.id)}>Ver</button>
                                            <button onClick={() => this.changeView("edit",writing.id)}>Editar</button>
                                            <button onClick={() => this.changeView("delete",writing.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <button onClick={() => window.location.href = '/student/home'}>Cancelar</button>

                </div>
            </>
        );
    }

}

export default Writings;