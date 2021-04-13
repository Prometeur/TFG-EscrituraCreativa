/*
*  Name_file :EditChallenge.js
*  Description: Pagina de editar desafio
*/
import React, { Component } from 'react';

/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { stateFromHTML } from 'draft-js-import-html';// escribe el 'html' en el editor

/**Importacion del calendario */
import Dates from "../../dates/dates.js";

/**Datos de Sesion del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/**Servicios del profesor */
import TeacherService from '../../../services/teacher/teacherService';

/*Importaciones del css*/
import '../../../styles/Challenge.css';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import '../../../styles/Writing.css';
import Card from 'react-bootstrap/Card';

/*Componentes de estilo Bootstrap*/
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

class EditChallenge extends Component {

    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);

        this.state = {
            imgCollection: [],//array de ficheros multimedia
            editorState: EditorState.createEmpty(),
            contentState: null,
            dataMediaChallenge: [], //contiene todo el multimedia del desafio
            categories: [],//contiene todas las categorias
            challenge: '',//contiene el desafio
            modalDeleteFile: false,
            nameDeleteFileMedia: '',//nombre del fichero multimedia del escrito que desea ser borrado
            deleteFileMedia: '',//fichero multimedia del escrito que desea ser borrado
            formErrors: {
                title: '',
                description: '',
                date: '',
                idCategory: '',
                type: '',
            },
            form: {
                title: '',
                description: '',
                type: '',//tipo de desafio (invididual o colaborativo)
                typeQualification: '1',//tipo de calificacion numerica o conceptual
                idCategory: '',
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
            var contentState = stateFromHTML(response[0].descripcion);
            let editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState: editorState,
                challenge: response[0],
                form: {
                    ...this.state.form,
                    title: response[0].titulo,
                    description: response[0].descripcion,
                    type: response[0].colaborativo,
                    typeQualification: response[0].tipoCalificacion,
                    idCategory: response[0].idCategoria,
                    date: response[0].fechaFin
                }
            });
        }).catch(error => {
            console.log(error.message);
        })
        //Obtiene multimedia del desafio del profesor
        TeacherService.getMultimediaChallenge(this.props.match.params.idChallenge)
            .then(response => {
                this.setState({
                    dataMediaChallenge: response.data,
                });
            }).catch(error => {
                console.log(error.message);
            });
    }

    //Envio el desafio editado
    sendChallenge = () => {
        TeacherService.editChallenge(this.state.challenge.id, this.props.match.params.idGroup, this.state.form.title, this.state.form.description, this.state.form.type, this.state.form.idCategory, this.state.form.typeQualification, this.state.form.date)
            .then(response => {
                if (this.state.imgCollection.length > 0) {
                    TeacherService.sendMultimediaChallenge(this.state.imgCollection, AuthUser.getCurrentUser().id, this.props.match.params.idChallenge, this.state.form.type)
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

    //Elimina el fichero multimedia del desafio
    deleteFile = (mediaChallenge) => {
        this.closeModalDeleteFile();
        var contador = 0;
        var arreglo = this.state.dataMediaChallenge;
        arreglo.map((registro) => {
            if (mediaChallenge.id === registro.id) {
                arreglo.splice(contador, 1);
            }
            contador++;
        });
        this.setState({ dataMediaChallenge: arreglo });
        TeacherService.deleteMultimedia(mediaChallenge.id, mediaChallenge.ruta)
            .then(response => {

            })
            .catch(error => {
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

    /**modal guardar cambios */
    onModalSave(modal) {
        this.setState({
            stateModal: modal
        });
    }

    /**modal guardar cambios */
    onModalDeleteFile(modal) {
        this.setState({
            modalDeleteFile: modal
        });
    }

    //Cierra el modal de eliminar fichero
    closeModalDeleteFile = () => {
        this.setState({ modalDeleteFile: false });
    };

    //redireccion a una pagina
    changeView = () => {
        window.location.href = "/teacher";
    }

    qualificationSelection = event => {
        this.setState({
            form: {
                ...this.state.form,
                typeQualification: event.target.value
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
                idCategory: event.target.value
            }
        });
    };

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
    showTitle = (mediaChallenge) => {
        var str = mediaChallenge.ruta;
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

    //Muestra modal  para eliminar fichero multimedia
    askDeleteFile = (mediaChallenge) => {
        var str = mediaChallenge.ruta;
        var res = str.split("/");
        this.setState({
            nameDeleteFileMedia: res[8],
            deleteFileMedia: mediaChallenge,
            modalDeleteFile: true,
        });

    }

    /*Dibuja la pagina */
    render() {
        // const { editorState } = this.state;
        // const { formErrors } = this.state;
        const { editorState, formErrors, dataMediaChallenge } = this.state;
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

                            <label className='form-label'>Descripción</label>
                            <Editor
                                editorState={editorState}
                                // wrapperClassName="demo-wrapper"
                                // editorClassName="border-edit"
                                // toolbarClassName="rdw-emoji-wrapper"
                                wrapperClassName="wrapperClassName1"
                                editorClassName="editorClassName1"
                                toolbarClassName="toolbarClassName1"
                                onEditorStateChange={this.onEditorStateChange}
                                onContentStateChange={this.onContentStateChange}
                                onChange={this.editorChange}
                            />

                        </div>
                        <div className="row-edit">
                            <div className="form-select">
                                <label className='form-label'>Categoría</label>
                                <select value={this.state.form.idCategory} onChange={this.handleSelectionCategory}>
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
                                <select value={this.state.form.typeQualification} onChange={this.qualificationSelection} >
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
                                        {dataMediaChallenge.map((mediaChallenge) => (
                                            <tr key={mediaChallenge.id}>
                                                <td> {this.showTitle(mediaChallenge)} </td>
                                                {/* <td>< a href={challenge.ruta}> Ver </a></td> */}
                                                <td><Button onClick={() => window.open(mediaChallenge.ruta)}>Ver</Button></td>
                                                {/* <td>< button onClick={() => this.deleteFile(mediaChallenge)}>Eliminar</button></td> */}
                                                <td><Button onClick={() => this.askDeleteFile(mediaChallenge)}>Eliminar</Button></td>
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
                            <Button onClick={() => this.onModalSave(true)}>Guardar</Button>
                        </div>
                        <div className="form-select">
                            <Button onClick={() => this.changeView()}>Cancelar</Button>
                        </div>

                        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.stateModal} onHide={this.state.stateModal}>
                            <Modal.Header >
                                {/* <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title> */}
                            </Modal.Header>
                            <Modal.Body>
                                {/* <h4>Centered Modal</h4> */}
                                <p>¿Desea guardar los cambios?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => this.sendChallenge()}>Aceptar</Button>
                                <Button onClick={() => this.onModal(false)}>Cancelar</Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.modalDeleteFile} onHide={this.state.modalDeleteFile}>
                            <Modal.Header >
                                {/* <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title> */}
                            </Modal.Header>
                            <Modal.Body>
                                {/* <h4>Centered Modal</h4> */}
                                <p>¿Seguro que desea eliminar {this.state.nameDeleteFileMedia}?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => this.deleteFile(this.state.deleteFileMedia)}>Aceptar</Button>
                                <Button onClick={() => this.onModalDeleteFile(false)}>Cancelar</Button>
                            </Modal.Footer>
                        </Modal>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default EditChallenge;