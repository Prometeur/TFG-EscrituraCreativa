/*
*  Name_file: Teams.js
*  Description: Pagina de equipos del estudiante, contiene la vista de todos los equipos 
*  que tiene el estudiante
*    
*/

import React, { Component } from 'react';
import { Link } from "react-router-dom";

/**Servicios del estudiante */
import StudentService from '../../../services/student/student-service.js';

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

// import {
//     Table,
//     Button,
//     Container,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     FormGroup,
//     ModalFooter,
// } from "reactstrap";

/*Componentes de estilo Bootstrap*/
import Table from "react-bootstrap/Table";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

/*Importaciones del css*/
import '../../../styles/styleGeneral.css';
import '../../../styles/Challenge.css';
import '../../../styles/styleCard.css';

class TeamStudent extends Component {

    constructor(props) {
        super(props);
        // const dataUser = AuthUser.getCurrentUser();
        this.state = {
            modalLeaveLider: false,
            modalSuccesfulInvitation: false,
            modalSuccessCreateTeam: false,
            modalCreateTeam: false,
            modalDeleteTeam: false,
            modalLeaveTeam: false,
            modalKickStudent: false,

            formErrors: {
                teamName: '',
            },

            showTeamStudent: false,

            showLiderStudent: false,//muestra funciones que solo puede ver el lider como eliminar integrante/ invitar miembro

            //dataTeams: [],//contiene los equipos del estudiante 
            dataTeamStudentGroup: [],//equipo del estudiante
            dataMembersTeam: [],//integrantes del equipo
            dataStudentWithoutTeam: [],//estudiantes sin equipo

            idTeamCreated: '',//id del equipo creado
            teamName: '',//nombre del equipo a crear
            idGuest: '',//invitado
            idKicked: '',
            idLider: '',//idLider
            nameLider: '',//idLider
            groupSelect:'',
        }
    }

    componentDidMount() {
       
        var groupSelect;
        if (this.props.groupSelect===undefined){
            groupSelect=this.props.match.params.idGroup;
            this.setState({ groupSelect: groupSelect });
        }
        else if(this.props.match===undefined){
            groupSelect=this.props.groupSelect;
            this.setState({ groupSelect: groupSelect });
        }
        /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
        StudentService.getTeamStudentGroup(AuthUser.getCurrentUser().id, groupSelect)
            .then(response => {

                if (response.length != 0) {
                    if (response[0].idCreador === AuthUser.getCurrentUser().id)//si estudiante es lider del equipo
                        this.setState({ dataTeamStudentGroup: response, idLider: response[0].idCreador, showLiderStudent: true });
                    else {
                        this.setState({ dataTeamStudentGroup: response, idLider: response[0].idCreador });
                    }
                }

                //si el estudiante tiene equipo
                if (response.length != 0) {
                    //me traigo los integrantes de un mismo equipo
                    StudentService.getMembersTeam(response[0].idEquipo)
                        .then(response => {
                            var nombre;
                            //si un miembro del equipo es el lider, guardo el nombre y apellido del lider 
                            response.filter(member1 => member1.idEstudiante === this.state.idLider).map((member) => (
                                nombre = member.nombreEstudiante + " " + member.apellidoEstudiante
                            ));

                            this.setState({ dataMembersTeam: response, nameLider: nombre, showTeamStudent: true });

                        }).catch(error => {
                            console.log(error.message);
                        })
                }
            }).catch(error => {
                console.log(error.message);
            })

        /*Obtiene estudiantes sin equipos de un grupo*/
        StudentService.getStudentWithoutTeam(groupSelect)
            .then(response => {

                // dataStudentWithoutTeam
                this.setState({ dataStudentWithoutTeam: response });

            }).catch(error => {
                console.log(error.message);
            })
    }

    //Crea un equipo
    createTeam = () => {
        //crea un equipo
        if (this.state.teamName !== "") {
            this.closeModalCreateTeam();
            StudentService.createTeam(AuthUser.getCurrentUser().id, this.state.groupSelect, this.state.teamName)
                .then(response => {
                    this.showModalSuccessCreateTeam();
                    var idTeam = response;
                    this.setState({ idTeamCreated: response });
                    //agrega a la tabla equipoestudiante el nuevo equipo con idTeam y idEstudiante
                    StudentService.addStudentTeam(idTeam, AuthUser.getCurrentUser().id)
                        .then(response => {

                        })
                        .catch(error => {
                            console.log(error.message);
                        })
                })
                .catch(error => {
                    console.log(error.message);
                })
        }

        /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
        StudentService.getTeamStudentGroup(AuthUser.getCurrentUser().id, this.state.groupSelect)
            .then(response => {
                this.setState({ dataTeamStudentGroup: response });
            }).catch(error => {
                console.log(error.message);
            })
    }

    //Edita un equipo (cambio de lider de un equipo o se edita el nombre del equipo)
    editTeam = () => {
        StudentService.editTeam(this.state.dataTeamStudentGroup[0].idEquipo, this.state.dataTeamStudentGroup[0].nombreEquipo, this.state.idLider, this.state.dataTeamStudentGroup[0].idGrupo)
            .then(response => {

                StudentService.leaveStudentTeam(this.state.dataTeamStudentGroup[0].idEquipo, AuthUser.getCurrentUser().id)
                    .then(response => {
                    })
                    .catch(error => {
                        console.log(error.message);
                    })

                this.setState({ modalLeaveLider: false })
            })
            .catch(error => {
                console.log(error.message);
            })
    };

    //Elimina equipo
    deleteTeam = () => {
        // this.closeModalDeleteFile();
        // var contador = 0;
        // var arreglo = this.state.dataMediaWriting;
        // arreglo.map((registro) => {
        //     if (writing.id === registro.id) {
        //         arreglo.splice(contador, 1);
        //     }
        //     contador++;
        // });
        // this.setState({ dataMediaWriting: arreglo });

        StudentService.deleteTeam(this.state.dataTeamStudentGroup[0].idEquipo)
            .then(response => {
                this.closeModalDeleteTeam();

            })
            .catch(error => {
                console.log(error.message);
            })

    }

    //Envia una invitación a un estudiante para unirse a su equipo
    invite = () => {
        // var nombre = this.state.dataMembersTeam[0].nombreEstudiante;
        // var apellidos = this.state.dataMembersTeam[0].apellidoEstudiante;
        var nombre= AuthUser.getCurrentUser().username;
        var apellidos = AuthUser.getCurrentUser().surname;
        var messageBody = "te envía una invitación para unirte a su equipo";
        var equipo = this.state.dataTeamStudentGroup[0].nombreEquipo;
        var grupo = this.state.dataTeamStudentGroup[0].nombreGrupo;
        var message = nombre + " " + apellidos + " " + messageBody + " " + equipo + " del Grupo de " + grupo;
        StudentService.sendMessage(AuthUser.getCurrentUser().id, this.state.idGuest, AuthUser.getCurrentUser().id, message, 2)
            .then(response => {
                this.showModalSuccesfulInvitation();

            }).catch(error => {
                console.log(error.message);
            })
    };

    //Abandona el estudiante un equipo
    askLeaveTeam = () => {
        //si soy el creador del equipo
        if (this.state.dataTeamStudentGroup[0].idCreador === AuthUser.getCurrentUser().id && this.state.dataMembersTeam.length > 1) {
            this.showModalLeaveLider();
        }
        else {//salir del equipo
            this.showModalLeaveTeam();
        }
    };

    askCreateTeam=()=>{
        this.showModalCreateTeam();

    };

    //Abandona el estudiante un equipo
    leaveTeam = () => {
        StudentService.leaveStudentTeam(this.state.dataTeamStudentGroup[0].idEquipo, AuthUser.getCurrentUser().id)
            .then(response => {
                this.closeModalLeaveTeam();
            })
            .catch(error => {
                console.log(error.message);
            })
    };

    //Abandona el estudiante un equipo
    kickStudentTeam = () => {
        //  if(this.state.idKicked!==)
        StudentService.leaveStudentTeam(this.state.dataTeamStudentGroup[0].idEquipo, this.state.idKicked)
            .then(response => {
                this.closeModalKickStudent();
            })
            .catch(error => {
                console.log(error.message);
            })
    };

    //obtiene al estudiante que va heredar el lider del equipo
    selectLider = e => {
        this.setState({
            idLider: e.target.value
        });
    };

    //obtiene al estudiante a invitar
    selectGuest = e => {
        this.setState({
            idGuest: e.target.value
        });
    };

    //obtiene al estudiante a invitar
    selectKicked = e => {
        this.setState({
            idKicked: e.target.value
        });
    };

    //Obtiene el nombre del equipo
    onChangeTeamName = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "teamName":
                formErrors.teamName =
                    value.length < 1 ? "Campo obligatorio requerido" : "";
                break;
            default:
                break;
        }
        // this.setState({
        //     teamName: e.target.value
        // });
        this.setState({
            formErrors,
            teamName: e.target.value
            // form: {
            //     ...this.state.form,
            //     [name]: value
            // }
        });
    }

    //activa/desactiva el boton invitar
    disabledButtonInvite = () => {
        //si no tengo equipo, desactivar boton invitar o si no soy el creador del equipo desactivar boton invitar o si el equipo esta completo
        if ((this.state.dataTeamStudentGroup.length === 0) || (this.state.dataTeamStudentGroup[0].idCreador !== AuthUser.getCurrentUser().id) || this.state.dataMembersTeam.length > 5)
            return true;
        else
            return null;
    }

    //activa/desactiva el boton invitar
    disabledButtonDeleteTeam = () => {
        //si no tengo equipo, desactivar boton eliminar o si no soy el creador del equipo desactivar boton eliminar
        if ((this.state.dataTeamStudentGroup.length === 0) || (this.state.dataTeamStudentGroup[0].idCreador !== AuthUser.getCurrentUser().id))
            return true;
        else
            return null;
    }

    //Modal de confirmacion para eliminar equipo
    askDeleteTeam = () => {
        //si soy el creador del equipo
        if (this.state.dataTeamStudentGroup[0].idCreador === AuthUser.getCurrentUser().id) {
            this.showModalDeleteTeam();
        }
    };

    showModalLeaveLider = () => {
        this.setState({
            //   form: dato,
            modalLeaveLider: true,
        });
    };

    showModalCreateTeam= () => {
        this.setState({
            //   form: dato,
            modalCreateTeam: true,
        });
    };

    showModalKickStudent = () => {
        this.setState({
            //   form: dato,
            modalKickStudent: true,
        });
    };

    showModalLeaveTeam = () => {
        this.setState({
            //   form: dato,
            modalLeaveTeam: true,
        });
    };

    showModalSuccessCreateTeam = () => {
        this.setState({
            //   form: dato,
            modalSuccessCreateTeam: true,
        });
    };

    closeModalLeaveLider = () => {
        this.setState({ modalLeaveLider: false });
    };

    closeModalLeaveTeam = () => {
        this.setState({ modalLeaveTeam: false });
    };

    closeModalKickStudent = () => {
        this.setState({ modalKickStudent: false });
    };

    closeModalCreateTeam = () => {
        this.setState({ modalCreateTeam: false });
    };

    showModalDeleteTeam = () => {
        this.setState({
            //   form: dato,
            modalDeleteTeam: true,
        });
    };

    closeModalDeleteTeam = () => {
        this.setState({ modalDeleteTeam: false });
    };

    showModalSuccesfulInvitation = () => {
        this.setState({
            //   form: dato,
            modalSuccesfulInvitation: true,
        });
    };

    closeModalSuccesfulInvitation = () => {
        setTimeout(
            () => this.setState({ modalSuccesfulInvitation: false }),
            3000
        );
    };

   


    closeModalSuccessCreateTeam = () => {
        setTimeout(
            () => this.setState({ modalSuccessCreateTeam: false }),
            3000
        );
    };

    // componentDidUpdate(pP,pS,sS){
    //     debugger;
    //     if (pS !== this.state) {
    //         console.warn("method called" )
    //         console.log('pokemons state has changed.')
    //       }
    // }

    /*Dibuja la pagina  */
    render() {
        const { showTeamStudent, showLiderStudent,formErrors } = this.state;
        return (
            <div className="container">
                <Card className="card-long">
                    <Card.Body>
                        {showTeamStudent ? (
                                <Table striped bordered hover >
                                    <thead>
                                        <tr>
                                            <th>Equipo</th>
                                            <th>Grupo</th>
                                            <th>Integrantes</th>
                                            <th>Lider</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.dataTeamStudentGroup.map(team => {
                                            return (
                                                <tr key={team.id}>
                                                    <td>{team.nombreEquipo}</td>
                                                    <td>{team.nombreGrupo}</td>
                                                    {this.state.dataMembersTeam.map(item =>
                                                        <tr>
                                                            <td>{item.nombreEstudiante}</td>
                                                            <td>{item.apellidoEstudiante}</td>
                                                        </tr>
                                                    )}
                                                    <td>{this.state.nameLider}</td>
                                                    <td><Button variant="outline-primary" disabled={this.disabledButtonDeleteTeam()} onClick={() => this.askDeleteTeam()} >Eliminar Equipo</Button></td>
                                                    <td><Button disabled={this.state.dataMembersTeam.length < 2 ? true : null} onClick={() => this.askLeaveTeam()} >Dejar Equipo</Button>  </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>

                        ) : (
                                <div>
                                    <label> Crear Equipo </label>
                                    <input
                                        className={formErrors.teamName.length > 0 ? "error" : "form-input"}
                                        type="text"
                                        name="teamName"
                                        placeholder="escribe el nombre"
                                        value={this.state.teamName}
                                        onChange={this.onChangeTeamName}
                                        disabled={this.state.dataTeamStudentGroup.length > 0 ? true : null}
                                    />
                                     {formErrors.teamName.length > 0 && (
                                        <span className="errorMessage">{formErrors.teamName}</span>
                                    )}
                                    <div><Button onClick={() => this.askCreateTeam()} disabled={this.state.dataTeamStudentGroup.length > 0 ? true : null}>Crear Equipo</Button></div>
                                </div>
                        )}

                        {showLiderStudent ? (
                            <>
                                <label className="label-subtitle"> Selecciona estudiante a invitar </label>
                                <ul className="flex-row">
                                    <li className="flex-row-items">
                                        <select onChange={this.selectGuest} disabled={this.disabledButtonInvite()} >
                                            <option value="" selected disabled hidden >Seleccionar</option>
                                            {this.state.dataStudentWithoutTeam.map(elemento => (
                                                <option key={elemento.id} value={elemento.id} > { elemento.nombre} { elemento.apellidos} </option>
                                            ))}
                                        </select>
                                    </li>
                                    <li className="flex-row-items">
                                        <Button disabled={this.disabledButtonInvite()} onClick={() => this.invite()} >Invitar</Button>
                                    </li>
                                </ul>

                                <label className="label-subtitle"> Eliminar Integrante del equipo </label>
                                <ul className="flex-row">
                                    <li className="flex-row-items">
                                        <select onChange={this.selectKicked} disabled={this.disabledButtonDeleteTeam()} >
                                            <option value="" selected disabled hidden >Seleccionar</option>
                                            {this.state.dataMembersTeam.filter(member => member.idEstudiante !== AuthUser.getCurrentUser().id)
                                                .map((elemento, index) =>
                                                    <option key={elemento.idEstudiante} value={elemento.idEstudiante} > {elemento.nombreEstudiante + " "} {elemento.apellidoEstudiante} </option>
                                                )}
                                        </select>
                                    </li>
                                    <li className="flex-row-items">
                                        <Button disabled={this.disabledButtonDeleteTeam()} onClick={() => this.showModalKickStudent()} >eliminar</Button>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <div></div>
                        )}
                        {/* <div>
                            <label > Salir del equipo </label>
                            <div>
                                <Button disabled={this.state.dataMembersTeam.length < 2 ? true : null} onClick={() => this.askLeaveTeam()} >Dejar Equipo</Button>
                            </div>
                        </div> */}
                        

                        <Modal show={this.state.modalCreateTeam}>
                            <Modal.Header>
                                <div><h5>¿Estás seguro de crear el equipo {this.state.teamName} ?</h5></div>
                            </Modal.Header>
                            <Modal.Body>

                            </Modal.Body>

                            <Modal.Footer>
                                {/* <Button color="primary" onClick={() => this.editar(this.state.form)}>Aceptarr</Button> */}
                                <Button onClick={() => this.createTeam()}>Aceptar</Button>
                                <Button color="danger" onClick={() => this.closeModalCreateTeam()}>Cancelar</Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={this.state.modalLeaveLider}>
                            <Modal.Header>
                                <div><h5>Como lider del equipo antes de abandonar el equipo es necesario asignar un lider</h5></div>
                            </Modal.Header>
                            <Modal.Body>

                                <label> Lider:</label>
                                {/* <input className="form-control" readOnly type="text" value={this.state.form.id} /> */}
                                <select onChange={this.selectLider}  >

                                    <option value="" selected disabled hidden >Seleccionar</option>

                                    {/* {this.state.dataMembersTeam.map(elemento => (
                                        <option key={elemento.idEstudiante} value={elemento.idEstudiante} > { elemento.nombreEstudiante} </option>
                                    ))} */}

                                    {this.state.dataMembersTeam.filter(student => student.idEstudiante !== AuthUser.getCurrentUser().id).map((elemento, index) =>
                                        <option key={elemento.idEstudiante} value={elemento.idEstudiante} > {elemento.nombreEstudiante} </option>
                                    )}
                                </select>
                            </Modal.Body>

                            <Modal.Footer>
                                {/* <Button color="primary" onClick={() => this.editar(this.state.form)}>Aceptarr</Button> */}
                                <Button onClick={() => this.editTeam()}>Aceptar</Button>
                                <Button color="danger" onClick={() => this.closeModalLeaveLider()}>Cancelar</Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={this.state.modalSuccesfulInvitation}>
                            <Modal.Header>
                            </Modal.Header>
                            <Modal.Body>

                                <p> Invitación enviada correctamente</p>
                                {this.closeModalSuccesfulInvitation()}

                            </Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal>


                        <Modal show={this.state.modalSuccessCreateTeam}>
                            <Modal.Header>
                            </Modal.Header>
                            <Modal.Body>

                                <p> Equipo creado correctamente!</p>
                                {this.closeModalSuccessCreateTeam()}

                            </Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={this.state.modalDeleteTeam}>
                            <Modal.Header>
                                <div><h5>¿Estás seguro de eliminar el equipo?</h5></div>
                            </Modal.Header>
                            <Modal.Body>

                            </Modal.Body>

                            <Modal.Footer>
                                {/* <Button color="primary" onClick={() => this.editar(this.state.form)}>Aceptarr</Button> */}
                                <Button onClick={() => this.deleteTeam()}>Aceptar</Button>
                                <Button color="danger" onClick={() => this.closeModalDeleteTeam()}>Cancelar</Button>
                            </Modal.Footer>
                        </Modal>


                        <Modal show={this.state.modalLeaveTeam}>
                            <Modal.Header>
                                <div><h5>¿Estás seguro de abandonar el equipo?</h5></div>
                            </Modal.Header>
                            <Modal.Body>

                            </Modal.Body>

                            <Modal.Footer>
                                {/* <Button color="primary" onClick={() => this.editar(this.state.form)}>Aceptarr</Button> */}
                                <Button onClick={() => this.leaveTeam()}>Aceptar</Button>
                                <Button color="danger" onClick={() => this.closeModalLeaveTeam()}>Cancelar</Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={this.state.modalKickStudent}>
                            <Modal.Header>
                                <div><h5>¿Estás seguro de querer expulsar del equipo?</h5></div>
                            </Modal.Header>
                            <Modal.Body>

                            </Modal.Body>

                            <Modal.Footer>
                                {/* <Button color="primary" onClick={() => this.editar(this.state.form)}>Aceptarr</Button> */}
                                <Button onClick={() => this.kickStudentTeam()}>Aceptar</Button>
                                <Button color="danger" onClick={() => this.closeModalKickStudent()}>Cancelar</Button>
                            </Modal.Footer>
                        </Modal>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default TeamStudent;