/*
*  Name_file :Writing.js
*  Description: Pagina del Escrito, contiene la vista del escrito para un desafio seleccionado por el estudiante
*    
*/
import React, { Component } from 'react';

/*Importacion del css*/
import '../../../styles/Writing.css';
import '../../../styles/Challenge.css';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';

/*Importaciones del Video*/
import ReactPlayer from "react-player";

/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
// escribe el 'html' en el editor
import { stateFromHTML } from 'draft-js-import-html';

/**Servicios del estudiante */
import StudentService from '../../../services/student/student-service.js';

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button  from 'react-bootstrap/Button';



class EditWriting extends Component {

    constructor(props) {
        super(props);
        const dataUser = AuthUser.getCurrentUser();
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            imgCollection: [],
            imgNamesCollection:[],
            contentState: null,
            editorState: EditorState.createEmpty(),
            challenge: '',
            dataMediaChallenge: [],//array de multimedia del desafio
            dataMediaWriting: [],//array de multimedia del escrito
            form: {
                idWriter: dataUser.id,
                escrito: '',
                file: '',
                reader: ''
            }
        }
    }

    componentDidMount() {
        /*Obtiene el desafio del estudiante seleccionado*/
        StudentService.getChallenge(this.props.match.params.idChallenge)
            .then(response => {
                this.setState({
                    challenge: response[0]
                });
            }).catch(error => {
                console.log(error.message);
            });

        /*Obtiene multimedia del desafio*/
        StudentService.getMultimediaChallenge(this.props.match.params.idChallenge)
            .then(response => {
                this.setState({ dataMediaChallenge: response.data, });
            }).catch(error => {
                console.log(error.message);
            });

        /*Obtiene el escrito del estudiante */
        StudentService.getWriting(this.props.match.params.idWriting)
            .then(response => {
                var contentState = stateFromHTML(response.data[0].texto);
                let editorState = EditorState.createWithContent(contentState);
                // this.setState({ editorState: editorState });
                this.setState({
                    editorState: editorState,
                    form: {
                        ...this.state.form,
                        escrito: response.data[0].texto
                    }
                });
            }).catch(error => {
                console.log(error.message);
            });

        /*Obtiene multimedia del escrito del estudiante */
        StudentService.getMultimediaWriting(this.props.match.params.idChallenge, this.state.form.idWriter)
            .then(response => {
                this.setState({ dataMediaWriting: response.data });
            }).catch(error => {
                console.log(error.message);
            });
    }

    // //Previsualización del fichero(image, video o audio)
    // onFileChange = (e) => {
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
    //                     ...this.state.form, file:
    //                         file,
    //                     path: "http://localhost:3001/multimedia/" + dir + file.name
    //                 }
    //             });
    //         }
    //         else
    //             console.log("there was an error")
    //     }
    // }

    onDeleteMultimedia(indexItem){
        this.setState(()=>
            ({imgNamesCollection:this.state.imgNamesCollection.filter((todo,index)=> index !==indexItem)}));
    }

    onFileChange(e) {
        let newFiles = this.state.imgNamesCollection;
        this.setState({ imgCollection: e.target.files });
        Array.from(e.target.files).forEach((file) => {newFiles.push(file)});
        this.setState({imgNamesCollection:[...newFiles]});

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
            editorState
        });
    };

    onContentStateChange = contentState => {
        this.setState({
            contentState
        });
    };

    editWriting = () => {
        /*Edita escrito del estudiante*/
        StudentService.editWriting(this.props.match.params.idWriting, this.props.match.params.idGroup, this.props.match.params.idChallenge, this.state.form.idWriter, this.state.form.escrito, this.state.challenge.colaborativo)
            .then(response => {
                if (this.state.imgCollection.length > 0) {
                    StudentService.sendMultimedia(this.state.imgNamesCollection, this.state.form.idWriter, this.props.match.params.idChallenge)
                        .then(response => {
                            window.location.href = '/student/groups';
                        }).catch(error => {
                            console.log(error.message);
                        });
                }
                else{
                    window.location.href = '/student/groups';
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    //Obtiene el nombre del desafio/escrito
    showTitle = (challenge) => {
        var str = challenge.ruta;
        var res = str.split("/");
        return res[7];
    }

    deleteFile = (writing) => {
        var str = writing.ruta;
        var res = str.split("/");
        var opcion = window.confirm("Estás Seguro que deseas Eliminar " + res[7]);
        if (opcion === true) {
            var contador = 0;
            var arreglo = this.state.dataMediaWriting;
            arreglo.map((registro) => {
                if (writing.id === registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ dataMediaWriting: arreglo });
            StudentService.deleteMultimedia(writing.id, writing.ruta)
                .then(response => {
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
    }

    /*Dibuja la pagina */
    render() {
        const { dataMediaChallenge } = this.state;
        const { dataMediaWriting } = this.state;
        // const { formErrors } = this.state;
        let media1 = "";
        if (this.state.form.file.type !== undefined) {//si hemos previsualizado un archivo
            if (this.state.form.file.type.includes("image"))
                media1 = <img className="image" src={this.state.form.reader} alt="" />;
            else
                media1 = <ReactPlayer className="video" url={this.state.form.reader} controls={true} />;
        }
        else {//si no hemos previsualizado un archivo
            if (this.state.form.path == null || this.state.form.path === "") {//si la url es vacia o no contiene una url (recibido de la bd)
                media1 = <img className="image" src="http://localhost:3001/images/drop-files.jpg" alt="" />;
            }
            else {
                media1 = <img className="image" src={this.state.form.path} alt="" />;//si contine una url (recibido de la bd)
            }
        }
        return (
            <div className="container">
                <label className='form-label'>Editar Escrito</label>
                <Card className="card-edit">
                  <Card.Body>
                    <div class="row-edit">
                        <h5> {this.state.challenge.titulo} </h5>
                    </div>
                    <div class="row-edit">
                        <label className='form-label'>{this.state.challenge.nombre}</label>
                    </div>
                    <div className="challenge-inputs" dangerouslySetInnerHTML={{ __html: this.state.challenge.descripcion }}></div>
                    <div class="row-edit">
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
                        <label className='form-label'>Descripción</label>
                        <div class="form-inputs">
                            <Editor
                                editorState={this.state.editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="border-edit"
                                onEditorStateChange={this.onEditorStateChange}
                                onContentStateChange={this.onContentStateChange}
                                onChange={this.editorChange}
                            />
                            {/* <EditorText onEditorStateChange={this.onEditorStateChange} onContentStateChange={this.onContentStateChange}  onChange={this.editorChange} param={this.state.editorState}/> */}
                        </div>
                    </div>   
                    <div class="row-edit">
                        <label className='form-label'>Puedes agregar un fichero multimedia si lo deseas (imagen,video o audio): </label>
                        <div className="form">
                            {
                                this.state.imgNamesCollection ==0 ? (
                                    <Alert variant='info'>
                                        No hay Archivos cargados.
                                    </Alert>
                                ): (

                                    <ListGroup>
                                        {this.state.imgNamesCollection.map((row, index) => (
                                            <ListGroup.Item action variant="info" key={index}>
                                                <i className="form-select">{row.name}</i>
                                                <IconButton  className="form-select" aria-label="delete" onClick={()=>this.onDeleteMultimedia(index)}>
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
                    </div>
                    <div class="row-edit">
                        <label className='form-label'>Ficheros Multimedia: </label>
                        <table>
                            <tbody>
                                {dataMediaWriting.map((writing) => (
                                    <tr key={writing.id}>
                                        <td>{this.showTitle(writing)}</td>
                                        <td><a href={writing.ruta}>Ver</a></td>
                                        <td > < button onClick={() => this.deleteFile(writing)} > Eliminar </button> </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="form-select">
                        <Button text='enviar' onClick={() => this.editWriting()}> Enviar </Button>                  
                    </div>
                    <div className="form-select">
                        <Button onClick={() => window.location.href = '/student/groups'}>Cancelar</Button>                 
                    </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default EditWriting;