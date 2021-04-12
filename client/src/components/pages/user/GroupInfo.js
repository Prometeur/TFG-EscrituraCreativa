/*
*  Name_file :GroupInfo.js
*  Description: Contiene los datos de un grupo segun un ID dado.
*    
*/
import React, { Component } from 'react';
import { Link} from "react-router-dom";
import authHeader from '../../../services/authenticity/auth-header.js';
import AuthUser from '../../../services/authenticity/auth-service.js';
import TeacherService from '../../../services/teacher/teacherService.js';
import AdminService from '../../../services/admin/adminService.js';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


class GroupInfo extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            
            data: [],
            currentUserId: '',
            currentUserRole: '',
            teacher: [],
            newName:""
    
        };
    }

    /*Se hacen peticiones al servidor para que me devuelva los datos del estudiante*/
    peticionGet() {
        AdminService.getGroupData(this.props.idGroup).then(response => {
                this.setState({data:response});
                this.peticionGetTeacher();
                this.props.handler();
                
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para que me devuelva lso datos del prodesor del grupo*/
    peticionGetTeacher = () => {
        AdminService.getProfile(this.state.data.idprofesor ).then(response => {
            this.setState({ teacher: response });
        }).catch(error => {
            console.log(error.message);
        })
    }

    componentDidMount() {
        const dataUser = AuthUser.getCurrentUser();
        this.setState({
            currentUserId: dataUser.id
        });
        this.setState({
            currentUserRole: dataUser.rol
        });
        this.peticionGet();
    }

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChangeRename = async e => {
        await this.setState({
                [e.target.name]: e.target.value
        });
    }

    /*Se hacen peticiones al servidor renombrar grupo*/
    rename = () => {
        AdminService.renameGroup(this.state.data.id, this.state.newName ).then(response => {
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para desactivar al grupo*/
    deactivateGroup = () => {
        AdminService.deactivateGroup(this.state.data.id ).then(response => {
            window.location.href = '/homeadmin';
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Dibuja la pagina  */
    render() {

        let campoCambiarNombre = <div>
                                    <label>Cambiar nombre: </label>
                                    <br />
                                    <input type="text" name="newName" onChange={this.handleChangeRename} />
                                    <br />
                                </div>;
        
        let botonCambiarNombre =  <div><button text='Cambiar' onClick={() => this.rename()}>Cambiar</button></div>;

        if(this.state.newName === "")
        {
            botonCambiarNombre= <div><button disabled text='Cambiar' onClick={() => this.rename()}>Cambiar</button></div>;
        }
        let botonDesactivar =  <div><button text='Desactivar grupo' onClick={() => this.deactivateGroup()}>Desactivar grupo</button></div>;

        let fotoSource = "";
        let imagenProfe = <div></div>
        let textoProfe = <div></div>

        if(this.state.teacher != undefined)
        {
            textoProfe =
            <div>
                <h4>{this.state.teacher.nombre} {this.state.teacher.apellidos}</h4>
                <Link key={this.state.teacher.id} to={`/admin/users/viewProfile/${this.state.teacher.id}`}><button text='Ver Perfil'> Ver perfil </button></Link>
            </div>;
            if(this.state.currentUserRole === "T"){
                textoProfe =
                            <div>
                                <h4>{this.state.teacher.nombre} {this.state.teacher.apellidos}</h4>
                            </div>;
            }
            if(this.state.teacher.foto != undefined)
            {
                fotoSource = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, this.state.teacher.foto.data));
                imagenProfe = <img src={fotoSource} alt="" style={{width: '100px'}}></img>
            }
        }

        if(this.state.currentUserRole != "A")
        {
            campoCambiarNombre = <div></div>;
            botonCambiarNombre = <div></div>;
            botonDesactivar = <div></div>;
        }
        if(this.state.currentUserRole === "T" && this.state.currentUserId === this.state.data.idprofesor)
        {
            campoCambiarNombre = <div>
                                    <label>Cambiar nombre: </label>
                                    <br />
                                    <input type="text" name="newName" onChange={this.handleChangeRename} />
                                    <br />
                                </div>;
        
            botonCambiarNombre =  <div><button text='Cambiar' onClick={() => this.rename()}>Cambiar</button></div>;
        }


     
        return (

            <div className="container">
                <Card className="card-edit">
                    <Card.Body>
            <div>
                <h3>{this.state.data.nombre}</h3>
                <div>
                    
                        {campoCambiarNombre}
                        {botonCambiarNombre}
                        {botonDesactivar}

                </div>
                <div>
                    <Card className="card-edit">
                        <Card.Body>
                        <h3>Este grupo pertenece a:</h3>
                        {imagenProfe}

                        {textoProfe}
                        </Card.Body>
                    </Card>
                </div>

            </div>

            </Card.Body>
            </Card>
            </div>
        );

    }


}

export default GroupInfo;