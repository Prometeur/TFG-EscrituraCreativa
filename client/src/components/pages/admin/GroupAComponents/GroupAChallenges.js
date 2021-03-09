/*
*  Name_file :GroupAChallenges.js
*  Description: Lista los desafíos del grupo  
*/
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario


class GroupTeacher extends Component {

    state = {
        data: [],

    }

    /*Se hacen peticiones al servidor para que me devuelva la tabla desafios, me muestra todos los desafios del grupo seleccioando 
    por el profesor*/
    peticionGet = () => {
        axios.get("http://localhost:3001/Teacher/getChallenges", { params: { idGroup: cookies.get('groupSelect') } }).then(response => {
            console.log(response.data);//muestra consola navegador
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        this.peticionGet();
    }

    /*Dibuja la pagina  */
    render() {

        return (
            <>
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

export default GroupTeacher;