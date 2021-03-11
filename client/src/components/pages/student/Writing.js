/*
*  Name_file :Writing.js
*  Description: Pagina del Escrito, contiene la vista del escrito para un desafio seleccionado por el estudiante
<<<<<<< HEAD
*    
*/

import React, { Component } from 'react';
import StudentService from '../../../services/student/student-service.js';


class Writing extends Component {


    constructor(props){
         super(props);

         this.state = {
            data: [],
            form: {
                id: '',
                nombre: '',
                escrito: '',
            }
        }
    }
  
    /*Se hacen peticiones al servidor para que me devuelva el desafio seleccionado por el estudiante*/
    peticionGet = () => {
    
        StudentService.getWritings().then(response => {
            console.log(response.data);//muestra consola navegador
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }


    /*Se envia al servidor el escrito del estudiante*/
    sendWriting = () => {
        window.location.href = './groupStudent';
        
    }

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);//visualizar consola navegador lo que escribimos en el input
    }


    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
    si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        
        this.peticionGet();
      
=======
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
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            imgCollection: '',
            editorState: EditorState.createEmpty(),
            challenge: '',
            dataMediaChallenge: [],//array de multimedia del desafio
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
        /*Obtiene el desafio seleccionado por el estudiante*/
        StudentService.getChallenge(this.props.match.params.idChallenge).then(response => {
            this.setState({
                challenge: response[0]
            });

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
        this.setState({ imgCollection: e.target.files })
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
        if (this.state.form.escrito !== '') {
            /*Envia el escrito del estudiante*/
            StudentService.sendWriting(this.props.match.params.idGroup, this.props.match.params.idChallenge, this.state.form.idWriter, this.state.form.escrito, this.state.challenge.colaborativo)
                .then(response => {
                    if (this.state.imgCollection.length > 0) {
                        /*Envia los archivos multimedia del estudiante*/
                        StudentService.sendMultimedia(this.state.imgCollection, this.state.form.idWriter, this.props.match.params.idChallenge)
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
        
    }

    //Obtiene el nombre del desafio
    showTitle = (challenge) => {
        var str = challenge.ruta;
        var res = str.split("/");
        return res[7];

>>>>>>> luis
    }

    /*Dibuja la pagina */
    render() {
<<<<<<< HEAD
        return (
            <>
                <h2> Crear Writing</h2>
                <div>
                    <div>
                        {this.state.data.map(challenge => {
                            return (
                                <div>
                                    <h3>{challenge.titulo} </h3>
                                    <p> {challenge.descripcion}</p>
                                    {console.log(this.data)}
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <textarea name="escrito" rows="4" cols="50" onChange={this.handleChange}></textarea>
                        <br />
                        <br />
                        <button text='enviar' onClick={() => this.sendWriting()}> enviar  </button>
                    </div>

=======
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
                <div className="writing-container">
                    <div className="writing-content">

                        <div className="challenge-card">
                            <div class="challenge-inputs">
                                {/* <label className='form-label'>{this.state.challenge.titulo}</label> */}
                                <h2 > {this.state.challenge.titulo} </h2>
                            </div>
                            <div class="challenge-inputs">
                                <label className='form-label'>{this.state.challenge.nombre}</label>
                            </div>
                            <div className="challenge-inputs" dangerouslySetInnerHTML={{ __html: this.state.challenge.descripcion }}></div>
                            <div class="challenge-inputs">
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
                        </div>

                        <div className="writing-card">

                            <div class="writing-inputs">
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

                            <div class="writing-inputs">
                                <label className='form-label'>Puedes agregar un fichero multimedia si lo deseas (imagen,video o audio): </label>
                                <div className="form-media">
                                    {/* {mediaWriting}
                                    <input type="file" id="file" name="imagen" onChange={this.onFileChange} /> */}
                                    <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                                </div>
                            </div>

                            <button text='enviar' onClick={() => this.send()}> enviar  </button>
                            <button onClick={() => window.location.href = '/student/groups'}>Cancelar</button>
                        </div>
                    </div>
>>>>>>> luis
                </div>
            </>
        );
    }
}

<<<<<<< HEAD

=======
>>>>>>> luis
export default Writing;