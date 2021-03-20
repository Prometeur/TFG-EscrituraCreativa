import React, { Component } from 'react';

import '../../../styles/Challenge.css';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';


import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

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
        this.onFileChange = this.onFileChange.bind(this);
        this.onDeleteMultimedia = this.onDeleteMultimedia.bind(this);

        this.state = {
            imgCollection: [],
            imgNamesCollection: [],
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
                path: '', //ruta del fichero
                reader: '', //valor o flujo de caracteres del fichero
                type: '1', //individual o colaborativo
                qualification: '1',
                category: '1',
                date: new Date(), //fecha
            }
        };
    }


    componentDidMount() {
        /*Obtiene todas las categorias de los desafios */
        TeacherService.getCategories().then(response => {
            debugger;
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
            formErrors,
            form: {
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
        window.location.href = "/teacher/group/";
    }

    onModal(modal) {
        this.setState({
            stateModal: modal
        });
    }

    handleDateChange = (date) => {
        this.setState({
            form: {
                ...this.state.form,
                date: date
            }
        });
    }

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


    onDeleteMultimedia(indexItem) {
        this.setState(() =>
            ({ imgNamesCollection: this.state.imgNamesCollection.filter((todo, index) => index !== indexItem) }));

    }

    onFileChange(e) {
        this.setState({ imgCollection: e.target.files });

        let newFiles = this.state.imgNamesCollection;
        Array.from(e.target.files).forEach((file) => { newFiles.push(file) });
        this.setState({ imgNamesCollection: [...newFiles] });
        console.log(this.state.imgNamesCollection);
    }

    //Envio del desafio al server
    sendChallenge = () => {
        TeacherService.createChallenge(this.state.form.idGroup, this.state.form.title, this.state.form.description,
            this.state.form.type, this.state.form.category, this.state.form.qualification, this.state.form.date)
            .then(response => {
                const idChallenge = response.data;
                if (this.state.imgCollection.length > 0) {
                    TeacherService.sendMultimedia(this.state.imgNamesCollection, this.state.form.idTeacher, idChallenge)
                        .then(response => {
                            window.location.href = '/teacher/groups';
                        })
                        .catch(error => {
                            console.log(error.message);
                        });
                }
                else {
                    window.location.href = '/student/groups';
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    /*Dibuja la pagina */
    render() {
        const { formErrors } = this.state;
        const { editorState } = this.state;
        return (
            <div className="container">
                <label className='form-label'>Crear desafio</label>
                <Card className="card-edit">
                    <Card.Body>
                        <div className="row-edit">
                            <div className="form-inputs">
                                <label className='form-label'>Titulo</label>
                                <input
                                    // className='form-input'
                                    className={formErrors.title.length > 0 ? "error" : "form-input"}
                                    type="text"
                                    name="title"
                                    placeholder="Escribe el título"
                                    // onChange={this.handleChange}
                                    onChange={this.handleErrors}
                                />
                                {formErrors.title.length > 0 && (
                                    <span className="errorMessage">{formErrors.title}</span>
                                )}
                            </div>
                        </div>
                        <div className="row-edit">
                            <div className="form-inputs">
                                <label className='form-label'>Descripción</label>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="border-edit"
                                    // wrapperClassName="wrapperClassName"
                                    // editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onChange={
                                        (event, editor) => {
                                            this.setState({
                                                form: {
                                                    ...this.state.form,
                                                    description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
                                                }
                                            });
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className="row-edit">
                            <div className="form-select">
                                <label className='form-label'>Categoría</label>
                                <select onChange={this.handleSelectionCategory} >
                                    <option value="" selected disabled hidden > Seleccionar</option>
                                    {this.state.categories.map(elemento => (
                                        <option key={elemento.id} value={elemento.id} > { elemento.nombre} </option>
                                    ))}
                                </select>
                            </div>
                            {/* <Form className="form-select">
                                <Form.Group as={Col}>
                                    <Form.Label>Tipo de desafío</Form.Label>
                                    <Col sm={1}>
                                        <Form.Check
                                            type="radio"
                                            label="Individual"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios1"
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Colaborativo"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios2"
                                        />
                                    </Col>
                                </Form.Group>
                            </Form> */}
                             <div class="form-select" >
                                <label className='form-label' > Tipo de Desafío </label>
                                <select onChange={this.handleSelectionChange} >
                                    <option value="" selected disabled hidden > Seleccionar </option>
                                    <option value="1" > Individual </option>
                                    <option value="2" > Colaborativo </option>
                                </select>
                            </div>

                            <div className="form-select">
                                <label className='form-label'> Tipo de Calificación </label>
                                <select onChange={this.qualificationSelection}>
                                    <option value="" selected disabled hidden>Seleccionar</option>
                                    <option value="1"> Numerica</option>
                                    <option value="2"> Conceptual</option>
                                </select>
                            </div>
                        </div>
                        <div className="row-edit">
                            <div className="form-select">
                                <label className='form-label'>Selecciona la fecha y hora final </label>
                                <Dates
                                    handleDateChange={this.handleDateChange}
                                    param={this.state.form.date}
                                />
                            </div>
                        </div>
                        <div className="row-edit">
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
                                                    <IconButton className="form-select" aria-label="delete" onClick={() => this.onDeleteMultimedia(index)}>
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
                        </div>
                        <div className="form-select">
                            <Button onClick={() => this.onModal(true)}>Enviar</Button>
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
                                    Aviso
                                    </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5>
                                    ¿ Esta seguro de enviar este desafio ?
                                    </h5>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => this.sendChallenge()}>Si</Button>
                                <Button onClick={() => this.onModal(false)}>No</Button>  
                            </Modal.Footer>
                        </Modal>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default CreateChallenge;