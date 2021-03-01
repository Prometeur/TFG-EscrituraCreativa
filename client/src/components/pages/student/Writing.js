/*
*  Name_file :Writing.js
*  Description: Pagina del Escrito, contiene la vista del escrito para un desafio seleccionado por el estudiante
*/
import React, { Component } from 'react';
/*Importacion del css*/
import '../../../styles/Writing.css';

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

class Writing extends Component {

    constructor(props) {
        super(props);
        const dataUser = AuthUser.getCurrentUser();
        this.state = {
            editorState: EditorState.createEmpty(),
            data: [],
            form: {
                idWriter: dataUser.id,
                escrito: '',
                file: '',
                path: '',//ruta del fichero
                reader: ''
            }
        }
    }

    componentDidMount() {
        /*Obtiene el desafio del estudiante seleccionado*/
        StudentService.getChallenge(this.props.match.params.idChallenge).then(response => {
            this.setState({
                data: response
            });
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Previsualización del fichero(image, video o audio)
    onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (file.type.includes("image") || file.type.includes("video") || file.type.includes("audio")) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    this.setState({
                        form: {
                            ...this.state.form,
                            reader: reader.result
                        }
                    });
                }
                var str = file.type;
                var res = str.split("/");
                const dir = this.state.form.idWriter + "/" + res[0] + "/";
                this.setState({
                    form: {
                        ...this.state.form,
                        file: file,
                        path: "http://localhost:3001/multimedia/" + dir + file.name
                    }
                });
            }
            else {
                console.log("there was an error")
            }
        }
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

    /*Envia al servidor el escrito y multimedia del estudiante*/
    send = () => {
        if (this.state.form.escrito !== '') {
            /*Envia el escrito del estudiante*/
            StudentService.sendWriting(this.props.match.params.idGroup, this.props.match.params.idChallenge, this.state.form.idWriter, this.state.form.escrito, this.state.data[0].colaborativo)
                .then(response => {
                })
                .catch(error => {
                    console.log(error.message);
                });
            if (this.state.form.file !== "") {
                /*Envia los archivos multimedia del estudiante*/
                StudentService.sendMultimedia(this.state.form.file, this.state.form.idWriter, this.props.match.params.idChallenge, this.state.form.path);
            }
        }
        window.location.href = '/student/groups';
    }

    /*Dibuja la pagina */
    render() {
        const { editorState } = this.state;
        const { formErrors } = this.state;
        let mediaWriting = <img className="image" src="http://localhost:3001/images/drop-files.jpg" />;
        //Si cargamos una imagen
        if (this.state.form.file.type !== undefined)  {
            if (this.state.form.file.type.includes("image"))
                mediaWriting = <img className="image" src={this.state.form.reader} />;
            else//video o audio
                mediaWriting = <ReactPlayer className="video" url={this.state.form.reader} controls={true} />;
        }
        return (
            <>
                <div className="writing-container">
                    <div className="writing-content">
                        <div className="challenge-card">
                            {this.state.data.map(challenge => {
                                let mediaChallenge = "";
                                if (challenge.imagen !== null || challenge.imagen !== "")
                                    mediaChallenge = <img className="image" src={challenge.imagen} />;//si contine una ruta
                                return (
                                    <div>
                                        <h2>{challenge.titulo}  </h2>
                                        <h4>Descripción  </h4>
                                        <div className="content" dangerouslySetInnerHTML={{ __html: challenge.descripcion }}></div>
                                        <h4>Categoria </h4>
                                        <label className='form-label'>{this.state.data[0].nombre}</label>
                                        <h4>Multimedia </h4>
                                        {mediaChallenge}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="writing-card">
                            <div class="form-inputs">
                                <label className='form-label'>Escribe una Descripción </label>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onChange={this.editorChange}
                                />
                            </div>
                            <div class="form-inputs">
                                <label className='form-label'>Puedes agregar un fichero multimedia si lo deseas (imagen,video o audio): </label>
                                <div className="form-media">
                                    {mediaWriting}
                                    <input type="file" id="file" name="imagen" onChange={this.onFileChange} />
                                </div>
                            </div>
                            <button text='enviar' onClick={() => this.send()}> enviar  </button>
                            <button onClick={() => window.location.href = '/student/groups'}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Writing;