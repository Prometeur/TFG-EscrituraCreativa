/*
*  Name_file :GroupTeacher.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';


import TeacherService from '../../../services/teacher/teacherService';
import moment from 'moment';
import { Link } from "react-router-dom";

// Componentes de estilos
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

// Estilos
import '../../../styles/styleGeneral.css';
import '../../../styles/styleButton.css';

class Challenges extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteChallenge: '',//desafio que va ser eliminado(desactivado)
            modalDeleteChallenge: false,//modal para eliminar desafio
            categories: [],
            data: [],// Contiene todos los desafios del profesor para el grupo seleccionado
        };
    }

    deleteChallenge = (challenge) => {
        this.closeModalDeleteChallenge();
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
        if (challenge.colaborativo === 1) {
            return "individual"
        }
        else {
            return "colaborativo"
        }
    }

    //Muestra modal de confirmación para eliminar fichero multimedia
    askDeleteChallenge = (challenge) => {
        this.setState({
            modalDeleteChallenge: true,
            deleteChallenge: challenge
        });
    }

    //Cierra el modal de eliminar fichero
    closeModalDeleteChallenge = () => {
        this.setState({ modalDeleteChallenge: false });
    };

    /*Dibuja la pagina  */
    render() {
        let formatedDate;
        const { categories, data } = this.state;
        return (
            <Card className={"card-long"}>
                <Card.Body>
                <div className="button-direction-left">
                    <Link to={`/teacher/createChallenge/${this.props.groupSelect}`}>
                        <Button variant="outline-secondary">Crear desafio</Button>
                    </Link>
                </div>
                <div className="table-margin">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Categoria</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {data.map((challenge) => (
                                <tr key={challenge.id}>
                                    <td>{challenge.titulo}</td>
                                    {categories.filter(category => category.id === challenge.idCategoria).map((item, index) =>
                                        <td>{item.nombre}</td>
                                    )}
                                    <td>{challenge.colaborativo}</td>
                                    <td>{formatedDate = moment(challenge.fechaFin).format('DD/MM/YYYY')}</td>
                                    <td>{formatedDate = moment(challenge.fechaFin).format('LT')}</td>
                                    <td>{challenge.activo}</td>

                                    <td><Link to={`/teacher/groups/${this.props.groupSelect}/editChallenge/${challenge.id}`}><Button variant="outline-primary" size="sm">Editar</Button></Link></td>
                                    <td><Link to={`/teacher/groups/${this.props.groupSelect}/editChallenge/${challenge.id}`}><Button variant="outline-primary" size="sm">Eliminar</Button></Link></td>
                                </tr>
                            ))} */}
                            {data.filter(challenge => challenge.activo === 1).map((challenge, index) =>
                                <tr key={challenge.id}>
                                    {/* <td className ="challenge-td">{challenge.id}</td>
                                    <td className ="challenge-td">{challenge.idGrupo}</td> */}
                                    <td className="challenge-td">{challenge.titulo}</td>
                                    {categories.filter(category => category.id === challenge.idCategoria).map((item, index) =>
                                        <td className="challenge-td">{item.nombre}</td>
                                    )}
                                    <td className="challenge-td">{this.showCollaborative(challenge)}</td>
                                    <td className="challenge-td">{formatedDate = moment(challenge.fechaFin).format('DD/MM/YYYY')}</td>
                                    <td className="challenge-td">{formatedDate = moment(challenge.fechaFin).format('LT')}</td>
                                    {/* <td>{challenge.activo}</td> */}
                                    <td ><Link to={`/teacher/editChallenge/${this.props.groupSelect}/${challenge.id}`}><img src={"../edit.png"} alt={"editar"}></img> Editar</Link></td>
                                    {/* <td ><Button variant="outline-primary" size="sm" onClick={() => this.deleteChallenge(challenge)}>Eliminar</Button></td> */}
                                    <td><img className={"img-icon"} src="../delete.png" alt="delete"></img><Link onClick={() => this.askDeleteChallenge(challenge)}>Borrar</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                <Modal show={this.state.modalDeleteChallenge}>
                    <Modal.Header>
                        <Modal.Title>Aviso</Modal.Title>
                         <img src="../triangle.png"></img>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Seguro que desea eliminar {this.state.deleteChallenge.titulo}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.deleteChallenge(this.state.deleteChallenge)}>Aceptar</Button>
                        <Button variant="danger" onClick={() => this.closeModalDeleteChallenge()}>Cancelar</Button>
                    </Modal.Footer>
                </Modal>
                </Card.Body>
            </Card>
        );
    }
}

export default Challenges;