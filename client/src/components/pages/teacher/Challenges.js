/*
*  Name_file :GroupTeacher.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import moment from 'moment';


const baseUrl = "http://localhost:3001/Teacher/getChallenges";
const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario
const baseUrl2 = "http://localhost:3001/teacher/getCategories";
const baseUrl3 = "http://localhost:3001/teacher/getChallenge";

class Challenges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            data: [],
        }
    }


    /*Se hacen peticiones al servidor para que me devuelva la tabla desafios, me muestra todos los desafios del grupo seleccioando 
    por el profesor*/
    peticionGet = () => {
        axios.get(baseUrl, { params: { idGroup: cookies.get('groupSelect') } }).then(response => {
            console.log(response.data);//muestra consola navegador
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    changeView = (name, idChallenge) => {
        //debugger;
        switch (name) {
            case "edit":
                cookies.set('idChallenge', idChallenge, { path: "/" });

                axios.get(baseUrl3, { params: { idChallenge: cookies.get('idChallenge') } }).then(response => {
                    var respuesta = response.data[0];
                    cookies.set('description', respuesta.descripcion, { path: "/" });
                }).catch(error => {
                    console.log(error.message);
                })

                window.location.href = '/teacher/editChallenge';

                break;
            case "create":
                window.location.href = '/teacher/challenge';
                break;
            case "cancel":
                window.location.href = '/teacher/home';
                break;
            default:
                break;
        }
    }

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        if (!cookies.get('correo')) {
            window.location.href = "/";
        }
        this.peticionGet();
        //carga las categorias del desafio al iniciar
        axios.get(baseUrl2).then(response => {
            this.setState({ categories: response.data });
            debugger;
        }).catch(error => {
            console.log(error.message);
        })
    }


    /*Dibuja la pagina  */
    render() {

        let formatedDate;
        return (
            <>
                <h2> Group Teacher</h2>
                <nav>
                    <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                </nav>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>idDesafio</th>
                                <th>idGrupo</th>
                                <th>Titulo</th>
                                <th>categoria</th>
                                <th>colaborativo</th>
                                <th>fecha</th>
                                <th>Hora</th>
                                <th>activo</th>
                                <th>acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map(challenge => {
                                return (
                                    <tr key={challenge.id}>
                                        <td>{challenge.id}</td>
                                        <td>{challenge.idGrupo}</td>
                                        <td>{challenge.titulo}</td>

                                        {this.state.categories.filter(category => category.id === challenge.idCategoria).map((item, index) =>
                                            <td>{item.nombre}</td>
                                        )}
                                        <td>{challenge.colaborativo}</td>
                                        <td>{formatedDate = moment(challenge.fechaFin).format('DD/MM/YYYY')}</td>
                                        <td>{formatedDate = moment(challenge.fechaFin).format('LT')}</td>
                                        <td>{challenge.activo}</td>
                                        
                                        <td> <button onClick={() => this.changeView("edit", challenge.id)}>Editar</button></td>
                                        <td> <button onClick={() => this.changeView("delete")}>Borrar</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button onClick={() => this.changeView("create")}>Crear Desafio</button>
                    <button onClick={() => this.changeView("cancel")}>cancelar</button>
                </div>
            </>
        );
    }
}

export default Challenges;