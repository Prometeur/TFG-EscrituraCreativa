<<<<<<< HEAD
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
=======
/*
 *  Name_file :CreateChallenge.js
 *  Description: Pagina del Desafio, contiene la vista del desafio del profesor
 */
import React, { Component } from 'react';
/*Importacion del css*/
import '../../../styles/Challenge.css';

>>>>>>> luis
/*Importaciones del Video*/
import ReactPlayer from "react-player";

/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
<<<<<<< HEAD
import Dates from '../../dates/Dates.js';

=======

/**Importacion del calendario */
import Dates from '../../dates/dates.js';

/**Datos de Sesion del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/**Servicios del profesor */
import TeacherService from '../../../services/teacher/teacherService';
>>>>>>> luis

class CreateChallenge extends Component {

    constructor(props) {
        super(props);
<<<<<<< HEAD
       
        this.state = {

            editorState: EditorState.createEmpty(),
            data: [],
            categories: [],
            stateModal:false,
=======
        const dataUser = AuthUser.getCurrentUser();
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            imgCollection: '',
            editorState: EditorState.createEmpty(),
            data: [],
            categories: [],
>>>>>>> luis

            formErrors: {
                title: '',
                description: '',
                file: '',
                date: '',
                category: '',
                type: '',
            },

            form: {
<<<<<<< HEAD
                title: '',
                descripcion: '',
                file: '',
                reader: '',//valor o flujo de caracteres del fichero
                date: new Date(),
                // //date: '',
                type: '1',
                category: '',
=======
                idTeacher: dataUser.id,
                idGroup: this.props.match.params.idGroup,
                title: '',
                description: '',
                file: '',
                path: '', //ruta del fichero
                reader: '', //valor o flujo de caracteres del fichero
                type: '1', //individual o colaborativo
                qualification: '1',
                category: '',
                date: new Date(), //fecha
>>>>>>> luis
            }
        };
    }

<<<<<<< HEAD
    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
    si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
      
       TeacherService.getCategories().then(response => {
=======
    componentDidMount() {
        /*Obtiene todas las categorias de los desafios */
        TeacherService.getCategories().then(response => {
>>>>>>> luis
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
<<<<<<< HEAD
        console.log(this.state.form);//visualizar consola navegador lo que escribimos en el input
=======
        console.log(this.state.form); //visualizar consola navegador lo que escribimos en el input
>>>>>>> luis
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
<<<<<<< HEAD
            formErrors, form: {
=======
            formErrors,
            form: {
>>>>>>> luis
                ...this.state.form,
                [name]: value
            }
        }, () => console.log(this.state));
    }

<<<<<<< HEAD

=======
>>>>>>> luis
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    changeView = () => {
        //debugger;
<<<<<<< HEAD
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
=======
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
>>>>>>> luis
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

<<<<<<< HEAD

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


=======
    // //Previsualización del fichero
    // onFileChange = (e) => {
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
    //             //dir->idteacher/tipo/
    //             const dir = this.state.form.idTeacher + "/" + res[0] + "/";

    //             this.setState({
    //                 form: {
    //                     ...this.state.form,
    //                     file: file
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

    //Envio del desafio al server
    sendChallenge = () => {
        TeacherService.createChallenge(this.state.form.idGroup, this.state.form.title, this.state.form.description, this.state.form.type, this.state.form.category, this.state.form.qualification, this.state.form.date)
            .then(response => {
                const idChallenge = response.data;
                if (this.state.imgCollection.length > 0) {
                    TeacherService.sendMultimedia(this.state.imgCollection, this.state.form.idTeacher, idChallenge)
                        .then(response => {
                            window.location.href = '/teacher/groups';

                        })
                        .catch(error => {
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

    };

>>>>>>> luis
    /*Dibuja la pagina */
    render() {
        let media = "";
        if (this.state.form.file.type !== undefined) {
            if (this.state.form.file.type.includes("image"))
<<<<<<< HEAD
             
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
=======
                media = < img className="image" src={this.state.form.reader} alt="" />;
            else
                media = < ReactPlayer className="video" url={this.state.form.reader} controls={true} />;
        } else {
            media = < img className="image" src="http://localhost:3001/images/drop-files.jpg" alt="" />;
        }
        const { editorState } = this.state;
        const { formErrors } = this.state;
        //console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        return (
            <>
                <div className="challenge-container" >
                    <div className='challenge-content' >
                        <div className='challenge-card' >
                            < div class="challenge-inputs" >
                                <h2 > Crea tu propio desafio completando la información de abajo </h2>
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Escribe un Titulo </label>
                                <input
                                    className={formErrors.title.length > 0 ? "error" : "form-input"}
                                    type="text"
                                    name="title"
                                    placeholder="escribe el título"
                                    // onChange={this.handleChange}
                                    onChange={this.handleErrors}
                                />
                                {formErrors.title.length > 0 && (<span className="errorMessage" > { formErrors.title} </span>)}
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Escribe una Descripción </label>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    // onChange={this.handleEditorChange}
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
                            < div class="challenge-inputs" >
                                <label className='form-label' > Puedes agregar un fichero multimedia si lo deseas(imagen, video o audio): </label>
                                <div className="form-media" >
                                    {/* {media}  */}
                                    { /* <input type="file" id="file" name="imagen" onChange={this.onFileChange}/> */}
                                    <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                                </div>
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Selecciona la categoría del desafio </label>
                                <select onChange={this.handleSelectionCategory} >
                                    <option value="" selected disabled hidden > Choose here </option>
                                    {this.state.categories.map(elemento => (
                                        <option key={elemento.id} value={elemento.id} > { elemento.nombre} </option>
                                    ))}
                                </select>
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Tipo de Calificación </label>
                                <select onChange={this.qualificationSelection} >
                                    <option value="" selected disabled hidden > Choose here </option>
                                    <option value="1" > Numerica </option>
                                    <option value="2" > Conceptual </option>
                                </select>
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Selecciona si el desafio es individual o en equipo </label>
                                <select onChange={this.handleSelectionChange} >
                                    <option value="" selected disabled hidden > Choose here </option>
                                    <option value="1" > Individual </option>
                                    <option value="2" > Equipo </option>
                                </select>
                            </div>
                            <div class="challenge-inputs" >
                                <label className='form-label' > Selecciona la duración del desafio </label>
                                <Dates handleDateChange={this.handleDateChange} param={this.state.form.date} />
                            </div>
                        </div>
                        <div className="form-btn" >
                            <button className="form-btn-send" onClick={() => this.sendChallenge()} > Enviar </button>
                            <button className="form-btn-cancel" onClick={() => this.changeView()} > Cancelar </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default CreateChallenge;
>>>>>>> luis
