import React, { Component } from 'react';

/*Importaciones del css*/
import '../../../styles/Challenge.css';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';

/*Importaciones del Video*/
import ReactPlayer from "react-player";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

// escribe el 'html' en el editor
import { stateFromHTML } from 'draft-js-import-html';

/**Importacion del calendario */
import Dates from "../../dates/dates.js";

/**Datos de Sesion del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/**Servicios del profesor */
import TeacherService from '../../../services/teacher/teacherService';


class EditChallenge extends Component {

    constructor(props) {
        super(props);

        const dataUser = AuthUser.getCurrentUser();
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            imgCollection: [],//array de ficheros multimedia
            editorState: EditorState.createEmpty(),
            contentState: null,
            data: [], //array de multimedia del desafio
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
        TeacherService.getCategories().then(response => {
            this.setState({ categories: response });
        }).catch(error => {
            console.log(error.message);
        })

        //Obtiene los datos del desafio al iniciar
        TeacherService.getChallenge(this.props.match.params.idChallenge).then(response => {
            debugger;
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
                }
            });
        }).catch(error => {
            console.log(error.message);

        })

        //Obtiene multimedia del desafio del profesor
        TeacherService.getMultimediaChallenge(this.props.match.params.idChallenge)
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
            formErrors,
            form: {
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

    onModal(modal) {
        this.setState({
            stateModal: modal
        });
    }

    //redireccion a una pagina
    changeView = () => {
        window.location.href = "/teacher";
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

    //Envio del desafio al server
    sendChallenge = () => {
        debugger;
        TeacherService.editChallenge(this.state.form.idChallenge, this.state.form.idGroup, this.state.form.title, this.state.form.description, this.state.form.type, this.state.form.category, this.state.form.qualification, this.state.form.date)
            .then(response => {
                if (this.state.imgCollection.length > 0) {
                    TeacherService.sendMultimediaChallenge(this.state.imgCollection, this.state.form.idTeacher, this.props.match.params.idChallenge, this.state.form.type)
                        .then(response => {
                            window.location.href = '/teacher';
                        })
                        .catch(error => {
                            console.log(error.message);
                        });
                }
                else
                    window.location.href = '/teacher';
            })
            .catch(error => {
                console.log(error.message);
            });
    };


    deleteFile = (challenge) => {
        var str = challenge.ruta;
        var res = str.split("/");
        var opcion = window.confirm("Estás Seguro que deseas Eliminar " + res[8]);
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
            TeacherService.deleteMultimedia(challenge.id, challenge.ruta)
                .then(response => {

                })
                .catch(error => {
                    console.log(error.message);
                });
        }
    }


    onDeleteMultimedia(indexItem) {
        this.setState(() =>
            ({ imgNamesCollection: this.state.imgNamesCollection.filter((todo, index) => index !== indexItem) }));
    }

    onFileChange(e) {
        this.setState({ imgCollection: e.target.files });

        // let newFiles = this.state.imgNamesCollection;
        // Array.from(e.target.files).forEach((file) => { newFiles.push(file) });
        // this.setState({ imgNamesCollection: [...newFiles] });
    }

    //Obtiene el nombre del desafio/escrito
    showTitle = (challenge) => {
        var str = challenge.ruta;
        var res = str.split("/");
        return res[8];
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

        const { editorState } = this.state;
        const { formErrors } = this.state;
        const { data } = this.state;
        return (
            <div className="container">
                <label className='form-label'>Modificar datos</label>
                <Card className="card-edit">
                    <Card.Body>
                        <div className="row-edit">
                            <div className="form-inputs">
                                <label className='form-label'>Título </label>
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
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="border-edit"
                                    toolbarClassName="rdw-emoji-wrapper"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onContentStateChange={this.onContentStateChange}
                                    onChange={this.editorChange}
                                />
                            </div>
                        </div>
                        <div className="row-edit">
                            <div className="form-select">
                                <label className='form-label'>Categoría</label>
                                <select value={this.state.form.category} onChange={this.handleSelectionCategory}>
                                    {this.state.categories.map(elemento => (
                                        <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="form-select">
                                <label className='form-label'>Tipo de desafio</label>
                                <select value={this.state.form.type} onChange={this.handleSelectionChange}>
                                    {/* <option value="" selected disabled hidden>Choose here</option> */}
                                    {/* <option value = {this.state.form.type} selected>{this.state.form.type} </option> */}
                                    <option value="1">Individual</option>
                                    <option value="2">Colaborativo</option>
                                </select>
                            </div>

                            <div className="form-select">
                                <label className='form-label'> Tipo de Calificación </label>
                                <select value={this.state.form.qualification} onChange={this.qualificationSelection} >
                                    <option value="1"> Numerica</option>
                                    <option value="2"> Conceptual</option>
                                </select>
                            </div>
                        </div>
                        <div className="row-edit">
                            <div className="form-select">
                                <label className='form-label'> Fecha y Hora </label>
                                <Dates handleDateChange={this.handleDateChange} param={this.state.form.date} />
                            </div>
                        </div>
                        <div className="row-edit">
                            <label className='form-label'> Ficheros Multimedia: </label>
                            <table>
                                <tbody>


                                    <div style={{ width: "500px", height: "250px", overflow: "scroll", behavior: "smooth" }}>
                                        {data.map((challenge) => (
                                            <tr key={challenge.id}>
                                                <td> {this.showTitle(challenge)} </td>
                                                {/* <td>< a href={challenge.ruta}> Ver </a></td> */}
                                                <td><Button onClick={() => window.open(challenge.ruta)}>Ver</Button></td>

                                                <td>
                                                    < button onClick={() => this.deleteFile(challenge)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </div>
                                </tbody>
                            </table>
                        </div>

                        {/* <div className="row-edit">
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
                                                    <IconButton
                                                        className="form-select"
                                                        aria-label="delete"
                                                        onClick={() => this.onDeleteMultimedia(index)}>
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
                            <Button onClick={() => this.onModal(true)}>Guardar</Button>
                        </div>
                        <div className="form-select">
                            <Button onClick={() => this.changeView()}>Cancelar</Button>
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
                                ¿Desea guardar los cambios?
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => this.sendChallenge()}>Aceptar</Button>
                                <Button onClick={() => this.onModal(false)}>Cancelar</Button>
                            </Modal.Footer>
                        </Modal>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default EditChallenge;