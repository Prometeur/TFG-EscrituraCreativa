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

import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";




import '../../../styles/styleGeneral.css';

class TeamsStudent extends Component {

    constructor(props) {
        super(props);
        // const dataUser = AuthUser.getCurrentUser();
        this.state = {

            modalLeaveLider: false,
            modalSuccesfulInvitation: false,
            modalSuccessCreateTeam: false,
            modalDeleteTeam: false,
            modalLeaveTeam: false,
            modalKickStudent: false,

            //dataTeams: [],//contiene los equipos del estudiante 
            dataTeamStudentGroup: [],//equipo del estudiante
            dataMembersTeam: [],//integrantes del equipo
            dataStudentWithoutTeam: [],//estudiantes sin equipo

            idTeamCreated: '',//id del equipo creado
            teamName: '',//nombre del equipo a crear
            idGuest: '',//invitado
            idKicked: '',
            idLider: ''//idLider
        }
    }

    componentDidMount() {
        /*Obtiene todos los equipos del estudiante (de distintos grupos)*/
        // StudentService.getTeams(AuthUser.getCurrentUser().id)
        //     .then(response => {
        //         this.setState({ dataTeams: response });
        //     }).catch(error => {
        //         console.log(error.message);
        //     })

        /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
        StudentService.getTeamStudentGroup(AuthUser.getCurrentUser().id, this.props.groupSelect)
            .then(response => {

                this.setState({ dataTeamStudentGroup: response });
                //si el estudiante tiene equipo
                if (response.length != 0) {
                    //me traigo los integrantes de un mismo equipo
                    StudentService.getMembersTeam(response[0].idEquipo)
                        .then(response => {
                            debugger;
                            this.setState({ dataMembersTeam: response });

                        }).catch(error => {
                            console.log(error.message);
                        })
                }
            }).catch(error => {
                console.log(error.message);
            })

        /*Obtiene estudiantes sin equipos de un grupo*/
        StudentService.getStudentWithoutTeam(this.props.groupSelect)
            .then(response => {
                debugger;
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
            StudentService.createTeam(AuthUser.getCurrentUser().id, this.props.groupSelect, this.state.teamName)
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
        StudentService.getTeamStudentGroup(AuthUser.getCurrentUser().id, this.props.groupSelect)
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
        var nombre = this.state.dataMembersTeam[0].nombreEstudiante;
        var apellidos = this.state.dataMembersTeam[0].apellidoEstudiante;
        var messageBody = "te envía una invitación para unirte a su equipo";
        var equipo = this.state.dataTeamStudentGroup[0].nombreEquipo;
        var grupo = this.state.dataTeamStudentGroup[0].nombreGrupo;
        var message = nombre + " " + apellidos + " " + messageBody + " " + equipo + " del Grupo de " + grupo;
        debugger;
        StudentService.sendMessage(AuthUser.getCurrentUser().id, this.state.idGuest, AuthUser.getCurrentUser().id, message, 2)
            .then(response => {
                this.showModalSuccesfulInvitation();

            }).catch(error => {
                console.log(error.message);
            })
    };

    // //Abandona el estudiante un equipo
    // leaveTeam = () => {
    //     //si soy el creador del equipo
    //     if (this.state.dataTeamStudentGroup[0].idCreador === AuthUser.getCurrentUser().id && this.state.dataMembersTeam.length > 1) {
    //         this.showModalLeaveLider();
    //     }
    //     else {//salir del equipo
    //         StudentService.leaveStudentTeam(this.state.dataTeamStudentGroup[0].idEquipo, AuthUser.getCurrentUser().id)
    //             .then(response => {
    //                 this.closeModalLeaveTeam();
    //             })
    //             .catch(error => {
    //                 console.log(error.message);
    //             })
    //     }
    // };

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
        this.setState({
            teamName: e.target.value
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

    /*Dibuja la pagina  */
    render() {
        return (
            <>
                <div>
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
                                        <td></td>
                                        <td><Button variant="outline-primary" disabled={this.disabledButtonDeleteTeam()} onClick={() => this.askDeleteTeam()} >Eliminar</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    <table>
                        {/* disabled={this.state.dataTeamStudentGroup.lenth>0 ? true : null} */}
                        <td><button onClick={() => this.createTeam()} disabled={this.state.dataTeamStudentGroup.length > 0 ? true : null}>Crear Equipo</button></td>
                        <label   > Nombre del Equipo </label>
                        <input
                            type="text"
                            name="teamName"
                            placeholder="escribe el nombre"
                            value={this.state.teamName}
                            onChange={this.onChangeTeamName}
                            disabled={this.state.dataTeamStudentGroup.length > 0 ? true : null}
                        />
                    </table>

                    <table>
                        <div  >
                            <label > Selecciona estudiante a invitar </label>
                            {/* <select onChange={this.selectGuest} disabled={this.state.dataTeamStudentGroup.length === 0 ? true : null} > */}
                            <select onChange={this.selectGuest} disabled={this.disabledButtonInvite()} >
                                <option value="" selected disabled hidden >Seleccionar</option>
                                {this.state.dataStudentWithoutTeam.map(elemento => (
                                    <option key={elemento.id} value={elemento.id} > { elemento.nombre} </option>
                                ))}
                            </select>
                        </div>
                        <td><button disabled={this.disabledButtonInvite()} onClick={() => this.invite()} >Invitar</button></td>
                    </table>

                    <table>
                        <div>
                            <label > Salir del equipo </label>
                            <td><button disabled={this.state.dataMembersTeam.length < 2 ? true : null} onClick={() => this.askLeaveTeam()} >Dejar Equipo</button></td>
                        </div>
                    </table>

                    <table>
                        <div  >
                            <label > Eliminar Integrante del equipo </label>
                            {/* <td><button disabled={this.disabledButtonDeleteTeam()} onClick={() => this.askDeleteTeam()} >Eliminar Equipo</button></td> */}


                            {/* {this.state.dataWriting.filter(writing => writing.idDesafio === challenge.id)
                                    .map((item, index) =>{
                                        n=true;
                                        e=false;
                                        idWriting=item.id;
                                    } 
                                )} */}

                            <select onChange={this.selectKicked} disabled={this.disabledButtonDeleteTeam()} >
                                <option value="" selected disabled hidden >Seleccionar</option>
                                {this.state.dataMembersTeam.filter(member => member.idEstudiante !== AuthUser.getCurrentUser().id)
                                    .map((elemento, index) =>
                                        <option key={elemento.idEstudiante} value={elemento.idEstudiante} > {elemento.nombreEstudiante + " "} {elemento.apellidoEstudiante} </option>
                                    )}
                            </select>
                        </div>
                        <td><button disabled={this.disabledButtonDeleteTeam()} onClick={() => this.showModalKickStudent()} >eliminar</button></td>
                    </table>
                </div>

                <Modal isOpen={this.state.modalLeaveLider}>
                    <ModalHeader>
                        <div><h5>Como lider del equipo antes de abandonar el equipo es necesario asignar un lider</h5></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label> Lider:</label>
                            {/* <input className="form-control" readOnly type="text" value={this.state.form.id} /> */}
                            <select onChange={this.selectLider}  >

                                <option value="" selected disabled hidden >Seleccionar</option>

                                {this.state.dataMembersTeam.map(elemento => (
                                    <option key={elemento.idEstudiante} value={elemento.idEstudiante} > { elemento.nombreEstudiante} </option>
                                ))}
                            </select>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        {/* <Button color="primary" onClick={() => this.editar(this.state.form)}>Aceptarr</Button> */}
                        <Button onClick={() => this.editTeam()}>Aceptar</Button>
                        <Button color="danger" onClick={() => this.closeModalLeaveLider()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalSuccesfulInvitation}>
                    <ModalHeader>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <p> Invitación enviada correctamente</p>
                            {this.closeModalSuccesfulInvitation()}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalSuccessCreateTeam}>
                    <ModalHeader>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <p> Equipo creado correctamente!</p>
                            {this.closeModalSuccessCreateTeam()}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalDeleteTeam}>
                    <ModalHeader>
                        <div><h5>¿Estás seguro de eliminar el equipo?</h5></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>

                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        {/* <Button color="primary" onClick={() => this.editar(this.state.form)}>Aceptarr</Button> */}
                        <Button onClick={() => this.deleteTeam()}>Aceptar</Button>
                        <Button color="danger" onClick={() => this.closeModalDeleteTeam()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalLeaveTeam}>
                    <ModalHeader>
                        <div><h5>¿Estás seguro de abandonar el equipo?</h5></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>

                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        {/* <Button color="primary" onClick={() => this.editar(this.state.form)}>Aceptarr</Button> */}
                        <Button onClick={() => this.leaveTeam()}>Aceptar</Button>
                        <Button color="danger" onClick={() => this.closeModalLeaveTeam()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalKickStudent}>
                    <ModalHeader>
                        <div><h5>¿Estás seguro de querer expulsar del equipo?</h5></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>

                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        {/* <Button color="primary" onClick={() => this.editar(this.state.form)}>Aceptarr</Button> */}
                        <Button onClick={() => this.kickStudentTeam()}>Aceptar</Button>
                        <Button color="danger" onClick={() => this.closeModalKickStudent()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

            </>
        );
    }
}

export default TeamsStudent;