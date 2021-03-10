/*
*  Name_file :GroupTeacher.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import TeacherService from '../../../services/teacher/teacherService';
import moment from 'moment';
//import CreateChallenge from './CreateChallenge.js';
import { Link } from "react-router-dom";

class Challenges extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            data: [],// Contiene todos los desafios del profesor para el grupo seleccionado
        };
    }

    deleteChallenge = (challenge) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar " + challenge.titulo);
        if (opcion === true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (challenge.id === registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo });

            TeacherService.deleteChallenge(challenge.id).then(response => {
            }).catch(error => {
                console.log(error.message);
            })
        }
    }

    componentDidMount() {
        //Obtiene los desafios del grupo seleccionado por el profesor
        TeacherService.getChallenges(this.props.groupSelect)
        .then(response => {
            this.setState({ data: response });
        }).catch(error => {
            console.log(error.message);
        })
        
        //Obtiene las categorias del desafio al iniciar
        TeacherService.getCategories()
        .then(response => {
            this.setState({ categories: response });

        }).catch(error => {
            console.log(error.message);
        })
    }

      //Obtiene el nombre del desafio/escrito
      showCollaborative = (challenge) => {
        if (challenge.colaborativo === 1){
            return "individual"
        }
        else{
            return "equipo"
        }
    }

    /*Dibuja la pagina  */
    render() {
        let formatedDate;
        const { categories, data } = this.state;
        return (
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                {/* <th className ="challenge-th">idDesafio</th>
                                <th className ="challenge-th">idGrupo</th> */}
                                <th className ="challenge-th">Titulo</th>
                                <th className ="challenge-th">categoria</th>
                                <th className ="challenge-th">tipo</th>
                                <th className ="challenge-th">fecha</th>
                                <th className ="challenge-th">Hora</th>
                                {/* <th>activo</th> */}
                                <th className ="challenge-th">acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.filter(challenge => challenge.activo === 1).map((challenge, index) =>
                                <tr key={challenge.id}>
                                    {/* <td className ="challenge-td">{challenge.id}</td>
                                    <td className ="challenge-td">{challenge.idGrupo}</td> */}
                                    <td className ="challenge-td">{challenge.titulo}</td>
                                    {categories.filter(category => category.id === challenge.idCategoria).map((item, index) =>
                                        <td className ="challenge-td">{item.nombre}</td>
                                    )}
                                    <td className ="challenge-td">{this.showCollaborative(challenge)}</td>
                                    <td className ="challenge-td">{formatedDate = moment(challenge.fechaFin).format('DD/MM/YYYY')}</td>
                                    <td className ="challenge-td">{formatedDate = moment(challenge.fechaFin).format('LT')}</td>
                                    {/* <td>{challenge.activo}</td> */}
                                    <td className ="challenge-td"><Link to={`/teacher/editChallenge/${this.props.groupSelect}/${challenge.id}`}><button >Editar</button></Link></td>
                                    <td className ="challenge-td"><button onClick={() => this.deleteChallenge(challenge)}>Eliminar</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <td><Link to={`/teacher/createChallenge/${this.props.groupSelect}`}><button >Crear Desafio</button></Link></td>
            </div>
        );
    }
}

export default Challenges;