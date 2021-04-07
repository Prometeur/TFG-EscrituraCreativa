/*
*  Name_file :Writing.js
*  Description: Pagina del Escrito
*/
import React, { Component, forwardRef } from 'react';

/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/**Servicios del estudiante */
import StudentService from '../../../services/student/student-service.js';

/*Importacion del css*/
import '../../../styles/Writing.css';
import '../../../styles/Challenge.css';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';

/*Componentes de estilos Bootstrap*/
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from 'react-bootstrap/Button';

class CreateWriting extends Component {

    constructor(props) {
        super(props);
        const dataUser = AuthUser.getCurrentUser();
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            imgCollection: [],//ficheros multimedia del escrito
            dataTeamStudent: [],//Contiene los datos del equipo del estudiante
            editorState: EditorState.createEmpty(),
            challenge: '',//contiene el desafio
            dataMediaChallenge: [],//array de multimedia del desafio
            form: {
                idWriter: '',//idUser/idTeam según el tipo de desafío
                title: '',//nombre del escrito 
                escrito: '',//descripcion del escrito
            }
        }
    }

    componentDidMount() {
        /*Obtiene el desafio seleccionado por el estudiante*/
        StudentService.getChallenge(this.props.match.params.idChallenge).then(response => {
            this.setState({
                challenge: response[0]
            });
            //Si es colaborativo
            if (response[0].colaborativo === 2) {
                /*Obtiene equipo del estudiante correspondiente a un grupo en concreto*/
                StudentService.getTeamStudentGroup(AuthUser.getCurrentUser().id, this.props.match.params.idGroup)
                    .then(response => {
                        debugger;
                        this.setState({
                            dataTeamStudent: response,
                            form: {
                                ...this.state.form,
                                idWriter: response[0].idEquipo
                            }
                        });
                    }).catch(error => {
                        console.log(error.message);
                    })
            }
            else {//es individual
                this.setState({
                    dataTeamStudent: response,
                    form: {
                        ...this.state.form,
                        idWriter: AuthUser.getCurrentUser().id
                    }
                });
            }
        }).catch(error => {
            console.log(error.message);
        });

        /*Obtiene multimedia del desafio*/
        StudentService.getMultimediaChallenge(this.props.match.params.idChallenge)
            .then(response => {
                var respuesta = response.data[0];//hay que cambiar

                this.setState({
                    dataMediaChallenge: response.data
                });
            }).catch(error => {
                console.log(error.message);
            });
    }

    /*Envia el escrito y multimedia del estudiante*/
    sendWriting = () => {
        //Compruebo si no se ha creado un escrito anteriormente 
        StudentService.getWritingWriter(this.props.match.params.idGroup, this.props.match.params.idChallenge, this.state.form.idWriter)
            .then(response => {
                //si no se hay escritos creados anteriormente
                if (response.data.length == 0) {
                    /**Si el estudiante/equipo ha escrito algo se envia */
                    if (this.state.form.escrito !== '') {
                        /*Envia el escrito del estudiante*/
                        StudentService.sendWriting(this.props.match.params.idGroup, this.props.match.params.idChallenge, this.state.form.idWriter, this.state.form.title, this.state.form.escrito, this.state.challenge.colaborativo)
                            .then(response => {
                                if (this.state.imgCollection.length > 0) {
                                    /*Envia los archivos multimedia del estudiante*/
                                    StudentService.sendMultimedia(this.state.imgCollection, this.state.form.idWriter, this.props.match.params.idChallenge, this.state.challenge.colaborativo)
                                        .then(response => {
                                            // window.location.href = '/student/groups';
                                            window.location.href = '/student';
                                        }).catch(error => {
                                            console.log(error.message);
                                        });
                                }
                                else {
                                    window.location.href = '/student';
                                }
                            })
                            .catch(error => {
                                console.log(error.message);
                            });
                    }
                }
                else {
                    var opcion = window.confirm("Ha ocurrido un error ya existe un escrito creado");
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    //Carga los ficheros multimedia del escrito 
    onFileChange(e) {
        this.setState({ imgCollection: e.target.files });
    }

    //Convierte la descripción del escrito a html y lo guarda en el form
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
            editorState,
        });
    };

    //Obtiene el nombre de los ficheros multimedia desafio/escrito
    showTitle = (challenge) => {
        var str = challenge.ruta;
        var res = str.split("/");
        return res[8];
    }

    onChangeWritingName = e => {
        this.setState({
            form: {
                ...this.state.form,
                title: e.target.value
            }
        });
    }

    //Muestra el tipo de desafio
    showTypeChallenge = () => {

        if (this.state.challenge.colaborativo === 1) {
            return "Escrito individual"
        }
        else {
            return "Escrito Colaborativo"
        }
    }

    /*Dibuja la pagina */
    render() {
        const { dataMediaChallenge } = this.state;
        const { editorState } = this.state;
        // const { formErrors } = this.state;
        return (
            <>
                <div className="container">

                    <label className='form-label'>{this.showTypeChallenge()}</label>

                    <Card className="card-edit">
                        <Card.Body >
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
                                                    {/* <td><a href={challenge.ruta}>Ver</a></td> */}
                                                    <td><Button onClick={() => window.open(challenge.ruta)}>Ver</Button></td>
                                                </tr>
                                            ))}
                                        </div>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row-edit">
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
                                <label className='form-label'> Descripción </label>
                                <Editor
                                    editorState={editorState}
                                    // toolbarClassName="toolbarClassName"
                                    // wrapperClassName="wrapperClassName"
                                    // editorClassName="editorClassName"
                                    wrapperClassName="wrapperClassName1"
                                    editorClassName="editorClassName1"
                                    toolbarClassName="toolbarClassName1"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onChange={this.editorChange}
                                />
                            </div>
                            <div class="row-edit">
                                <label className='form-label'>Puedes agregar un fichero multimedia si lo deseas (imagen,video o audio): </label>
                                <div className="form">
                                    <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                                </div>
                            </div>

                            <div className="form-select">
                                <Button text='enviar' onClick={() => this.sendWriting()}> Enviar  </Button>
                            </div>
                            <div className="form-select">
                                <Button onClick={() => window.location.href = '/student'}>Cancelar</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </>
        );
    }
}

export default CreateWriting;