import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './Challenge.css';


/*Importaciones del Video*/
import ReactPlayer from "react-player";

/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

import Dates from './Components/Dates';

const baseUrl = "http://localhost:3001/teacher/postChallenge";
const baseUrl2 = "http://localhost:3001/teacher/getCategories";
const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class Challenge extends Component {

    constructor(props) {
        super(props);
        this.state = {

            editorState: EditorState.createEmpty(),
            data: [],
            categories: [],

            formErrors: {
                title: '',
                description: '',
                file: '',
                date: '',
                category: '',
                type: '',
            },

            form: {
                title: '',
                descripcion: '',
                file: '',
                reader: '',//valor o flujo de caracteres del fichero
                date: new Date(),
                // //date: '',
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
        window.location.href = '/';
    }

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
    si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        if (!cookies.get('correo')) {
            window.location.href = "/";
        }
        axios.get(baseUrl2, { params: { idEstudiante: cookies.get('groupSelect') } }).then(response => {
            console.log(response.data);//muestra consola navegador
            this.setState({ categories: response.data });
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
        //debugger;
        // this.setState({ formErrors, [name]: value }, () => console.log(this.state));
        this.setState({
            formErrors, form: {
                ...this.state.form,
                [name]: value
            }
        }, () => console.log(this.state));
    }

    // handleEditorChange = (editorState) => {

    //     this.setState({
    //         form: {
    //             ...this.state.form,
    //             descripcion: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    //         }
    //     });
    // };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    changeView = () => {
        //debugger;
        window.location.href = "/teacher/group/";
    }

    handleDateChange = (date) => {
        this.setState({
            form: {
                ...this.state.form,
                date: date
            }
        });
    };

    handleSelectionChange = event => {
        this.setState({
            form: {
                ...this.state.form,
                type: event.target.value
            }
        });
    };

    handleSelectionCategory = event => {
        this.setState({
            form: {
                ...this.state.form,
                category: event.target.value
            }
        });
    };


    //Previsualización del fichero
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
        if (this.state.form.file.type !== undefined) {
            if (this.state.form.file.type.includes("image"))
                media = <img className="image" src={this.state.form.reader} />;
            else
                media = <ReactPlayer className="video" url={this.state.form.reader} controls={true} />;
        }
        else {
            media = <img className="image" src="http://localhost:3001/images/drop-files.jpg" />;
        }

        const { editorState } = this.state;
        const { formErrors } = this.state;
        //console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

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
                                <h2>Crea tu propio desafio completando la información de abajo</h2>
                            </div>

                            <div class="form-inputs">
                                <label className='form-label'>Escribe un Titulo </label>
                                <input
                                    // className='form-input'
                                    className={formErrors.title.length > 0 ? "error" : "form-input"}
                                    type="text"
                                    name="title"
                                    placeholder="escribe el título"
                                    // onChange={this.handleChange}
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
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    
                                    onChange={this.handleEditorChange}

                                    onChange={(event, editor) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                descripcion: draftToHtml(convertToRaw(editorState.getCurrentContent()))
                                            }
                                        });
                                    }}
                                />

                            </div>
                            <div class="form-inputs">
                                <label className='form-label'>Selecciona la categoría del desafio </label>
                                <select onChange={this.handleSelectionCategory}>
                                    <option value="" selected disabled hidden>Choose here</option>
                                    {this.state.categories.map(elemento => (
                                        <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                                    ))}

                                </select>
                            </div>

                            <div class="form-inputs">
                                <label className='form-label'>Selecciona si el desafio es individual o en equipo  </label>
                                <select onChange={this.handleSelectionChange}>
                                    <option value="" selected disabled hidden>Choose here</option>
                                    <option value="1">Individual</option>
                                    <option value="2">Equipo</option>
                                </select>
                            </div>

                            <div class="form-inputs">
                                <label className='form-label'>Selecciona la duración del desafio </label>
                                <Dates
                                    handleDateChange={this.handleDateChange}
                                    param={this.state.form.date}
                                />
                            </div>
                        </form>

                        <div className="form-btn">
                            <button className="form-btn-send" onClick={() => this.sendChallenge()}>
                                Enviar
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

export default Challenge;