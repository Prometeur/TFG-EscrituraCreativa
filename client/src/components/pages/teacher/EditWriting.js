/*
*  Name_file :EditWriting.js
*  Description: Pagina de editar Escrito
*/

import React, { Component } from 'react';
import { Link } from "react-router-dom";

/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { stateFromHTML } from 'draft-js-import-html';// escribe el 'html' en el editor
// import EditorText from '../../TextEditor/TextEditor.js';

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/**Servicios del estudiante */
import TeacherService from '../../../services/teacher/teacherService.js';

/*Importacion del css*/
import '../../../styles/Writing.css';
import '../../../styles/Challenge.css';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';

/*Componentes de estilo Bootstrap*/
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from 'react-bootstrap/Button';

/*Componentes de estilo Reactstrap*/
import {
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";

class EditWriting extends Component {

    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            imgCollection: [],//array de ficheros multimedia
            dataTeamStudent: [],//contiene el equipo del estudiante
            contentState: null,//editor
            editorState: EditorState.createEmpty(),
            challenge: '',//contiene el desafio 
            dataMediaChallenge: [],//array de multimedia del desafio
            dataMediaWriting: [],//array de multimedia del escrito
            modalDeleteFile: false,
            deleteFileMedia: '',//fichero multimedia del escrito que desea ser borrado
            nameDeleteFileMedia: '',//nomnbre del fichero multimedia del escrito que desea ser borrado
            writing: '',
            form: {
                idWriter: '',
                title: '',
                escrito: '',
                score: '',
                commentary: '',
                finishWriting: '',
            }
        }
    }

    componentDidMount() {
        /*Obtiene el desafio seleccionado*/
        TeacherService.getChallenge(this.props.match.params.idChallenge)
            .then(response => {
                debugger;
                this.setState({

                    challenge: response[0]
                });
                //Si es colaborativo
                if (response[0].colaborativo === 2) {
                    /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
                    TeacherService.getTeamStudentGroup(this.props.match.params.idStudent, this.props.match.params.idGroup)
                        .then(response => {
                            this.setState({
                                dataTeamStudent: response,
                                form: {
                                    ...this.state.form,
                                    idWriter: response[0].idEquipo
                                }
                            });

                            /*Obtiene multimedia del escrito del equipo */
                            TeacherService.getMultimediaWriting(this.props.match.params.idChallenge, response[0].idEquipo)
                                .then(response => {
                                    this.setState({ dataMediaWriting: response.data });
                                }).catch(error => {
                                    console.log(error.message);
                                });

                        }).catch(error => {
                            console.log(error.message);
                        })
                }
                else {//si es individual
                    this.setState({
                        dataTeamStudent: response,
                        form: {
                            ...this.state.form,
                            idWriter: this.props.match.params.idStudent
                        }
                    });

                    /*Obtiene multimedia del escrito del estudiante */
                    TeacherService.getMultimediaWriting(this.props.match.params.idChallenge, this.props.match.params.idStudent)
                        .then(response => {
                            this.setState({ dataMediaWriting: response.data });
                        }).catch(error => {
                            console.log(error.message);
                        });
                }

            }).catch(error => {
                console.log(error.message);
            });

        /*Obtiene multimedia del desafio*/
        TeacherService.getMultimediaChallenge(this.props.match.params.idChallenge)
            .then(response => {
                this.setState({ dataMediaChallenge: response.data, });
            }).catch(error => {
                console.log(error.message);
            });

        /*Obtiene el escrito del estudiante */
        TeacherService.getWriting(this.props.match.params.idWriting)
            .then(response => {
                var contentState = stateFromHTML(response.data[0].texto);
                let editorState = EditorState.createWithContent(contentState);
                // this.setState({ editorState: editorState });
                this.setState({
                    writing: response.data[0],
                    editorState: editorState,
                    form: {
                        ...this.state.form,
                        title: response.data[0].nombre,
                        escrito: response.data[0].texto,
                        score: response.data[0].puntuacion,
                        commentary: response.data[0].comentario,
                        finishWriting:response.data[0].finalizado
                    }
                });
            }).catch(error => {
                console.log(error.message);
            });
    }

    //Envia el escrito editado 
    editWriting = () => {
        /*Edita escrito del estudiante*/
        TeacherService.editWriting(this.props.match.params.idWriting, this.props.match.params.idGroup, this.props.match.params.idChallenge, this.state.form.idWriter, this.state.form.title, this.state.form.escrito, this.state.form.score,this.state.form.commentary,this.state.challenge.colaborativo,this.state.form.finishWriting)
            .then(response => {
                window.location.href = '/teacher';

            })
            .catch(error => {
                console.log(error.message);
            });
    }

    //Carga los ficheros multimedia del escrito 
    onFileChange(e) {
        this.setState({ imgCollection: e.target.files });
    }

    //convierte la descripción del escrito a html y lo guarda en el form
    editorChange = () => {
        this.setState({
            form: {
                ...this.state.form,
                escrito: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            }
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    onContentStateChange = contentState => {
        this.setState({
            contentState
        });
    };

    //Obtiene el nombre de los ficheros multimedia desafio/escrito
    showTitle = (challenge) => {
        var str = challenge.ruta;
        var res = str.split("/");
        return res[8];
    }

    //Muestra modal de confirmación para eliminar fichero multimedia
    askDeleteFile = (writing) => {
        var str = writing.ruta;
        var res = str.split("/");
        this.setState({
            nameDeleteFileMedia: res[8],
            deleteFileMedia: writing
        });
        this.showModalDeleteFile();
    }

    //Muestra el modal de eliminar fichero
    showModalDeleteFile = () => {
        this.setState({
            modalDeleteFile: true,
        });
    };

    //Cierra el modal de eliminar fichero
    closeModalDeleteFile = () => {
        this.setState({ modalDeleteFile: false });
    };

    onChangeWritingName = e => {
        this.setState({
            form: {
                ...this.state.form,
                title: e.target.value
            }
        });
    }
    onChangeScore = e => {
        this.setState({
            form: {
                ...this.state.form,
                score: e.target.value
            }
        });
    }

    onChangeCommentary = e => {
        this.setState({
            form: {
                ...this.state.form,
                commentary: e.target.value
            }
        });
    }

    onChangeFinishWriting = e => {
        this.setState({
            form: {
                ...this.state.form,
                finishWriting: e.target.value
            }
        });
    }

    /*Dibuja la pagina */
    render() {
        const { dataMediaChallenge } = this.state;
        const { dataMediaWriting } = this.state;
        // const { formErrors } = this.state;
        return (
            <>
                <div className="container">
                    <label className='form-label'>Editar Escrito</label>
                    <Card className="card-edit">
                        <Card.Body>
                            <div className="row-edit">
                                <h2 > {this.state.challenge.titulo} </h2>
                            </div>
                            <div className="row-edit">

                                <label className='form-label'>Categoria</label>
                                <p>{this.state.challenge.nombre}</p>
                            </div>

                            <div className="row-edit">
                                <label className='form-label'>Leer la descripción del Desafío</label>
                                <div className="challenge-inputs" dangerouslySetInnerHTML={{ __html: this.state.challenge.descripcion }}></div>
                            </div>
                            <div className="row-edit">
                                <label className='form-label'>Ficheros Multimedia: </label>
                                <table>
                                    <tbody>
                                        <div style={{ width: "500px", height: "250px", overflow: "scroll", behavior: "smooth" }}>
                                            {dataMediaChallenge.map((challenge) => (
                                                <tr key={challenge.id}>
                                                    <td>{this.showTitle(challenge)}</td>
                                                    <td><Button onClick={() => window.open(challenge.ruta)}>Ver</Button></td>
                                                </tr>
                                            ))}
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                            <div className="form-inputs">
                                <label className='form-label'>Titulo</label>
                                <div>
                                    <input
                                        // className='form-input'
                                        type="text"
                                        name="title"
                                        placeholder="Escribe el título"
                                        value={this.state.form.title}
                                        // onChange={this.handleChange}
                                        onChange={this.onChangeWritingName}
                                    />
                                </div>

                            </div>
                            <div className="row-edit">
                                <label className='form-label' >Descripción </label>
                                <Editor
                                    editorState={this.state.editorState}
                                    // toolbarClassName="toolbarClassName"
                                    // // wrapperClassName="demo-wrapper"
                                    // // editorClassName="border-edit"
                                    wrapperClassName="wrapperClassName1"
                                    editorClassName="editorClassName1"
                                    toolbarClassName="toolbarClassName1"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onContentStateChange={this.onContentStateChange}
                                    onChange={this.editorChange}
                                />
                                {/* <EditorText onEditorStateChange={this.onEditorStateChange} onContentStateChange={this.onContentStateChange}  onChange={this.editorChange} param={this.state.editorState}/> */}
                            </div>



                            <div class="row-edit">
                                <label className='form-label'>Ficheros Multimedia: </label>
                                <table>
                                    <tbody>
                                        <div style={{ width: "500px", height: "250px", overflow: "scroll", behavior: "smooth" }}>
                                            {dataMediaWriting.map((writing) => (
                                                <tr key={writing.id}>
                                                    <td>{this.showTitle(writing)}</td>
                                                    <td><Button onClick={() => window.open(writing.ruta)}>Ver</Button></td>

                                                </tr>
                                            ))}
                                        </div>
                                    </tbody>
                                </table>
                            </div>

                            <div class="row-edit">
                                <label className='form-label'>Calificación: </label>
                                <td><textarea rows="2" cols="10" value={this.state.form.score} onChange={this.onChangeScore} style={{ resize: "none", textAlign: "center" }} ></textarea></td>
                            </div>
                            {/* <td><textarea name="mensaje" rows="10" cols="70" value={this.state.message.mensaje} readOnly={true} style={{ resize: "none" }} ></textarea></td> */}

                            <div class="row-edit">
                                <label className='form-label'>Comentarios: </label>
                                <td><textarea rows="10" cols="70" value={this.state.form.commentary} onChange={this.onChangeCommentary} style={{ resize: "none", justifyContent: "center" }} ></textarea></td>
                            </div>

                            <div class="row-edit">
                                <label className='form-label'>Escrito Finalizado: </label>
                                <select  value={this.state.form.finishWriting}  onChange={this.onChangeFinishWriting} >
                                    <option value="" selected disabled hidden > Seleccionar </option>
                                    <option value="1" > Si </option>
                                    <option value="0" > No </option>
                                </select>

                            </div>

                            <div className="form-select">
                                <Button text='enviar' onClick={() => this.editWriting()}> Guardar  </Button>
                            </div>
                            <div className="form-select">
                                <Button onClick={() => window.location.href = '/teacher'}>Cancelar</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <Modal isOpen={this.state.modalDeleteFile}>
                    <ModalHeader>
                        <div><h5>¿Estás seguro de eliminar {this.state.nameDeleteFileMedia}?</h5> </div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => this.deleteFile(this.state.deleteFileMedia)}>Aceptar</Button>
                        <Button variant="danger" onClick={() => this.closeModalDeleteFile()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}
export default EditWriting;