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
        }

    }

    cambiaVentana = (opcion) =>{
        this.setState({ventana : opcion});
    }

    /*Dibuja la pagina  */
    render() {
        
       let idStudent = this.props.match.params.idStudent;

        return (
           <div className="container-box"> 
                <Tabs>
                    <TabList>
                        <Tab>DATOS</Tab>
                        <Tab>DESAFIOS</Tab>
                    </TabList>
                    <TabPanel>
                        <Datos key={idStudent} idStudent={idStudent}/>
                    </TabPanel>
                    <TabPanel>
                        <Escritos key={idStudent} idStudent={idStudent}/>
                    </TabPanel>
                </Tabs>
           </div>
        );


    }


}

export default Profile;