/*
*  Name_file :EditChallenge.js
*  Description: Pagina para editar campos del Desafio, contiene la vista del desafio del profesor
*/
import React, { Component } from 'react';

/*Importacion del css*/
import '../../../styles/Challenge.css';

/*Importaciones del Video*/
import ReactPlayer from "react-player";

/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
// escribe el 'html' en el editor
import { stateFromHTML } from 'draft-js-import-html';

/**Importacion del calendario */
import Dates from '../../dates/dates.js';

/**Datos de Sesion del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/**Servicios del profesor */
import TeacherService from '../../../services/teacher/teacherService';

class EditChallenge extends Component {

    constructor(props) {
        super(props);
        const dataUser = AuthUser.getCurrentUser();
        this.state = {
            editorState: EditorState.createEmpty(),
            contentState: null,
            data: [],
            categories: [],
            formErrors: {
                title: '',
                description: '',
                file: '',
                path: '',
                date: '',
                category: '',
                type: '',
            },
            form: {
                idTeacher: dataUser.id,
                idMultimedia:'',
                idChallenge:this.props.match.params.idChallenge,
                idGroup: this.props.match.params.idGroup,
                title: '',
                description: '',
                file: '',
                path: '',
                reader: '',//valor o flujo de caracteres del fichero
                type: '1',
                qualification: '1',
                category: '',
                date: '',
            }
        };
    }

    componentDidMount() {
        /*Obtiene todas las categorias de los desafios */
        TeacherService.getCategories().then(response => {
            this.setState({ categories: response });
        }).catch(error => {
            console.log(error.message);
        })

        //Obtiene los datos del desafio al iniciar
        TeacherService.getChallenge(this.props.match.params.idChallenge).then(response => {
            var contentState = stateFromHTML(response[0].descripcion);
            let editorState = EditorState.createWithContent(contentState);
            this.setState({ editorState: editorState });
            this.setState({
                form: {
                    ...this.state.form,
                    title: response[0].titulo,
                    description: response[0].descripcion,
                    path: response[0].imagen,
                    type: response[0].colaborativo,
                    qualification:response[0].tipoCalificacion,
                    category: response[0].idCategoria,
                    date: response[0].fechaFin
                }
            });
        }).catch(error => {
            console.log(error.message);
        });


        /*Obtiene multimedia del escrito del estudiante */
        TeacherService.getMultimedia(this.props.match.params.idChallenge)
        .then(response => {
            var respuesta = response.data[0];
            debugger;
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

    /* manejador para validar formulario*/
    handleErrors = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "title":
                formErrors.title =
                    value.length < 1 ? "Campo obligatorio requerido" : "";
                break;
            default:
                break;
        }

        this.setState({
            formErrors, form: {
                ...this.state.form,
                [name]: value
            }
        }, () => console.log(this.state));
    }

    onContentStateChange = contentState => {
        this.setState({
            contentState
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    //redireccion a una pagina
    changeView = () => {
        window.location.href = "/teacher/group";
        //window.location.href = './';
    }


    qualificationSelection = event => {
        this.setState({
            form: {
                ...this.state.form,
                qualification: event.target.value
            }
        });
    };

    /* manejador de fechas*/
    handleDateChange = (date) => {
        // this.setState({ date: date });
        this.setState({
            form: {
                ...this.state.form,
                date: date
            }
        });
    };

    /* manejador de tipo desafio */
    handleSelectionChange = event => {
        this.setState({
            form: {
                ...this.state.form,
                type: event.target.value
            }
        });
    };

    /* manejador de categoria */
    handleSelectionCategory = event => {
        this.setState({
            form: {
                ...this.state.form,
                category: event.target.value
            }
        });
    };

    //Previsualización del fichero(image, video o audio)
    onFileChange = (e) => {
        debugger;
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
                const dir = this.state.form.idTeacher + "/" + res[0] + "/";
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

    //Envio del desafio al server
    sendChallenge = () => {
        TeacherService.editChallenge(this.state.form.idChallenge,this.state.form.idGroup,this.state.form.title,this.state.form.description,this.state.form.type,this.state.form.category,this.state.form.qualification,this.state.form.date)
        .then(response => { 
           
        })
        .catch(error => {
            console.log(error.message);
        });

        
        if (this.state.form.idMultimedia === ""){
            TeacherService.sendMultimedia(this.state.form.file,this.state.form.idTeacher, this.props.match.params.idChallenge, this.state.form.path);
        }
        else{
            TeacherService.editMultimedia(this.state.form.file,this.state.form.idMultimedia,this.state.form.idTeacher ,this.props.match.params.idChallenge, this.state.form.path);
        }   



        // const form = new FormData();
        // form.append("file", this.state.form.file);
        // form.append("idChallenge", this.props.match.params.idChallenge);
        // form.append("idGroup", this.props.match.params.id);
        // form.append("title", this.state.form.title);
        // form.append("description", this.state.form.descripcion);
        // form.append("date", this.state.form.date);
        // form.append("type", this.state.form.type);
        // form.append("category", this.state.form.category);
        // form.append("url", this.state.form.url);

        

        window.location.href = '/teacher/groups';
    };


    /*Dibuja la pagina */
    render() {

        let media = "";
        if (this.state.form.file.type !== undefined) {//si hemos previsualizado un archivo
            if (this.state.form.file.type.includes("image"))
                media = <img className="image" src={this.state.form.reader} />;
            else
                media = <ReactPlayer className="video" url={this.state.form.reader} controls={true} />;
        }
        else {//si no hemos previsualizado un archivo
            if (this.state.form.path == null || this.state.form.path == ""){//si la ruta es vacia o no contiene una ruta (recibido de la bd)
                media = <img className="image" src="http://localhost:3001/images/drop-files.jpg" />;
            }
            else{
                var str = this.state.form.path;
                var res = str.split("/");
                if(res[5]==="image"){
                    media = <img className="image" src={this.state.form.path} />;//si contine una ruta (recibido de la bd)
                }
                else{
                    media = <ReactPlayer className="video" url={this.state.form.path} controls={true} />; 
                }
                
            }
                
        }

        // let media = "";

        // if (this.state.form.path === undefined || this.state.form.path === ""){//si no tiene multimedia desafio, o no se ha previsualizado archivo
        //     media = <img className="image" src="http://localhost:3001/images/drop-files.jpg" />;
        // }
        // else{
            
        //     var str = this.state.form.path;
        //     var res = str.split("/");
        //     if(res[5]==="image"){
        //         media = <img className="image" src={this.state.form.reader} />;
        //     }
        //     else{
        //         media = <ReactPlayer className="video" url={this.state.form.reader} controls={true} />; 
        //     }
        //     // debugger;
        // }

  


        const { formErrors } = this.state;
        return (
            <>
                <div className="challenge-container">
                    <div className='challenge-content'>
                        <div className='challenge-card'>
                            <div class="challenge-inputs">
                                <h2>Editar</h2>
                            </div>

                            <div class="challenge-inputs">
                                <label className='form-label'>Escribe un Titulo </label>
                                <input
                                    className={formErrors.title.length > 0 ? "error" : "form-input"}
                                    type="text"
                                    name="title"
                                    placeholder="escribe el título"
                                    value={this.state.form.title}
                                    onChange={this.handleErrors}
                                />
                                {formErrors.title.length > 0 && (
                                    <span className="errorMessage">{formErrors.title}</span>
                                )}
                            </div>

                            <div class="challenge-inputs">
                                <label className='form-label'>Puedes agregar un fichero multimedia si lo deseas (imagen,video o audio): </label>
                                <div className="form-media">
                                    {media}
                                    <input type="file" id="file" name="imagen" onChange={this.onFileChange} />
                                </div>
                            </div>

                            <div class="challenge-inputs">
                                <label className='form-label'>Escribe una Descripción </label>
                                <Editor
                                    //contentState={this.state.form.descripcion}
                                    editorState={this.state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onContentStateChange={this.onContentStateChange}
                                    onChange={(event, editor) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
                                            }
                                        });
                                    }}
                                />
                            </div>

                            <div class="challenge-inputs">
                                <label className='form-label'>Selecciona la categoría del desafio </label>
                                <select value={this.state.form.category} onChange={this.handleSelectionCategory}>
                                    {this.state.categories.map(elemento => (
                                        <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                                    ))}

                                </select>
                            </div>
                            
                            <div class="challenge-inputs">
                                <label className='form-label'>Tipo de Calificación</label>
                                <select value={this.state.form.qualification} onChange={this.qualificationSelection}>
                                    <option value="1">Numerica</option>
                                    <option value="2">Conceptual</option>
                                </select>
                            </div>

                            <div class="challenge-inputs">
                                <label className='form-label'>Selecciona si el desafio es individual o en equipo  </label>
                                <select value={this.state.form.type} onChange={this.handleSelectionChange}>
                                    {/* <option value="" selected disabled hidden>Choose here</option> */}
                                    {/* <option value = {this.state.form.type} selected>{this.state.form.type} </option> */}
                                    <option value="1">Individual</option>
                                    <option value="2">Equipo</option>
                                </select>
                            </div>

                            <div class="challenge-inputs">
                                <label className='form-label'>Selecciona la duración del desafio </label>
                                <Dates handleDateChange={this.handleDateChange} param={this.state.form.date} />
                            </div>
                        </div>

                        <div className="form-btn">
                            <button className="form-btn-send" onClick={() => this.sendChallenge()}>Guardar</button>
                            <button className="form-btn-cancel" onClick={() => this.changeView()}>Cancelar</button>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default EditChallenge;