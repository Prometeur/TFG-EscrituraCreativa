/*
*  Name_file :GroupAInfo.js
*  Description: Contiene los datos de un grupo según un ID dado.
*    
*/
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

class GroupAInfo extends Component {

    state = {
        data:[],
        teacher: [],
        newName:""

    }

    /*Se hacen peticiones al servidor para que me devuelva todos los grupos del profesor*/
    peticionGet = () => {
        axios.get("http://localhost:3001/admin/getGroupData", { params: { idGroup: cookies.get('groupSelect') } }).then(response => {
            this.setState({ data: response.data });
            this.peticionGetTeacher();
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para que me devuelva lso datos del prodesor del grupo*/
    peticionGetTeacher = () => {
        axios.get("http://localhost:3001/admin/getProfile", { params: { idUser: cookies.get('idRequestedUser') } }).then(response => {
            this.setState({ teacher: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
    si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        this.peticionGet();
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
    }

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChangeRename = async e => {
        await this.setState({
                [e.target.name]: e.target.value
        });
    }

    changeViewUserProfile = (idUser) => 
    {
        cookies.set('idRequestedUser', idUser, { path: "/", sameSite: 'lax' });
        window.location.href = './ProfileA';
    }

    /*Se hacen peticiones al servidor para invitar al estudiante al grupo*/
    rename = () => {
        axios.post("http://localhost:3001/admin/renameGroup", { id: this.state.data.id, name: this.state.newName  }).then(response => {
            window.location.href = "http://localhost:3000/GroupA";
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para invitar al estudiante al grupo*/
    deactivateGroup = () => {
        axios.post("http://localhost:3001/admin/deactivateGroup", { id: this.state.data.id }).then(response => {
            this.changeViewUserProfile(this.state.teacher.id);
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Dibuja la pagina  */
    render() {
        
        let botonCambiarNombre =  <div><button text='Cambiar' onClick={() => this.rename()}>Cambiar</button></div>;

        if(this.state.newName === "")
        {
            botonCambiarNombre= <div><button disabled text='Cambiar' onClick={() => this.rename()}>Cambiar</button></div>;
        }
        let botonDesactivar =  <div><button text='Desactivar grupo' onClick={() => this.deactivateGroup()}>Desactivar grupo</button></div>;
     
        return (
            <div>
                <div>
                    
                        <label>Cambiar nombre: </label>
                        <br />
                        <input type="text" name="newName" onChange={this.handleChangeRename} />
                        <br />
                        {botonCambiarNombre}
                        {botonDesactivar}

                </div>
                <div>
                    <h3>Este grupo pertenece a:</h3>
                    <h4>{this.state.teacher.nombre} {this.state.teacher.apellidos}</h4>
                    <td><button text='Ver Perfil' onClick={() => this.changeViewUserProfile(this.state.teacher.id)}>Ver perfil</button></td>
                </div>

            </div>
        );

    }





}

export default GroupAInfo;