import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './Challenge.css';

/*Importaciones del Video*/
import ReactPlayer from "react-player";

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

const baseUrl = "http://localhost:3001/teacher/editChallenge";
const baseUrl2 = "http://localhost:3001/teacher/getCategories";
const baseUrl3 = "http://localhost:3001/teacher/getChallenge";
const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario




class EditChallenge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentState: null,
            editorState: EditorState.createEmpty(),
            //editorState:null,
            data: [],
            categories: [],

            formErrors: {
                title: '',
                description: '',
                file: '',
                url: '',
                date: '',
                category: '',
                type: '',
            },

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

    /*Elimina los datos de sesion almacenada por las cookies*/
    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('correo', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('apellidos', { path: "/" });
        cookies.remove('foto', { path: "/" });
        cookies.remove('activo', { path: "/" });
        cookies.remove('rol', { path: "/" });
        cookies.remove('description', { path: "/" });
        cookies.remove('descriptionChallenge', { path: "/" });

        window.location.href = './';
    }

    // ciclo de vida
    componentDidMount() {

        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
        //carga las categorias del desafio al iniciar
        axios.get(baseUrl2).then(response => {
            this.setState({ categories: response.data });
        }).catch(error => {
            console.log(error.message);
        })

        //carga los datos del desafio al iniciar
        axios.get(baseUrl3, { params: { idChallenge: cookies.get('idChallenge') } }).then(response => {
            var respuesta = response.data[0];
            // prueba=respuesta.descripcion

            var contentState = stateFromHTML(respuesta.descripcion);
            let editorState = EditorState.createWithContent(contentState);
            this.setState({ editorState: editorState });

            this.setState({
                form: {
                    ...this.state.form,
                    title: respuesta.titulo,
                    descripcion: respuesta.descripcion,
                    url: respuesta.imagen,
                    category: respuesta.idCategoria,
                    type: respuesta.colaborativo,
                    date: respuesta.fechaFin
                }
            });
        }).catch(error => {
            console.log(error.message);
        })

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

        debugger;
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
        cookies.remove('description', { path: "/" });
        window.location.href = "/teacher/group";
        //window.location.href = './';
    }

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
        form.append("idChallenge", cookies.get('idChallenge'));
        form.append("idGroup", cookies.get('groupSelect'));
        form.append("title", this.state.form.title);
        form.append("description", this.state.form.descripcion);
        form.append("date", this.state.form.date);
        form.append("type", this.state.form.type);
        form.append("category", this.state.form.category);
        form.append("url", this.state.form.url);
        axios.post(baseUrl, form);
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
                media = <img className="image" src={this.state.form.url} />;//si contine una url (recibido de la bd)
        }
        const { formErrors } = this.state;
        return (
            <>
                <div className="form-container">

                    <div className="challenge-head">
                        <nav>
                            <button className="btn btn-primary" onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                        </nav>
                    </div>

                    <div className='form-content'>
                        <form className='form'>

                            <div class="form-inputs">
                                <h2>Editar</h2>
                            </div>

                            <div class="form-inputs">
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

                            <div class="form-inputs">
                                <label className='form-label'>Puedes agregar un fichero multimedia si lo deseas (imagen,video o audio): </label>
                                <div className="form-media">
                                    {media}
                                    <input
                                        type="file"
                                        id="file" name="imagen"
                                        onChange={this.onFileChange}
                                    />
                                    <label htmlFor="file" className="label">
                                        <i className="material-icons">add_a_photo</i>
                                    </label>
                                </div>



                            </div>

                            <div class="form-inputs">
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
                                                descripcion: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
                                            }
                                        });
                                    }}
                                />
                                {/* <textarea
                                    disabled
                                    value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
                                >
                                </textarea> */}
                            </div>

                            <div class="form-inputs">
                                <label className='form-label'>Selecciona la categoría del desafio </label>
                                <select value={this.state.form.category} onChange={this.handleSelectionCategory}>
                                    {this.state.categories.map(elemento => (
                                        <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                                    ))}

                                </select>
                            </div>

                            <div class="form-inputs">
                                <label className='form-label'>Selecciona si el desafio es individual o en equipo  </label>
                                <select value={this.state.form.type} onChange={this.handleSelectionChange}>
                                    {/* <option value="" selected disabled hidden>Choose here</option> */}
                                    {/* <option value = {this.state.form.type} selected>{this.state.form.type} </option> */}
                                    <option value="1">Individual</option>
                                    <option value="2">Equipo</option>
                                </select>
                            </div>

                            <div class="form-inputs">
                                <label className='form-label'>Selecciona la duración del desafio </label>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            // label="Date picker inline"
                                            value={this.state.form.date}
                                            onChange={this.handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            // label="Time picker"
                                            value={this.state.form.date}
                                            onChange={this.handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>
                        </form>

                        <div className="form-btn">
                            <button className="form-btn-send" onClick={() => this.sendChallenge()}>
                                Guardar
                                </button>
                            <button className="form-btn-cancel" onClick={() => this.changeView()}>
                                Cancelar
                                </button>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default EditChallenge;