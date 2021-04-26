/*
*  Name_file :CreateGroup.js
*  Description: Pagina que sirve para crear grupos nuevos
*/
import React, { Component } from 'react';
import teacherService from '../../../services/teacher/teacherService';
import AuthUser from '../../../services/authenticity/auth-service.js';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";




class CreateGroup extends Component {

    constructor(props){
        super(props);

        this.onModal = this.onModal.bind(this);

        this.state = {
            data: [],
            onModal:false,
            filteredData: [],
            groupName: '',
            currentUserId: '',
            currentUserRole: '',

        }
    }


      /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
   componentDidMount() {      

        const dataUser = AuthUser.getCurrentUser();
        this.setState({
            currentUserId: dataUser.id
        });
        this.setState({
            currentUserRole: dataUser.rol
        });

    }

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChangeName = async e => {
        await this.setState({
            [e.target.name]: e.target.value
        });
    }

    /*Se hacen peticiones al servidor renombrar grupo*/
    createGroup = () => {

        if(this.state.groupName == '')
        {
                this.onModal(true);
        }
        else
        {
            teacherService.createGroup(this.state.currentUserId, this.state.groupName ).then(response => {
                console.log(response);
                window.location.href = '/teacher';
            }).catch(error => {
                console.log(error.message);
            })
        }

    }


    onModal(modal) {

        this.setState({
            onModal: modal
        });
    }

/*Dibuja la pagina  */
    render() {

        return (

            <div className="container">
                <Card className="card-long">
                    <Card.Body>
                        <h1>Crear grupo</h1>
                        <label className="form-label">Nombre del grupo nuevo: </label>
                        <input placeholder="Ingrese un nombre"
                               className="form-control" type="text"
                               name="groupName"
                               onChange={this.handleChangeName}
                        />
                        <Button variant="primary" onClick={() => this.createGroup()}>Aceptar</Button>
                        <Modal
                            centered
                            show={this.state.onModal}
                            onHide={this.state.onModal}
                        >
                            <Modal.Header>
                                <Modal.Title>
                                  Ups...
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                No ha ingresado un nombre
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.onModal(false)}>Atras</Button>
                            </Modal.Footer>
                        </Modal>
                    </Card.Body>
                </Card>
            </div>
        );
     }

}

export default CreateGroup;
