/*
*  Name_file :ProfileInfo.js
*  Description: Contiene los datos de un usuario segun un ID dado. Es un componente de Porfile.
*    
*/
import React, { Component } from 'react';
import TeacherService from '../../../services/teacher/teacherService.js';


class ProfileInfo extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            
            data: [],
            teacherGroupData: [],
            studentGroupData: [],
            finalGroupData:[],
            finalGroupKickData:[],
            groupSelect: "-1",
            groupKickSelect: "-1"
    
        };
    }


    /*Se hacen peticiones al servidor para que me devuelva los datos del estudiante*/
    peticionGet() {
       
        TeacherService.getProfile(this.props.idStudent).then(response => {
              this.setState({data:response});
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para que me devuelva todos los grupos del profesor*/
    peticionGetGruposTeacher() {
      
        TeacherService.allGroups().then(response => {
            this.setState({ teacherGroupData: response.data });
            this.peticionGetGruposStudent();
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Se hacen peticiones al servidor para que me devuelva todos los grupos del profesor*/
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

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
   componentDidMount() {
     this.peticionGet();
   }

    //Acepta al estudiante como usuario de la aplicación.
    acceptApplicant(idApplicant) {
        
        TeacherService.acceptApplicantStudent(idApplicant)
        .then(response=>{
             this.setState({ data: response});
        }).catch(error => {
            console.log(error.message);
        })
     }

     /*Se hacen peticiones al servidor para invitar al estudiante al grupo*/
     inviteToGroup = (idGroup) => {
        TeacherService.inviteToGroup(idGroup,this.props.idStudent).then(response =>{
            console.log(response);
        }).catch(error => {
            
              console.log(error.message);
        })
     }

    /*Se hacen peticiones al servidor para expulsar al estudiante del grupo*/
    kickFromGroup = (idGroup) => {
         
        TeacherService.kickFromGroup(idGroup,this.props.match.params.idStudent)
        .then(response => {
            window.location.href = "http://localhost:3000/Profile";
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
        }

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
        }


        return (
            <>
                <h1>Perfil:</h1>
            
                <div>
                
                    {cartel}
                

                    {contenido}


                    {invitaGrupo}
                    {botonInvitaGrupo}

                    {echaGrupo}
                    {botonEchaGrupo}

                </div>
            </>
        );
    }


}

export default ProfileInfo;