/*
*  Name_file :Writing.js
*  Description: Pagina del Escrito, contiene la vista del escrito para un desafio seleccionado por el estudiante
*/
import React, { Component, forwardRef } from 'react';

/*Importaciones del Video*/
import ReactPlayer from "react-player";

/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/**Servicios del estudiante */
import StudentService from '../../../services/student/student-service.js';

/*Estilos*/
import '../../../styles/Writing.css';
import '../../../styles/Challenge.css';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';


/*Componentes de Estilos*/
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
            imgCollection: [],
            imgNamesCollection: [],
            dataTeamStudent: [],
            editorState: EditorState.createEmpty(),
            challenge: '',
            dataMediaChallenge: [],//array de multimedia del desafio
            form: {
                idWriter: '',
                escrito: '',
                file: '',
                path: '',//ruta del fichero
                reader: ''
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
                    dataMediaChallenge: response.data,
                    form: {
                        ...this.state.form,
                        idMultimedia: respuesta.id,
                        path: respuesta.ruta
                    }
                });
            }).catch(error => {
                console.log(error.message);
            });
    }

    // //Previsualización del fichero(image, video o audio)
    // onFileChange = (e) => {
    //     debugger;
    //     if (e.target.files && e.target.files.length > 0) {
    //         const file = e.target.files[0]
    //         if (file.type.includes("image") || file.type.includes("video") || file.type.includes("audio")) {
    //             const reader = new FileReader()
    //             reader.readAsDataURL(file)
    //             reader.onload = () => {
    //                 this.setState({
    //                     form: {
    //                         ...this.state.form,
    //                         reader: reader.result
    //                     }
    //                 });
    //             }
    //             var str = file.type;
    //             var res = str.split("/");
    //             const dir = this.state.form.idWriter + "/" + res[0] + "/";
    //             this.setState({
    //                 form: {
    //                     ...this.state.form,
    //                     file: file,
    //                     path: "http://localhost:3001/multimedia/" + dir + file.name
    //                 }
    //             });
    //         }
    //         else {
    //             console.log("there was an error")
    //         }
    //     }
    // }

    onFileChange(e) {
        this.setState({ imgCollection: e.target.files });
        // let newFiles = this.state.imgNamesCollection;
        // Array.from(e.target.files).forEach((file) => {newFiles.push(file)});
        // this.setState({imgNamesCollection:[...newFiles]});
    }

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

    /*Envia el escrito y multimedia del estudiante*/
    send = () => {

        /**Si el estudiante/equipo ha escrito algo se envia */
        if (this.state.form.escrito !== '') {
            /*Envia el escrito del estudiante*/
            StudentService.sendWriting(this.props.match.params.idGroup, this.props.match.params.idChallenge, this.state.form.idWriter, this.state.form.escrito, this.state.challenge.colaborativo)
                .then(response => {
                    if (this.state.imgCollection.length > 0) {
                        /*Envia los archivos multimedia del estudiante*/
                        StudentService.sendMultimedia(this.state.imgCollection, this.state.form.idWriter, this.props.match.params.idChallenge, this.state.challenge.colaborativo)
                            .then(response => {
                                window.location.href = '/student/groups';
                            }).catch(error => {
                                console.log(error.message);
                            });
                    }
                    else {
                        window.location.href = '/student/groups';
                    }
                })
                .catch(error => {
                    console.log(error.message);
                });


        }

    }

    //Obtiene el nombre de los ficheros multimedia desafio/escrito
    showTitle = (challenge) => {
        var str = challenge.ruta;
        var res = str.split("/");
        debugger;
        return res[8];

    }

    /*Dibuja la pagina */
    render() {
        const { dataMediaChallenge } = this.state;
        const { editorState } = this.state;
        // const { formErrors } = this.state;
        let mediaWriting = <img className="image" src="http://localhost:3001/images/drop-files.jpg" alt="" />;
        //Si cargamos una imagen
        if (this.state.form.file.type !== undefined) {
            if (this.state.form.file.type.includes("image"))
                mediaWriting = <img className="image" src={this.state.form.reader} alt="" />;
            else//video o audio
                mediaWriting = <ReactPlayer className="video" url={this.state.form.reader} controls={true} />;
        }
        return (
            <>
                <div className="container">
                    <label className='form-label'>Nuevo Escrito</label>
                    <Card className="card-edit">
                        <Card.Body >
                            <div className="row-edit">
                                <label className='form-label'>{this.state.challenge.titulo}</label>
                                {/* <h2 > {this.state.challenge.titulo} </h2> */}
                            </div>
                            <div className="row-edit">
                                <label className='form-label'>{this.state.challenge.nombre}</label>
                            </div>
                            <div className="row-edit">
                                <div className="challenge-inputs" dangerouslySetInnerHTML={{ __html: this.state.challenge.descripcion }}></div>
                            </div>

                            <div className="row-edit">
                                <label className='form-label'>Ficheros Multimedia: </label>
                                <table>
                                    <tbody>
                                        {dataMediaChallenge.map((challenge) => (
                                            <tr key={challenge.id}>
                                                <td>{this.showTitle(challenge)}</td>
                                                <td><a href={challenge.ruta}>Ver</a></td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>

                            <div className="row-edit">
                                <label className='form-label'> Descripción </label>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onChange={this.editorChange}
                                />
                            </div>

                            {/* <div className="row-edit">
                                <label className='form-label'>Puedes agregar un fichero multimedia si lo deseas (imagen,video o audio): </label>
                                <div className="form">
                                    {
                                        this.state.imgNamesCollection == 0 ? (
                                            <Alert variant='info'>
                                                No hay Archivos cargados.
                                            </Alert>
                                        ) : (

                                            <ListGroup>
                                                {this.state.imgNamesCollection.map((row, index) => (
                                                    <ListGroup.Item action variant="info" key={index}>
                                                        <i className="form-select">{row.name}</i>
                                                        <IconButton className="form-select" aria-label="delete" onClick={() => this.onDeleteMultimedia(index)}>
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>

                                        )
                                    }
                                    <input id="file" type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                                    <label htmlFor="file" className="btn-1">upload file</label>
                                </div>
                            </div> */}
                               <div class="row-edit">
                                <label className='form-label'>Puedes agregar un fichero multimedia si lo deseas (imagen,video o audio): </label>
                                <div className="form">
                                    <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                                </div>
                            </div>


                            <div className="form-select">
                                <Button text='enviar' onClick={() => this.send()}> Enviar  </Button>
                            </div>
                            <div className="form-select">
                                <Button onClick={() => window.location.href = '/student/groups'}>Cancelar</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </>
        );
    }
}

export default CreateWriting;