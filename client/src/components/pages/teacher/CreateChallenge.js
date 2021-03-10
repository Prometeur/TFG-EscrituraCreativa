import React, { Component } from 'react';
import TeacherService from '../../../services/teacher/teacherService';
import '../../../styles/Challenge.css';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button  from 'react-bootstrap/Button';
/*Importaciones del Video*/
import ReactPlayer from "react-player";

/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import Dates from '../../dates/Dates.js';


class CreateChallenge extends Component {

    constructor(props) {
        super(props);
       
        this.state = {

            editorState: EditorState.createEmpty(),
            data: [],
            categories: [],
            stateModal:false,

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

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
    si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
      
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
        window.location.href = "/teacher/group/";
    }

    onModal(modal) {
        this.setState({
            stateModal:modal
        });
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
        form.append("idGroup", this.props.match.id);
        form.append("title", this.state.form.title);
        form.append("description", this.state.form.descripcion);
        form.append("date", this.state.form.date);
        form.append("type", this.state.form.type);
        form.append("category", this.state.form.category);
        form.append("url", this.state.form.url);

        TeacherService.createChallenge(form);

        window.location.href = '/teacher';
    };


    /*Dibuja la pagina */
    render() {
        let media = "";
        if (this.state.form.file.type !== undefined) {
            if (this.state.form.file.type.includes("image"))
             
                media = <div className="image"><img src={this.state.form.reader} /></div>;
           
            else
              
                media = <ReactPlayer className="video" url={this.state.form.reader} controls={true} />;
        }
        else {
            media =  <div className="image"><p>Selecciona tu multimedia </p></div>;
        }

        const { editorState } = this.state;
        const { formErrors } = this.state;

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
                                <Form className="form-select">
                                     <Form.Group as={Col}>
                                        <Form.Label>Tipo de evalución</Form.Label>
                                        <Col sm={1}>
                                            <Form.Check
                                            type="radio"
                                            label="Individual"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios1"
                                            />
                                            <Form.Check
                                            type="radio"
                                            label="Equipo"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios2"
                                            />
                                        </Col>
                                     </Form.Group>
                                 </Form>
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
                                <div className="form-select">
                                    <Button  onClick={() => this.onModal(true)}>Guardar</Button>
                                </div>
                                <div className="form-select">
                                    <Button  onClick={() => this.changeView()}>Cancelar</Button>
                                </div>
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
                                       ¿ Esta seguro de salvar este desafio ?
                                    </h5>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={()=> this.onModal(false)}>No</Button>
                                    <Button onClick={() => this.sendChallenge()}>Si</Button>
                                </Modal.Footer>
                            </Modal>
                       </Card.Body>
                   </Card>
               </div>
        );
    }
}

export default  CreateChallenge;