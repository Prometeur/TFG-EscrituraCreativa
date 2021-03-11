<<<<<<< HEAD
import React, { Component } from 'react';
import TeacherService from '../../../services/teacher/teacherService';
import '../../../styles/Challenge.css';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import '../../dates/Dates.js';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
/*Importaciones del Video*/
import ReactPlayer from "react-player";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
/*Importaciones del time*/
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

// escribe el 'html' en el editor
import { stateFromHTML } from 'draft-js-import-html';
import Dates from "../../dates/Dates";
=======
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
import { EditorState, convertToRaw } from "draft-js";
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
import teacherService from '../../../services/teacher/teacherService';

import { Link } from "react-router-dom";
>>>>>>> luis

class EditChallenge extends Component {

    constructor(props) {
        super(props);
<<<<<<< HEAD

        this.state = {
            contentState: null,
            stateModal: false,
            editorState: EditorState.createEmpty(),
            //editorState:null,
            data: [],
            categories: [],

=======
        const dataUser = AuthUser.getCurrentUser();
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            imgCollection: '',
            editorState: EditorState.createEmpty(),
            contentState: null,
            data: [], //array de multimedia del desafio
            categories: [],
>>>>>>> luis
            formErrors: {
                title: '',
                description: '',
                file: '',
<<<<<<< HEAD
                url: '',
=======
                path: '',
>>>>>>> luis
                date: '',
                category: '',
                type: '',
            },
<<<<<<< HEAD

            form: {
                title: '',
                descripcion: '',
                file: '',
                url: '',
                reader: '',//valor o flujo de caracteres del fichero
                date: '',
                type: '1',
                category: '',
            }
        };

    }


    // ciclo de vida
    componentDidMount() {

        //carga las categorias del desafio al iniciar
=======
            form: {
                idTeacher: dataUser.id,
                idMultimedia: '',
                idChallenge: this.props.match.params.idChallenge,
                idGroup: this.props.match.params.idGroup,
                title: '',
                description: '',
                file: '',
                path: '',
                reader: '', //valor o flujo de caracteres del fichero
                type: '1',
                qualification: '1',
                category: '',
                date: '',
            }
        };
    }

    componentDidMount() {
        //Obtiene todas las categorias de los desafios 
>>>>>>> luis
        TeacherService.getCategories().then(response => {
            this.setState({ categories: response });
        }).catch(error => {
            console.log(error.message);
        })

<<<<<<< HEAD
        //carga los datos del desafio al iniciar
        TeacherService.getChallenge(this.props.match.params.idChallenge).then(response => {
            
            // prueba=respuesta.descripcion
            var contentState = stateFromHTML(response[0].descripcion);
            let editorState = EditorState.createWithContent(contentState);
            this.setState({ editorState: editorState });

            this.setState({
                form: {
                    ...this.state.form,
                    title:response[0].titulo,
                    descripcion:response[0].descripcion,
                    url:response[0].imagen,
                    category:response[0].idCategoria,
                    type:response[0].colaborativo,
                    date:response[0].fechaFin
=======
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
                    qualification: response[0].tipoCalificacion,
                    category: response[0].idCategoria,
                    date: response[0].fechaFin
>>>>>>> luis
                }
            });
        }).catch(error => {
            console.log(error.message);
<<<<<<< HEAD
        })

=======
        });

        //Obtiene multimedia del desafio del profesor 
        TeacherService.getMultimedia(this.props.match.params.idChallenge)
            .then(response => {
                var respuesta = response.data[0];
                this.setState({
                    data: response.data,
                    form: {
                        ...this.state.form,
                        idMultimedia: respuesta.id,
                        path: respuesta.ruta
                    }
                });
            }).catch(error => {
                console.log(error.message);
            });
>>>>>>> luis
    }

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
<<<<<<< HEAD
        console.log(this.state.form);//visualizar consola navegador lo que escribimos en el input

=======
        console.log(this.state.form); //visualizar consola navegador lo que escribimos en el input
>>>>>>> luis
    }

    /* manejador para validar formulario*/
    handleErrors = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
<<<<<<< HEAD

        debugger;
=======
>>>>>>> luis
        switch (name) {
            case "title":
                formErrors.title =
                    value.length < 1 ? "Campo obligatorio requerido" : "";
                break;
            default:
                break;
        }
<<<<<<< HEAD

        this.setState({
            formErrors, form: {
=======
        this.setState({
            formErrors,
            form: {
>>>>>>> luis
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

<<<<<<< HEAD
    onModal(modal) {
        this.setState({
             stateModal:modal
        });
    }

=======
>>>>>>> luis
    //redireccion a una pagina
    changeView = () => {
        window.location.href = "/teacher/group";
        //window.location.href = './';
    }

<<<<<<< HEAD
    /* manejador de fechas*/
    handleDateChange = (date) => {


=======
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
>>>>>>> luis
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

<<<<<<< HEAD
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

                this.setState({
                    form: {
                        ...this.state.form,
                        file: file,
                        url: "http://localhost:3001/images/" + file.name
                    }
                });
                debugger;
            }
            else {
                console.log("there was an error")
            }
        }
    }

    //Envio del desafio al server
    sendChallenge = () => {
        const form = new FormData();
        form.append("file", this.state.form.file);
        form.append("idChallenge",this.props.match.params.idChallenge);
        form.append("idGroup", this.props.match.params.id);
        form.append("title", this.state.form.title);
        form.append("description", this.state.form.descripcion);
        form.append("date", this.state.form.date);
        form.append("type", this.state.form.type);
        form.append("category", this.state.form.category);
        form.append("url", this.state.form.url);
        
        TeacherService.editChallenge(form);

        this.setState({stateModal:false});

        window.location.href = '/teacher/group/';
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
            if (this.state.form.url == null || this.state.form.url == "")//si la url es vacia o no contiene una url (recibido de la bd)
                media = <img className="image" src="http://localhost:3001/images/drop-files.jpg" />;
            else
                media =  <div className="image"><p>Selecciona tu multimedia </p></div>;
        }
        const { formErrors } = this.state;
        return (
            <div className="container">
                <label className='form-label'>Modificar datos</label>
                    <Card className="card-edit">
                        <Card.Body>
                            <div className="row-edit">
                                <div className="form-inputs">
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
                            </div>
                            <div className="row-edit">
                                <div class="form-inputs">
                                <label className='form-label'>Descripción</label>
                                <Editor

                                    editorState={this.state.editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="border-edit"
                                    toolbarClassName="toolbarClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onContentStateChange={this.onContentStateChange}
                                    onChange={(event, editor) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                descripcion: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
                                            }
                                        });
                                    }}
                                />
                                </div>
                            </div>
                            <div className="row-edit">
                                <div className="form-select">
                                    <label className='form-label'>Selecciona la categoría</label>
                                    <select value={this.state.form.category} onChange={this.handleSelectionCategory}>
                                        {this.state.categories.map(elemento => (
                                            <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                                        ))}

                                    </select>
                                </div>
                                <div class="form-select">
                                    <label className='form-label'>Selecciona el tipo de evalución</label>
                                    <select value={this.state.form.type} onChange={this.handleSelectionChange}>
                                        {/* <option value="" selected disabled hidden>Choose here</option> */}
                                        {/* <option value = {this.state.form.type} selected>{this.state.form.type} </option> */}
                                        <option value="1">Individual</option>
                                        <option value="2">Equipo</option>
                                    </select>
                                 </div>
                            </div>
                            <div className="row-edit">
                                <div className="form-select">
                                    <label className='form-label'>Selecciona la fecha y hora final </label>
                                    <Dates param={this.state.form.date}/>
                                </div>
                            </div>
                            <div className="row-edit">
                                <div className="form">
                                    {media}
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={this.onFileChange}
                                    />
                                    <label htmlFor="file" className="btn-1">upload file</label>
                                </div>
                            </div>
                            <div className="form-btn">
                                <Button   onClick={() => this.onModal(true)} >
                                    Guardar
                                </Button>
                            </div>
                                    <Modal
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        show={this.state.stateModal}
                                        onHide={this.state.stateModal}
                                    >
                                        <Modal.Header >
                                            <Modal.Title id="contained-modal-title-vcenter">
                                                Modal heading
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h4>Centered Modal</h4>
                                            <p>
                                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                                consectetur ac, vestibulum at eros.
                                            </p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={()=> this.onModal(false)}>Cancelar</Button>
                                            <Button onClick={() => this.sendChallenge()}>Aceptar</Button>
                                        </Modal.Footer>
                                    </Modal>
                        </Card.Body>
                    </Card>
            </div>
=======
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
    //             const dir = this.state.form.idTeacher + "/" + res[0] + "/";
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

    //Envio del desafio al server
    sendChallenge = () => {
        TeacherService.editChallenge(this.state.form.idChallenge, this.state.form.idGroup, this.state.form.title, this.state.form.description, this.state.form.type, this.state.form.category, this.state.form.qualification, this.state.form.date)
            .then(response => {
                if (this.state.imgCollection.length > 0) {
                    TeacherService.sendMultimedia(this.state.imgCollection, this.state.form.idTeacher, this.props.match.params.idChallenge)
                        .then(response => {
                            window.location.href = '/teacher/groups';
                        })
                        .catch(error => {
                            console.log(error.message);
                        });
                }
                else
                    window.location.href = '/teacher/groups';
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    deleteFile = (challenge) => {
        var str = challenge.ruta;
        var res = str.split("/");
        var opcion = window.confirm("Estás Seguro que deseas Eliminar " + res[7]);
        if (opcion === true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (challenge.id === registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo });
            teacherService.deleteMultimedia(challenge.id, challenge.ruta)
                .then(response => {

                })
                .catch(error => {
                    console.log(error.message);
                });
        }
    }


    onFileChange(e) {
        this.setState({ imgCollection: e.target.files })
    }

    //Obtiene el nombre del desafio/escrito
    showTitle = (challenge) => {
        var str = challenge.ruta;
        var res = str.split("/");
        return res[7];
    }

    editorChange = () => {
        this.setState({
            form: {
                ...this.state.form,
                description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            }
        });
    };

    /*Dibuja la pagina */
    render() {
        let media = "";
        if (this.state.form.file.type !== undefined) { //si hemos previsualizado un archivo
            if (this.state.form.file.type.includes("image"))
                media = < img className="image"
                    src={this.state.form.reader}
                    alt="" />;
            else
                media = < ReactPlayer className="video"
                    url={this.state.form.reader}
                    controls={true}
                />;
        } else { //si no hemos previsualizado un archivo
            if (this.state.form.path == null || this.state.form.path === "") { //si la ruta es vacia o no contiene una ruta (recibido de la bd)
                media = < img className="image"
                    src="http://localhost:3001/images/drop-files.jpg"
                    alt="" />;
            } else {
                var str = this.state.form.path;
                var res = str.split("/");
                if (res[5] === "image") {
                    media = < img className="image"
                        src={this.state.form.path}
                        key={this.state.form.path}
                        alt="" />; //si contine una ruta (recibido de la bd)
                } else {
                    media = < ReactPlayer className="video"
                        url={this.state.form.path}
                        controls={true}
                    />;
                }
            }
        }
        const { formErrors } = this.state;
        const { data } = this.state;
        return (
            <>
                <div className="challenge-container" >
                    <div className='challenge-content' >
                        <div className='challenge-card' >
                            <div class="challenge-inputs" >
                                <h2 > Editar </h2>
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Escribe un Titulo </label>
                                <input className={formErrors.title.length > 0 ? "error" : "form-input"}
                                    type="text"
                                    name="title"
                                    placeholder="escribe el título"
                                    value={this.state.form.title}
                                    onChange={this.handleErrors}
                                />
                                {formErrors.title.length > 0 && (<span className="errorMessage">{formErrors.title}</span>)}
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Escribe una Descripción </label>
                                <Editor
                                    editorState={this.state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onContentStateChange={this.onContentStateChange}
                                    onChange={this.editorChange}
                                />
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Puedes agregar un fichero multimedia si lo deseas(imagen, video o audio): </label>
                                <div className="form-media" > { /* {media} */} { /* <input type="file" id="file" name="imagen" onChange={this.onFileChange} /> */}
                                    <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                                </div>
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Ficheros Multimedia: </label>
                                <table>
                                    <tbody>
                                        {data.map((challenge) => (
                                            <tr key={challenge.id} >
                                                <td > {this.showTitle(challenge)} </td>
                                                <td > < a href={challenge.ruta} > Ver </a></td >
                                                <td > < button onClick={() => this.deleteFile(challenge)}>Eliminar</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Selecciona la categoría del desafio </label>
                                <select value={this.state.form.category} onChange={this.handleSelectionCategory}>{
                                    this.state.categories.map(elemento => (
                                        <option key={elemento.id} value={elemento.id} > { elemento.nombre} </option>
                                    ))}
                                </select>
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Tipo de Calificación </label>
                                <select value={this.state.form.qualification} onChange={this.qualificationSelection} >
                                    <option value="1" > Numerica </option>
                                    <option value="2" > Conceptual </option>
                                </select>
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Selecciona si el desafio es individual o en equipo </label>
                                <select value={this.state.form.type} onChange={this.handleSelectionChange} > { /* <option value="" selected disabled hidden>Choose here</option> */} { /* <option value = {this.state.form.type} selected>{this.state.form.type} </option> */}
                                    <option value="1" > Individual </option>
                                    <option value="2" > Equipo </option>
                                </select>
                            </div>
                            < div class="challenge-inputs" >
                                < label className='form-label' > Selecciona la duración del desafio </label>
                                <Dates handleDateChange={this.handleDateChange} param={this.state.form.date} />
                            </div>
                        </div>
                        <div className="form-btn" >
                            < button className="form-btn-send" onClick={() => this.sendChallenge()} > Guardar </button>
                            < button className="form-btn-cancel" onClick={() => this.changeView()} > Cancelar </button>
                        </div>
                    </div>
                </div>
            </>
>>>>>>> luis
        );
    }
}

export default EditChallenge;