/*
*  Name_file :GroupTeacher.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl = "http://localhost:3001/Teacher/getChallenges";
const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario


class GroupTeacher extends Component {

    state = {
        data: [],

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

    /*cambia la vista a la vista de crear desafio*/
    changeView = (idChallenge) => {
        cookies.set('challengeSelect', idChallenge, { path: "/" });
        window.location.href = './challenge';
    }

    //Acepta al estudiante como usuario de la aplicación.
    deleteChallenge = (idApplicant) => 
     {
         let targetUrl = "http://localhost:3001/User/" + 'deleteChallenge';
         let newUrl = "http://localhost:3000/groupTeacher"
         axios.get(targetUrl, { params: { id: idApplicant } }).then(response => {
            window.location.href = newUrl;
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
                                        <div><button text='Eliminar desafío' onClick={() => this.deleteChallenge(challenge.id)}>Eliminar desafío</button></div>
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