import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AuthService from '../../../services/authenticity/auth-service.js';

/** Estilos CSS*/
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
/**Estilos importados*/
import Card from 'react-bootstrap/Card';
import 'react-tabs/style/react-tabs.css';

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
        currentUserName: user.username,
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
      const { currentUserName, showStudent, showTeacher, showAdmin } = this.state;

      return (
        <>
        <div className="editPerfil-left">
            <img  className={"img-editprofile"} src="/plumaliteratura.png" alt=""/>
        </div>
        <div className="container">
            <Card className={"card-long"}>
                <Card.Body>
                <div className={"section-title"}>
                    <h2>¿Qué es Creativa?</h2>
                </div>
                <div className='row-edit'>
                    <p>Es una aplicación para fomentar la escritura creativa de una manera didáctica a través de desafíos de distintas temáticas que propondrá el profesor.</p>
                    
                    <div className={"section-title"}>
                        <h5>Uso de la aplicación</h5>
                    </div>
                    <p>En el panel superior te encontrarás con diferentes apartados de la aplicación web, que te mostrarán una funcionalidad diferente cada uno.</p>
                    
                    <div className={"section-title"}>
                        <h5>Inicio</h5>
                    </div>
                    <p>Es la página en la que te encuentras, en ella se ofrece un breve resumen de la aplicación y un pequeño tutorial sobre cómo moverte por la plataforma.</p>

                    {showStudent ? ( 
                    <>
                        <div className={"section-title"}>
                            <Link to="/student/groups">
                              <h5>Tablero</h5>
                            </Link>
                        </div>
                        <p>Desde esta pestaña realizaremos todo lo relacionado con la escritura creativa. A continuación se explican los distintos subapartados a los que se pueden acceder
                          desde el menú lateral izquierdo en esta pestaña.</p>

                        <Link to="/student/groups">Grupos</Link>
                        <p>Desde aquí tenemos acceso a casi toda la aplicación de manera rápida y sencilla. Podemos pedir entrar a un grupo, ver nuestros grupos y, para cada grupo:
                          crear un escrito, continuar un escrito, pedir entrar a un equipo ya existente o crear un equipo.</p>

                        <Link to="/student/challengesTabs">Crear Escrito</Link>
                        <p>Debajo de esta pestaña encontramos las subsidiarias, primero Crear Escrito para aquellos que no están empezados aún, dividido en individual o 
                          colaborativo, si el escrito fuese en equipo.</p>

                        <Link to="/student/writingsTabs">Escrito</Link>
                        <p>Debajo de este está Escrito, para editar los escritos ya empezados. Además, cuenta con versiones, por lo que si no te gusta el rumbo que está tomando
                          tu escrito puedes volver a una versión anterior, y volver a usarla como que fuese la actual.</p>

                        <Link to="/student/teams">Equipos</Link>
                        <p>En Equipos encontramos los equipos que lideramos y de los que formamos parte.</p>

                        <Link to="/student/visualizecollections">Colecciones</Link>
                        <p>Y, por último, en una colección encontramos un álbum de desafíos creados por el profesor según el grupo, donde se pueden ver todos los escritos 
                          que corresponden a esos desafíos.</p>

                      </>) : ("")}

                      {showTeacher ? ( 
                      <>
                        <div className={"section-title"}>
                            <Link to="/teacher/groups">
                              <h5>Tablero</h5>
                            </Link>
                        </div>
                        <p>Desde esta pestaña realizaremos todo lo relacionado con la escritura creativa. A continuación se explican los distintos subapartados a los que se pueden acceder
                          desde el menú lateral izquierdo en esta pestaña.</p>

                        <Link to="/teacher/groups">Grupos</Link>
                        <p>Desde esta pestaña realizaremos el control de los estudiantes creando desafíos, viendo escritos de los estudiantes, los equipos que ellos han formado,
                          los propios estudiantes, también se ofrece la posibilidad de renombrar el grupo...</p> 

                        <Link to="/teacher/students">Estudiantes</Link>
                        <p>En esta pestaña podemos ver la lista de los estudiantes con los que cuenta el profesor.</p>

                        <Link to="/teacher/applicants">Solicitantes</Link>
                        <p>Aquí se pueden ver los alumnos que quieren unirse bien sea a la plataforma o a algún grupo que imparte el profesor.</p>
                        
                        <Link to="/teacher/createGroup">Crear Grupo</Link>
                        <p>Aquí el profesor puede crear un nuevo grupo de la temática que desee.</p>                            

                        <Link to="/teacher/collections">Colecciones</Link>
                        <p>Y, por último, se puede crear una colección vinculada a un grupo para insertar en ella un conjunto de desafíos. De esta forma podremos organizar los desafíos
                          a nuestro gusto. Además, se podrán ver los escritos que han creado los estudiantes para cada desafío.</p>

                      </>) : ("")}

                      {showAdmin ? ( 
                      <>
                        <div className={"section-title"}>
                            <Link to="/admin/groups">
                              <h5>Tablero</h5>
                            </Link>
                        </div>
                        <p>Desde esta pestaña realizaremos todo lo relacionado con la escritura creativa. A continuación se explican los distintos subapartados a los que se pueden acceder
                          desde el menú lateral izquierdo en esta pestaña.</p>

                        <Link to="/admin/groups">Grupos</Link>
                        <p>En esta pestaña se encuentran todas las acciones que se pueden realizar como administrador. Se puede acceder a todos los grupos creados en la plataforma 
                          y modificarlos si es necesario. Para cada grupo se da la opción de cambiar su nombre, desactivar el grupo, ver el profesor que gestiona el grupo y ver los estudiantes
                          que pertenecen al grupo. Además, para cada profesor y estudiante se pueden realizar varias operaciones, en las que entraremos en detalle en los apartados 
                          "Usuarios" y "Solicitantes", ya que también se pueden realizar estas operaciones desde estos apartados.</p>

                        <Link to="/admin/users">Usuarios</Link>
                        <p>Muestra un listado de los profesores y estudiantes de la plataforma, pudiéndolos buscar por nombre, correo, o rol (tipo de usuario). Para los profesores
                          y estudiantes se podrá desactivar temporalmente al usuario o expulsarlo para siempre (denegar solicitud). Además, para los estudiantes se permite la opción
                          de invitarlo a un grupo o expulsarlo de uno en el que ya esté.</p>

                        <Link to="/admin/applicants">Solicitantes</Link>
                        <p>En este subapartado se muestra una lista con todos los usuarios que se registran y no han sido admitidos todavía en la plataforma. Se incluye una búsqueda
                          para los usuarios, y se puede aceptar o rechazar la solicitud del usuario.</p>

                      </>) : ("")}                        


                    <div className={"section-title"}>
                        <Link to="/profile">
                          <h5>{currentUserName}</h5>
                        </Link>
                    </div>
                    <p>Desde esta pestaña podemos ver nuestro perfil y también podemos configurarlo.</p>
                    
                    {showStudent ? (
                    <>
                      <div className={"section-title"}>    
                          <Link to="/student/messenger">
                            <h5>Mensajería</h5>
                          </Link>
                      </div> 
                      <p>Se pueden enviar mensajes entre un estudiante que forme parte de un equipo y otro que no de dos formas: el estudiante que esté en un equipo puede pedir a otro estudiante
                          que entre en su equipo y otra forma, que un estudiante que no esté en un equipo, envíe una petición para entrar.
                      </p> 
                    </>) : ("")}

                    <br />
                  
                </div>
                </Card.Body>
            </Card>
        </div>
        </>
      );


  }


}

export default Inicio;