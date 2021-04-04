/*
*  Name_file :Profile.js
*  Description: Contiene los datos de un usuario segun un ID dado.
*    
*/
import React, { Component } from 'react';
import TeacherService from '../../../services/teacher/teacherService.js';
import Datos from "./ProfileInfo";
import Escritos from "./ProfileScripts";
import '../../../styles/styleGeneral.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class Profile extends Component {
t
    constructor(props){
        super(props);

        this.state = {
            ventana: 1,
            data: [],
        }
        this.handler = this.handler.bind(this)
    }

    //Permite refrescar la página desde abajo
    handler() {
       this.peticionGet();
      }

    cambiaVentana = (opcion) =>{
        this.setState({ventana : opcion});
    }

    /*Se hacen peticiones al servidor para que me devuelva los datos del estudiante*/
    peticionGet() {
       
        TeacherService.getProfile(this.props.match.params.idStudent).then(response => {
              this.setState({data:response});
              console.log(this.state.data);
        }).catch(error => {
            console.log(error.message);
        })
    }

    componentDidMount() {
         this.peticionGet();
       }

    /*Dibuja la pagina  */
    render() {
        
       let idStudent = this.props.match.params.idStudent;

       let tabs =   <TabList>
                        <Tab>DATOS</Tab>
                        <Tab>ESCRITOS</Tab>
                    </TabList>;
        if(this.state.data.rol == "T"){
            tabs =   <TabList>
                        <Tab>DATOS</Tab>
                        <Tab>GRUPOS</Tab>
                    </TabList>;
        }
        if(this.state.data.rol == "A"){
            tabs =   <TabList>
                        <Tab>DATOS</Tab>
                    </TabList>;
        }
        if(this.state.data.activo === 0){
            tabs =   <TabList>
                        <Tab>DATOS</Tab>
                    </TabList>;
        }
        let secondTab = <Escritos key={idStudent} idStudent={idStudent}/>;

        if(this.state.data.rol == "T"){ //COMPLETAR LUEGO CON LA VISTA DE GRUPOS 
            secondTab = <Escritos key={idStudent} idStudent={idStudent}/> ;
        }

        return (
           <div className="container-box"> 
                <Tabs>
                    {tabs}
                    <TabPanel>
                        <Datos key={idStudent} idStudent={idStudent} handler ={this.handler}/>
                    </TabPanel>
                    <TabPanel>
                        {secondTab}
                    </TabPanel>
                </Tabs>
           </div>
        );


    }


}

export default Profile;