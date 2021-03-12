/*
*  Name_file :ProfileInfo.js
*  Description: Contiene los datos de un usuario segun un ID dado. Es un componente de Porfile.
*    
*/
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

//const baseUrl = "http://localhost:3001/teacher/getGroups";
const baseUrl = "http://localhost:3001/user/getProfile";

const cookies = new Cookies();


class ProfileAInfo extends Component {

    state = {
        data: [],
        allGroupData: [],
        studentGroupData: [],
        finalGroupData:[],
        finalGroupKickData:[],
        groupSelect: "-1",
        groupKickSelect: "-1"

    }

    /*Se hacen peticiones al servidor para que me devuelva los datos del estudiante*/
    peticionGet = () => {
        axios.get(baseUrl, { params: { idUser: cookies.get('idRequestedUser') } }).then(response => {
            this.setState({ data: response.data });
            if(this.state.data.rol =="S")
            {
                this.peticionGetAllGrupos();
            }
            
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para que me devuelva todos los grupos*/
    peticionGetAllGrupos = () => {
        axios.get("http://localhost:3001/admin/getAllGroups").then(response => {
            this.setState({ allGroupData: response.data });
            this.peticionGetGruposStudent();
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para que me devuelva todos los grupos del alumno*/
    peticionGetGruposStudent = () => {
        axios.get("http://localhost:3001/user/getStudentGroups", { params: { idEstudiante: this.state.data.id } }).then(response => {
            this.setState({ studentGroupData: response.data });
            this.filterGroupData();
        }).catch(error => {
            console.log(error.message);
        })
    }

    //Filtra los grupos para eliminar los mismos que ya tiene el estudiante
    filterGroupData = () =>{
        let finalGroups = [];

        for(let i = 0; i < this.state.allGroupData.length; i++){
            let unico = true;
            for(let j = 0; j < this.state.studentGroupData.length; j++){
                if(this.state.allGroupData[i].id == this.state.studentGroupData[j].id){
                    unico = false;
                }
            }
            if(unico){
                finalGroups.push(this.state.allGroupData[i]);
            }
        }
        this.setState({finalGroupData: finalGroups})
        this.filterGroupKickData();
    }

    //Filtra los grupos para dejar sólo los mismos que ya tiene el estudiante
    filterGroupKickData = () =>{
        let finalGroups = [];

        for(let i = 0; i < this.state.allGroupData.length; i++){
            let unico = true;
            for(let j = 0; j < this.state.studentGroupData.length; j++){
                if(this.state.allGroupData[i].id == this.state.studentGroupData[j].id){
                    unico = false;
                }
            }
            if(unico === false){
                finalGroups.push(this.state.allGroupData[i]);
            }
        }
        this.setState({finalGroupKickData: finalGroups})
    }

    /*Detecta un cambio en el valor del grupo a escoger */
    handleChangeGroupSelect = async e => {
        await this.setState({
                [e.target.name]: e.target.value
        });
    }

    /*Detecta un cambio en el valor del grupo a escoger */
    handleChangeGroupKickSelect = async e => {
        await this.setState({
                [e.target.name]: e.target.value
        });
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
        window.location.href = './';
    }

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
   componentDidMount() {
    this.peticionGet();
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
    }

    //Acepta al estudiante como usuario de la aplicación.
    acceptApplicant = (idApplicant) => 
     {
         //window.location.href = './acceptApplicant/'+ idApplicant;
         let targetUrl = "http://localhost:3001/User/" + 'acceptApplicant';
         let newUrl = "http://localhost:3000/ProfileA"
         axios.get(targetUrl, { params: { idUser: idApplicant } }).then(response => {
            this.setState({ data: response.data });
            window.location.href = newUrl;
        }).catch(error => {
            console.log(error.message);
        })
        
     }

     /*Se hacen peticiones al servidor para invitar al estudiante al grupo*/
     inviteToGroup = (id) => {
        axios.post("http://localhost:3001/admin/inviteStudentToGroup", { grupo: id, idEstudiante: this.state.data.id  }).then(response => {
            window.location.href = "http://localhost:3000/ProfileA";
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para expulsar al estudiante del grupo*/
    kickFromGroup = (id) => {
        axios.post("http://localhost:3001/admin/kickStudentFromGroup", { grupo: id, idEstudiante: this.state.data.id  }).then(response => {
            window.location.href = "http://localhost:3000/ProfileA";
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para desactivar al usuario*/
    deactivateUser = () => {
        axios.post("http://localhost:3001/admin/deactivateUser/", { idUser: this.state.data.id  }).then(response => {
            window.location.href = "http://localhost:3000/ProfileA";
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para eliminar al usuario*/
    deleteUser = () => {
        axios.post("http://localhost:3001/admin/deleteUser/", { idUser: this.state.data.id  }).then(response => {
            window.location.href = "http://localhost:3000/homeAdmin";
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Dibuja la pagina  */
    render() {
        let cartel =<div> </div>;

        let rol = "estudiante";
        if(this.state.data.rol == "T")
        {
            rol = "profesor";
        }
        if(this.state.data.rol == "A")
        {
            rol = "administrador";
        }

        let contenido = <div>
                        <h3>ID: {this.state.data.id}</h3>
                        <h3>Nombre: {this.state.data.nombre}</h3>
                        <h3>Apellidos: {this.state.data.apellidos}</h3>
                        <h3>Correo: {this.state.data.correo}</h3>
                        <h3>Rol: {rol}</h3>
                    </div>;

        

        let invitaGrupo = 
        <div>
            <label for="groupSelect">Invitar a un grupo:</label>
            <select name="groupSelect" id="groupSelect" onChange={this.handleChangeGroupSelect}>
                <option value= "-1" >Elija un grupo</option>
                {this.state.finalGroupData.map(group => {
                    return (
                            <option value={group.id}>{group.nombre}</option>
                    )
                })}
            </select> 
        </div>;
        let botonInvitaGrupo =  <div><button text='Invitar a grupo' onClick={() => this.inviteToGroup(this.state.groupSelect)}>Invitar a grupo</button></div>;

        if(this.state.groupSelect === "-1")
        {
            botonInvitaGrupo= <div><button disabled text='Invitar a grupo' onClick={() => this.inviteToGroup(this.state.groupSelect)}>Invitar a grupo</button></div>;
        }

        let echaGrupo = 
        <div>
            <label for="groupKickSelect">Expulsar de un grupo:</label>
            <select name="groupKickSelect" id="groupKickSelect" onChange={this.handleChangeGroupKickSelect}>
                <option value= "-1" >Elija un grupo</option>
                {this.state.finalGroupKickData.map(group => {
                    return (
                            <option value={group.id}>{group.nombre}</option>
                    )
                })}
            </select> 
        </div>;
        let botonEchaGrupo =  <div><button text='Expulsar del grupo' onClick={() => this.kickFromGroup(this.state.groupKickSelect)}>Expulsar del grupo</button></div>;

        if(this.state.groupKickSelect === "-1")
        {
            botonEchaGrupo= <div><button disabled text='Expulsar del grupo' onClick={() => this.kickFromGroup(this.state.groupKickSelect)}>Expulsar del grupo</button></div>;
        }

        

        let botonDesactivar = <div><button text='Desactivar usuario' onClick={() => this.deactivateUser(this.state.groupKickSelect)}>Desactivar usuario</button></div>;
        let botonEliminar = <div><button text='Eliminar usuario' onClick={() => 
            {if(window.confirm('El usuario '+ this.state.data.nombre + ' '+ this.state.data.apellidos +' y todos sus grupos, escritos, equipos y desafíos se eliminarán de forma permanente de la base de datos. ESTA ACCIÓN ES IRREVERSIBLE. ¿Eliminar usuario?'))
            {this.deleteUser(this.state.groupKickSelect)};}}>Eliminar usuario</button></div>;

            if(this.state.data.activo === 0)
            {
                cartel = <nav>
                            <h2> Este {rol} aún no ha sido aceptado.</h2>
                        </nav>;
                contenido = <div>
                            <h3>ID: {this.state.data.id}</h3>
                            <h3>Nombre: {this.state.data.nombre}</h3>
                            <h3>Apellidos: {this.state.data.apellidos}</h3>
                            <h3>Correo: {this.state.data.correo}</h3>
                            <h3>Rol: {rol}</h3>
                            <div><button text='Aceptar solicitud' onClick={() => this.acceptApplicant(this.state.data.id)}>Aceptar solicitud</button></div>
                </div>;
    
                invitaGrupo = <nav></nav>;
                botonInvitaGrupo = <nav></nav>;
    
                echaGrupo = <nav></nav>;
                botonEchaGrupo = <nav></nav>;
                botonDesactivar = <nav></nav>;
            }


        if(this.state.data.rol == "A")
        {
            invitaGrupo = <nav></nav>;
            botonInvitaGrupo = <nav></nav>;

            echaGrupo = <nav></nav>;
            botonEchaGrupo = <nav></nav>;
            botonDesactivar = <nav></nav>;
            botonEliminar =<nav></nav>;
        }
        if(this.state.data.rol == "T")
        {
            invitaGrupo = <nav></nav>;
            botonInvitaGrupo = <nav></nav>;

            echaGrupo = <nav></nav>;
            botonEchaGrupo = <nav></nav>;
        }

        let fotoSource = "";
        let imagenUser = <div></div>

        if(this.state.data.foto != undefined)
        {
            fotoSource = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, this.state.data.foto.data));
            imagenUser = <img src={fotoSource} alt="" style={{width: '100px'}}  ></img>
        }

        


        return (
            <>
                <h1>Perfil:</h1>
                <nav>
                    <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                </nav>
                <div>
                
                    {cartel}

                    {imagenUser}

                    {contenido}


                    {invitaGrupo}
                    {botonInvitaGrupo}

                    {echaGrupo}
                    {botonEchaGrupo}

                    {botonDesactivar}
                    {botonEliminar}

                </div>
            </>
        );
    }


}

export default ProfileAInfo;