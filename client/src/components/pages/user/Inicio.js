import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AuthService from '../../../services/authenticity/auth-service.js';

/** Estilos CSS*/
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
/**Estilos importados*/
import Card from 'react-bootstrap/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Nav from 'react-bootstrap/Nav';

class Inicio extends Component {
          constructor(props){
            super(props);
            this.state = {
                currentUser: undefined,
                showStudent: false,
                showTeacher: false,
                showAdmin: false,
                url: ""
            };
        }
          
          
            componentDidMount() {
              //Take info about server
              const user = AuthService.getCurrentUser();
          
              if (user) {
                this.setState({
                  currentUser: user,
                  showStudent: user["rol"].includes("S"),
                  showTeacher: user["rol"].includes("T"),
                  showAdmin: user["rol"].includes("A"),
                });
              }
          
              if (this.state.showStudents) {
                this.setState({
                  url: '/student/groups'
                });
              }
              else if (this.state.showAdmin) {
                this.setState({
                  url: "/teacher/groups"
                });
              }
              else if (this.state.showTeacher) {
                this.setState({
                  url: "/admin"
                });
              }
              else {
                this.setState({
                  url: window.location.pathname
                });
              }
            }
            

    /*Dibuja la pagina  */
    render() {
        const { currentUser, showStudent, showTeacher, showAdmin } = this.state;

        return (
           <div className="container">
               <Card className={"card-long"}>
                   <Card.Body>
                   <div className={"section-title"}>
                        <h2>Qué es Creativa</h2>
                    </div>
                    <div className='row-edit'>
                        <div className={"section-title"}>
                            <h5>De  qué trata</h5>
                        </div>
                        <p>Es una aplicación para fomentar la escritura creativa de una manera didáctica a través de desafíos de distintas temáticas que propondrá el profesor.</p>
                        <div className={"section-title"}>
                            <h5>Uso de la aplicación</h5>
                        </div>
                        <p>En el panel superior te encontrarás con diferentes apartados de la aplicación web, que te mostrarán una funcionalidad diferente cada uno.</p>
                        <div className={"section-title"}>
                            <h5>Inicio</h5>
                        </div>
                        <p>Es la página en la que te encuentras, en ella se ofrece un breve resumen de la aplicación y un pequeño tutorial sobre cómo moverte por la plataforma.</p>
                        <div className={"section-title"}>
                            <h5>Tablero</h5>
                        </div>
                        {showStudent ? ( <>
                            <Link to="/student/groups">Grupos</Link>
                            <p>Desde esta pestaña realizaremos todo lo relacionado con la escritura creativa. 
                            Cuando clicamos en ella vamos a la pestaña principal "Grupos". En "Grupos" tenemos acceso a casi toda la aplicación de manera
                            rápida y sencilla. Podemos pedir entrar a un grupo, ver nuestros grupos, crear nuestro equipo, pedir que nos inviten a uno, continuar un escrito, etc. </p> </>) : ("")}
                         {showTeacher ? ( <>
                            <Link to="/teacher/groups">Grupos</Link>
                            <p>Desde esta pestaña realizaremos el control de los estudiantes creando desafíos, viendo escritos de los estudiantes, los equipos que ellos han formado,
                                los propios estudiantes, también se ofrece la posibilidad de renombrar el grupo...
                            </p> </>) : ("")}
                            {showStudent ? ( <>
                            <Link to="/student/challengesTabs">Crear Escrito</Link>
                            <p> Debajo de esta pestaña encontramos las subsidiarias, primero Crear Escrito para aquellos que no están empezados aún, dividido en individual o 
                            colaborativo, si el escrito fuese en equipo. </p> </>) : ("")}
                            {showTeacher ? ( <>
                            <Link to="/teacher/students">Estudiantes</Link>
                            <p> En esta pestaña podemos ver la lista de los estudiantes con los que cuenta el profesor. </p> </>) : ("")}
                            {showStudent ? ( <>
                            <Link to="/student/writingsTabs">Escrito</Link>
                            <p>  Debajo de este está Escrito, para editar los escritos ya empezados. Además, cuenta con versiones, por lo que si no te gusta el rumbo que está tomando
                            tu escrito puedes volver a una versión anterior, y volver a usarla como que fuese la actual. </p>  </>) : ("")}  
                            {showTeacher ? ( <>
                            <Link to="/teacher/applicants">Solicitantes</Link>
                            <p> Aquí se pueden ver los alumnos que quieren unirse bien sea a la plataforma o a algún grupo que imparte el profesor. </p> </>) : ("")}
                            {showStudent ? ( <>
                            <Link to="/student/teams">Equipos</Link>
                            <p> En Equipos encontramos los equipos que lideramos y de los que formamos parte.  </p> </>) : ("")}
                              {showTeacher ? ( <>
                            <Link to="/teacher/createGroup">Crear Grupo</Link>
                            <p> Aquí el profesor puede crear un nuevo grupo de la temática que desee. </p> </>) : ("")}
                            {showStudent && (
                            <Link to="/student/visualizecollections">Colecciones</Link>
                            )}
                            {showTeacher && (
                            <Link to="/teacher/collections">Colecciones</Link>
                            )}
                            <p>  Y, por último, en colecciones encontramos un álbum de desafíos creados por el profesor según el grupo, donde se pueden ver los escritos 
                            que responden a esos desafíos. </p>
                            
                       
                        <div className={"section-title"}>
                            <h5>
                            <Link to="/profile">Perfil</Link>
                           </h5> 
                        </div>
                        <p>Desde esta pestaña podemos ver nuestro perfil y también podemos configurarlo.</p>
                        
                             {showStudent ? (<><div className={"section-title"}>
                             <h5>   
                            <Link to="/student/messenger">Mensajería</Link>
                            </h5>
                        </div> 
                        <p>Se pueden enviar mensajes entre un estudiante que forme parte de un equipo y otro que no de dos formas: el estudiante que esté en un equipo puede pedir a otro estudiante
                             que entre en su equipo y otra forma, que un estudiante que no esté en un equipo, envíe una petición para entrar.
                        </p> </>) : ("")}
                      
                    </div>
                   </Card.Body>
               </Card>
           </div>
        );


    }


}

export default Inicio;