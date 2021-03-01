/*
*  Name_file :CreateChallenge.js
*  Description: Pagina del Desafio, contiene la vista del desafio del profesor
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

/**Importacion del calendario */
import Dates from '../../dates/dates.js';

/**Datos de Sesion del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/**Servicios del profesor */
import TeacherService from '../../../services/teacher/teacherService';

class CreateChallenge extends Component {

    constructor(props) {
        super(props);
        const dataUser = AuthUser.getCurrentUser();
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
                idTeacher: dataUser.id,
                idGroup: this.props.match.params.idGroup,
                title: '',
                description: '',
                file: '',
                path: '',//ruta del fichero
                reader: '',//valor o flujo de caracteres del fichero
                type: '1',//individual o colaborativo
                qualification:'1',
                category: '',
                date: new Date(),//fecha
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


    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    changeView = () => {
        //debugger;
        window.location.href = "/teacher/groups";
    }

    handleDateChange = (date) => {
        this.setState({
            form: {
                ...this.state.form,
                date: date
            }
        });
    };
    
    qualificationSelection = event => {
        this.setState({
            form: {
                ...this.state.form,
                qualification: event.target.value
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
        TeacherService.createChallenge(this.state.form.idGroup,this.state.form.title,this.state.form.description,this.state.form.type,this.state.form.category,this.state.form.qualification,this.state.form.date) .then(response => {
            const idChallenge=response.data;
            TeacherService.sendMultimedia(this.state.form.file, this.state.form.idTeacher, idChallenge, this.state.form.path)
            .then(response => {

            })
            .catch(error => {
                console.log(error.message);
            });
        })
        .catch(error => {
            console.log(error.message);
        });
        window.location.href = '/teacher/groups';
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
                <div className="challenge-container">
                    <div className='challenge-content'>
                        <div className='challenge-card'>

                            <div class="challenge-inputs">
                                <h2>Crea tu propio desafio completando la información de abajo</h2>
                            </div>

                            <div class="challenge-inputs">
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

                            <div class="challenge-inputs">
                                <label className='form-label'>Puedes agregar un fichero multimedia si lo deseas (imagen,video o audio): </label>
                                <div className="form-media">
                                    {media}
                                    <input
                                        type="file"
                                        id="file" name="imagen"
                                        onChange={this.onFileChange}
                                    />
                                </div>
                            </div>
                            <div class="challenge-inputs">
                                <label className='form-label'>Escribe una Descripción </label>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    // onChange={this.handleEditorChange}
                                    onChange={(event, editor) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
                                            }
                                        });
                                    }}
                                />
                            </div>
                            <div class="challenge-inputs">
                                <label className='form-label'>Selecciona la categoría del desafio </label>
                                <select onChange={this.handleSelectionCategory}>
                                    <option value="" selected disabled hidden>Choose here</option>
                                    {this.state.categories.map(elemento => (
                                        <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="challenge-inputs">
                                <label className='form-label'>Tipo de Calificación</label>
                                <select onChange={this.qualificationSelection}>
                                    <option value="" selected disabled hidden>Choose here</option>
                                    <option value="1">Numerica</option>
                                    <option value="2">Conceptual</option>
                                </select>
                            </div>
                            <div class="challenge-inputs">
                                <label className='form-label'>Selecciona si el desafio es individual o en equipo  </label>
                                <select onChange={this.handleSelectionChange}>
                                    <option value="" selected disabled hidden>Choose here</option>
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
                            <button className="form-btn-send" onClick={() => this.sendChallenge()}>Enviar</button>
                            <button className="form-btn-cancel" onClick={() => this.changeView()}>Cancelar</button>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default CreateChallenge;