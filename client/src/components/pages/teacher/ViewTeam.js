/*
*  Name_file :ViewTeam.js
*  Description: Contiene los datos de un equipo segun un ID dado.
*    
*/
import React, { Component } from 'react';
import TeacherService from '../../../services/teacher/teacherService.js';
import Datos from "./ViewTeamInfo";
import Escritos from "./ViewTeamScripts";
import '../../../styles/styleGeneral.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class ViewTeam extends Component {
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
       
        TeacherService.getTeam(this.props.match.params.idTeam).then(response => {
              this.setState({data:response});
        }).catch(error => {
            console.log(error.message);
        })
    }

    componentDidMount() {
         this.peticionGet();
       }

    /*Dibuja la pagina  */
    render() {
        
       let idTeam = this.props.match.params.idTeam;

       let tabs =   <TabList>
                        <Tab>DATOS</Tab>
                        <Tab>ESCRITOS</Tab>
                    </TabList>;
        
        let secondTab = <Escritos key={idTeam} idTeam={idTeam}/>;

        return (
           <div className="container-box"> 
                <Tabs>
                    {tabs}
                    <TabPanel>
                        <Datos key={idTeam} idTeam={idTeam} handler ={this.handler}/>
                    </TabPanel>
                    <TabPanel>
                        {secondTab}
                    </TabPanel>
                </Tabs>
           </div>
        );


    }


}

export default ViewTeam;