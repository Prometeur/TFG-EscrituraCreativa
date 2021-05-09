/*
*  Name_file :ProfileInfo.js
*  Description: Contiene los datos de un usuario segun un ID dado.
*    
*/
import React, { Component } from 'react';
import authHeader from '../../../services/authenticity/auth-header.js';
import AuthUser from '../../../services/authenticity/auth-service.js';
import TeacherService from '../../../services/teacher/teacherService.js';
import AdminService from '../../../services/admin/adminService.js';


class ProfileInfo extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            
            data: [],
            teacherGroupData: [],
            studentGroupData: [],
            finalGroupData:[],
            finalGroupKickData:[],
            currentUserId: '',
            currentUserRole: '',
            groupSelect: "-1",
            groupKickSelect: "-1"
    
        };
    }


    /*Se hacen peticiones al servidor para que me devuelva los datos del estudiante*/
    peticionGet() {
        TeacherService.getProfile(this.props.idStudent).then(response => {
              this.setState({data:response});
              this.props.handler();
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para que me devuelva todos los grupos del profesor*/
    peticionGetGruposTeacher(id) {
      
        TeacherService.getGroups(id).then(response => {
            this.setState({ teacherGroupData: response });
            this.peticionGetGruposStudent();
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para que me devuelva todos los grupos (FUNCION ADMIN)*/
    peticionGetAllGroups() {
      
        AdminService.getAllGroups().then(response => {
            this.setState({ teacherGroupData: response });
            this.peticionGetGruposStudent();
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para que me devuelva todos los grupos del alumno*/
    peticionGetGruposStudent() {

        TeacherService.getGroupsStudent(this.props.idStudent).then(response =>{ 
            this.setState({ studentGroupData: response });
            this.filterGroupData();
        }).catch(error => {
            console.log(error.message);
        })

    }

    //Filtra los grupos para eliminar los mismos que ya tiene el estudiante
    filterGroupData = () =>{
        let finalGroups = [];

        for(let i = 0; i < this.state.teacherGroupData.length; i++){
            let unico = true;
            for(let j = 0; j < this.state.studentGroupData.length; j++){
                if(this.state.teacherGroupData[i].id == this.state.studentGroupData[j].id){
                    unico = false;
                }
            }
            if(unico){
                finalGroups.push(this.state.teacherGroupData[i]);
            }
        }
        this.setState({finalGroupData: finalGroups})
        this.filterGroupKickData();
    }

    //Filtra los grupos para dejar sólo los mismos que ya tiene el estudiante
    filterGroupKickData = () =>{
        let finalGroups = [];

        for(let i = 0; i < this.state.teacherGroupData.length; i++){
            let unico = true;
            for(let j = 0; j < this.state.studentGroupData.length; j++){
                if(this.state.teacherGroupData[i].id == this.state.studentGroupData[j].id){
                    unico = false;
                }
            }
            if(unico === false){
                finalGroups.push(this.state.teacherGroupData[i]);
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

    /*Detecta un cambio en el valor del grupo a escoger */
    handleChangeCurrentUserId = (dataUser)=> {
        this.setState({
            currentUserId: dataUser.id
        });
        this.handleChangeCurrentUserRole(dataUser);
    }

    /*Detecta un cambio en el valor del grupo a escoger */
    handleChangeCurrentUserRole = (dataUser)=> {
        this.setState({
            currentUserRole: dataUser.rol
        });

        this.peticionGet();
        if(dataUser.rol == "A"){//ADMIN
            this.peticionGetAllGroups();
        }
        else{//PROFESOR
            this.peticionGetGruposTeacher(dataUser.id);
        }
        
    }

    /*Cargo todos los datos que necesito nada más cargar la página, como los datos del usuario o los grupos.*/
   componentDidMount() {
    const dataUser = AuthUser.getCurrentUser();
    this.handleChangeCurrentUserId(dataUser);
     
   }

    //Acepta al estudiante como usuario de la aplicación.
    acceptApplicant(idApplicant) {
        
        TeacherService.acceptApplicantStudent(idApplicant)
        .then(response=>{
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
     }

     /*Se hacen peticiones al servidor para invitar al estudiante al grupo*/
     inviteToGroup = (idGroup) => {
        TeacherService.inviteToGroup(idGroup,this.props.idStudent).then(response =>{
            if(this.state.currentUserRole =="A")
            {
                this.peticionGetAllGroups();
            }
            else{
                this.peticionGetGruposTeacher(this.state.currentUserId);
            }
            this.setState({groupSelect: "-1"});
            this.peticionGet();
        }).catch(error => {
              console.log(error.message);
        })
     }

    /*Se hacen peticiones al servidor para expulsar al estudiante del grupo*/
    kickFromGroup = (idGroup) => {
         
        TeacherService.kickFromGroup(idGroup,this.props.idStudent).then(response => {
            if(this.state.currentUserRole =="A")
            {
                this.peticionGetAllGroups();
            }
            else{
                this.peticionGetGruposTeacher(this.state.currentUserId);
            }
            this.setState({groupKickSelect: "-1"});
            this.peticionGet();
        }).catch(error => {
             console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para desactivar al usuario*/
    deactivateUser = (id) => {
        AdminService.deactivateUser(id).then(response => {
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para eliminar al usuario*/
    deleteUser = (id) => {
        AdminService.deleteUser(id).then(response => {
            window.location.href = '/homeadmin';
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Dibuja la pagina  */
    render() {
        console.log(this.props.idStudent);
        let cartel =<div> </div>;
        let contenido = <div>
                        <h3>ID: {this.state.data.id}</h3>
                        <h3>Nombre: {this.state.data.nombre}</h3>
                        <h3>Apellidos: {this.state.data.apellidos}</h3>
                        <h3>Correo: {this.state.data.correo}</h3>
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

        if(this.state.groupSelect === "-1"){
            botonInvitaGrupo= <div><button disabled text='Invitar a grupo' onClick={() => this.inviteToGroup(this.state.groupSelect)}>Invitar a grupo</button></div>;
            invitaGrupo = 
            <div>
                <label for="groupSelect">Invitar a un grupo:</label>
                <select name="groupSelect" id="groupSelect" onChange={this.handleChangeGroupSelect}>
                    <option selected value= "-1" selected>Elija un grupo</option>
                    {this.state.finalGroupData.map(group => {
                        return (
                                <option value={group.id}>{group.nombre}</option>
                        )
                    })}
                </select> 
            </div>;
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

        if(this.state.groupKickSelect === "-1"){
            botonEchaGrupo= <div><button disabled text='Expulsar del grupo' onClick={() => this.kickFromGroup(this.state.groupKickSelect)}>Expulsar del grupo</button></div>;
            echaGrupo = 
                <div>
                    <label for="groupKickSelect">Expulsar de un grupo:</label>
                    <select name="groupKickSelect" id="groupKickSelect" onChange={this.handleChangeGroupKickSelect}>
                        <option selected value= "-1" >Elija un grupo</option>
                        {this.state.finalGroupKickData.map(group => {
                            return (
                                    <option value={group.id}>{group.nombre}</option>
                            )
                        })}
                    </select> 
                </div>;
        }

        let botonDesactivar = <div></div>;
        let botonEliminar = <div></div>;


            //      RESTRICCIONES POR USUARIO LOGUEADO

            if(this.state.currentUserRole == "A")
            {

                botonDesactivar = <div><button text='Desactivar usuario' onClick={() => this.deactivateUser(this.state.data.id)}>Desactivar usuario</button></div>;
                botonEliminar = <div><button text='Eliminar usuario' onClick={() => 
                {if(window.confirm('El usuario '+ this.state.data.nombre + ' '+ this.state.data.apellidos +' y todos sus grupos, escritos, equipos y desafíos se eliminarán de forma permanente de la base de datos. ESTA ACCIÓN ES IRREVERSIBLE. ¿Eliminar usuario?'))
                {this.deleteUser(this.state.data.id)};}}>Eliminar usuario</button></div>;

            }
            if(this.state.currentUserRole == "S")
            {
                invitaGrupo = <nav></nav>;
                botonInvitaGrupo = <nav></nav>;

                echaGrupo = <nav></nav>;
                botonEchaGrupo = <nav></nav>;
            }


            //      RESTRICCIONES POR EL USUARIO QUE VEO

        if(this.state.data.rol == "A")//SI EL USUARIO QUE VEO ES ADMIN NO LO PUEDO MODIFICAR
        {
            invitaGrupo = <nav></nav>;
            botonInvitaGrupo = <nav></nav>;

            echaGrupo = <nav></nav>;
            botonEchaGrupo = <nav></nav>;
            botonDesactivar = <nav></nav>;
            botonEliminar =<nav></nav>;
        }
        if(this.state.data.rol == "T")//SI EL USUARIO QUE VEO ES PROFESOR NO PUEDO MODIFICAR A QUE GRUPOS PERTENECE
        {
            invitaGrupo = <nav></nav>;
            botonInvitaGrupo = <nav></nav>;

            echaGrupo = <nav></nav>;
            botonEchaGrupo = <nav></nav>;
        }

        //      RESTRICCIONES PARA SOLICITANTES

        if(this.state.data.activo === 0)
        {
            cartel = <nav>
                        <h2> Este estudiante aún no ha sido aceptado por un profesor.</h2>
                    </nav>;
            contenido = <div>
                        <h3>ID: {this.state.data.id}</h3>
                        <h3>Nombre: {this.state.data.nombre}</h3>
                        <h3>Apellidos: {this.state.data.apellidos}</h3>
                        <h3>Correo: {this.state.data.correo}</h3>
                        <div><button text='Aceptar solicitud' onClick={() => this.acceptApplicant(this.state.data.id)}>Aceptar solicitud</button></div>
            </div>;

            invitaGrupo = <nav></nav>;
            botonInvitaGrupo = <nav></nav>;

            echaGrupo = <nav></nav>;
            botonEchaGrupo = <nav></nav>;

            botonDesactivar = <div></div>;
        }

        let fotoSource = "/chicaliteratura_sizebig.png";
        let imagenUser = <img src={fotoSource} alt="" style={{width: '100px'}}  ></img>

        if(this.state.data.foto != undefined)
        {
            if(this.state.data.foto.data.length != 0)
            {
            fotoSource = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, this.state.data.foto.data));
            imagenUser = <img src={fotoSource} alt="" style={{width: '100px'}}  ></img>
            }
        }



        return (
            <>
                <h1>Perfil:</h1>
            
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

export default ProfileInfo;