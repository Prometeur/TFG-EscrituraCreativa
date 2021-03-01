/*
*  Name_file :Writing.js
*  Description: Pagina del Escrito, contiene la vista del escrito para un desafio seleccionado por el estudiante
*    
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
// escribe el 'html' en el editor
import { stateFromHTML } from 'draft-js-import-html';

/**Servicios del estudiante */
import StudentService from '../../../services/student/student-service.js';

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

import EditorText from '../../TextEditor/TextEditor.js';

class EditWriting extends Component {

    constructor(props) {
        super(props);
        const dataUser = AuthUser.getCurrentUser();
        this.state = {
            contentState: null,
            editorState: EditorState.createEmpty(),
            dataChallenge: [],//guarda el desafio
            dataWriting:[],
            form: {
                idMultimedia: '',
                idWriting: '',
                idWriter: dataUser.id,
                escrito: '',
                file: '',
                path: '',
                reader: ''
            }
        }
    }

    componentDidMount() {
        /*Obtiene el desafio del estudiante seleccionado*/
        StudentService.getChallenge(this.props.match.params.idChallenge, this.state.form.idWriter).then(response => {
            this.setState({
                dataChallenge: response
            });
        }).catch(error => {
            console.log(error.message);
        });

        /*Obtiene el escrito del estudiante */
        StudentService.getWriting(this.props.match.params.idChallenge, this.state.form.idWriter).then(response => {
            var respuesta = response.data[0];
            var contentState = stateFromHTML(respuesta.texto);
            let editorState = EditorState.createWithContent(contentState);
            // this.setState({ editorState: editorState });
            this.setState({
                editorState: editorState,
                form: {
                    ...this.state.form,
                    idWriting: respuesta.id,
                    escrito: respuesta.texto
                }
            });
        }).catch(error => {
            console.log(error.message);
        });

        /*Obtiene multimedia del escrito del estudiante */
        StudentService.getMultimedia(this.props.match.params.idChallenge, this.state.form.idWriter).then(response => {
            var respuesta = response.data[0];
     
            this.setState({
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
                const dir=  this.state.form.idWriter + "/"+ res[0] +"/";
                this.setState({
                    form: { 
                    ...this.state.form,file: 
                    file,
                    path: "http://localhost:3001/multimedia/" + dir + file.name
                }});
            }
            else 
                console.log("there was an error")
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
        StudentService.editWriting(this.state.form.idWriting, this.props.match.params.idGroup, this.props.match.params.idChallenge, this.state.form.idWriter, this.state.form.escrito, this.state.dataChallenge[0].colaborativo)
            .then(response => {
            })
            .catch(error => {
                console.log(error.message);
            });
   
        if (this.state.form.idMultimedia === ""){
            StudentService.sendMultimedia(this.state.form.file, this.state.form.idWriter, this.props.match.params.idChallenge, this.state.form.path);
        }
        else{
            StudentService.editMultimedia(this.state.form.idMultimedia, this.state.form.idWriter, this.props.match.params.idChallenge, this.state.form.path);
        }   
        window.location.href = '/student/groups';
    }

    /*Dibuja la pagina */
    render() {
        // const { editorState } = this.state;
        const { formErrors } = this.state;
        let media1 = "";
        if (this.state.form.file.type !== undefined) {//si hemos previsualizado un archivo
            if (this.state.form.file.type.includes("image"))
                media1 = <img className="image" src={this.state.form.reader} />;
            else
                media1 = <ReactPlayer className="video" url={this.state.form.reader} controls={true} />;
        }
        else {//si no hemos previsualizado un archivo
            if (this.state.form.path == null || this.state.form.path == ""){//si la url es vacia o no contiene una url (recibido de la bd)
                media1 = <img className="image" src="http://localhost:3001/images/drop-files.jpg" />;
            }
                else{
                    media1 = <img className="image" src={this.state.form.path} />;//si contine una url (recibido de la bd)
                }   
        }
        return (
            <>
                <div className="writing-container">
                    <div className="writing-content">
                        <div className="challenge-card">
                            {this.state.dataChallenge.map(challenge => {
                                let mediaChallenge = "";
                                //si la ruta es vacia o no contiene una ruta (recibido de la bd)
                                if (challenge.imagen == null || challenge.imagen == "")
                                    mediaChallenge = <img className="image" src="http://localhost:3001/images/drop-files.jpg" />;
                                else{//si contine una ruta (recibido de la bd)
                                    mediaChallenge = <img className="image" src={challenge.imagen} />;
                                }
                                return (
                                    <div>
                                        <h2>{challenge.titulo}  </h2>
                                        <h4>Descripción  </h4>
                                        <div className="content" dangerouslySetInnerHTML={{ __html: challenge.descripcion }}></div>
                                        <h4>Categoria </h4>
                                        <label className='form-label'>{this.state.dataChallenge[0].nombre}</label>
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
                                    editorState={this.state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onContentStateChange={this.onContentStateChange}
                                    onChange={this.editorChange}
                                />
                                {/* <EditorText onEditorStateChange={this.onEditorStateChange} onContentStateChange={this.onContentStateChange}  onChange={this.editorChange} param={this.state.editorState}/> */}
                            </div>

                            <div class="form-inputs">
                                <label className='form-label'>Puedes agregar un fichero multimedia si lo deseas (imagen,video o audio): </label>
                                <div className="form-media">
                                    {media1}
                                    <input type="file" id="cocacola" name="imagen" onChange={this.onFileChange}/>
                                </div>
                            </div>
                            <br />
                            <br />
                            <button text='enviar' onClick={() => this.editWriting()}> enviar  </button>
                            <button onClick={() => window.location.href = '/student/groups'}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default EditWriting;