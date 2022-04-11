/*
*  Name_file: Collections.js
*  Description: Pagina de colecciones del estudiante, contiene la vista de todos los escritos 
*   que se han guardado en alguna colección.
*    
*/

import React, { Component } from 'react';
import { Link } from "react-router-dom";

/**Datos del usuario */
import AuthUser from '../../../services/authenticity/auth-service.js';

/**Servicios del estudiante */
import StudentService from '../../../services/student/student-service.js';

/*Componentes de estilo Bootstrap*/
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

//Estilos
 import '../../../styles/styleCard.css';

class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }



    /*Dibuja la pagina  */
    render() {
        return (
            <div className="container">
               <Card className="card-long">
                   <Card.Body>
                       <div className={"row-edit"}>
                           <div className={"section-title"}>
                               <h2>Listado de colecciones</h2>
                           </div>
                       </div>
                       <br/>
                        
                   </Card.Body>
               </Card>
            </div>
        );
    }
}

export default Collections;