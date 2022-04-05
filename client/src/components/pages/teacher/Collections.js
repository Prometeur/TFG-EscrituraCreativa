/*
*  Name_file: Collections.js
*  Description: Pagina de colecciones del estudiante, contiene la vista de todos los escritos 
*   que se han guardado en alguna colección.
*    
*/

/*Componentes de estilo Bootstrap*/
import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import TeacherService from '../../../services/teacher/teacherService.js';
import AuthUser from '../../../services/authenticity/auth-service.js';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import FormControl from 'react-bootstrap/FormControl';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from 'react-bootstrap/Card';
import Icon from '@material-ui/core/Icon';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import AdminService from '../../../services/admin/adminService.js';
import Alert from "react-bootstrap/Alert";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Accordion from 'react-bootstrap/Accordion';

//Estilos
 import '../../../styles/styleCard.css';


 const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {<Icon><ExpandMoreRoundedIcon></ExpandMoreRoundedIcon></Icon>}
    </a>
  ));
  
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Buscar grupo..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value) || child.props.children.toUpperCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );


class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataGroup: [],
            idGroupSelect: 0,
            nameGroupSelect: '',
            nombreColeccion: "",
            onCreateCollectionModal: false,
            onAlert: false,

        }
    }

    componentDidMount() {

        /**Obtiene todos los grupos del profesor */
        TeacherService.getGroups(AuthUser.getCurrentUser().id).then(response => {
        this.setState({ dataGroup: response });
        if (this.state.dataGroup.length > 0) {
            this.setState({ idGroupSelect: this.state.dataGroup[0].id, nameGroupSelect: this.state.dataGroup[0].nombre, showListGroups: true });
        }
        })
        
    }

    crearColeccion = () => {
        if (this.state.nombreColeccion != '') {
          TeacherService.createCollection(this.state.nombreColeccion, AuthUser.getCurrentUser().id, this.state.idGroupSelect)
            .then(response => {
                this.onModal(false);
                
          }).catch(error => {
            console.log(error.message);
          })
        }
        else {
          this.onAlert(true)
        }
      }

    onModal(modal) {

        this.setState({
          onCreateCollectionModal: modal
        });
    }

    handleSelect(group) {
        this.setState({ idGroupSelect: group.id, nameGroupSelect: group.nombre });
    }

    onAlert(modal) {
        this.setState({
          onAlert: modal
        });
      }

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleCreateCollection = async e => {
        await this.setState({
        [e.target.name]: e.target.value
        });
    }


    /*Dibuja la pagina  */
    render() {
        const { dataGroup,  idGroupSelect } = this.state;
        return (
            <div className="container">
               <Card className="card-long">
                   <Card.Body>
                       <div className={"row-edit"}>
                           <div className={"section-title"}>
                               <h2>Colecciones</h2>
                           </div>
                       </div>

                        <div className={"border-group"}>
                            <br />
                            <ul className={"flex-items-row-evenly"}>
                                <li className={"flex-item-form"}>
                                <Dropdown className="drop-down">
                                    <DropdownToggle as={CustomToggle} id="dropdown-custom-components">Selecciona grupo</DropdownToggle>
                                    <DropdownMenu as={CustomMenu}>
                                    {dataGroup.map((row) => (
                                        <DropdownItem eventKey={row.idGrupo} onClick={() => this.handleSelect(row)}>{row.nombre}</DropdownItem>
                                    ))}
                                    </DropdownMenu>
                                </Dropdown>
                                </li>
                                <li className={"flex-item-form"}>
                                <h4  style={{color: "#717172"}}>{this.state.nameGroupSelect}</h4>
                                </li>
                                <li className={"flex-item-form"}>
                                <Button variant="primary" onClick={() => this.onModal(true)}>Crear colección</Button>
                                </li>
                            </ul>
                            {/* <ul className={"flex-items-row-evenly"}>
                                <li className={"flex-item-form"}>
                                    <p>Introduce el nombre para la colección:</p>
                                </li>
                                <li className={"flex-item-form"}>
                                    <input class="form-control" type="text"/>
                                </li>

                            </ul> */}
                        </div>



                   </Card.Body>
               </Card>


               <Modal
                show={this.state.onCreateCollectionModal}
                onHide={this.state.onCreateCollectionModal}
                >
                <Modal.Header>
                    <Modal.Title>Crear colección</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Nombre: </label>
                    <br />
                    <input type="text" className="form-control" name="nombreColeccion" onChange={this.handleCreateCollection} />
                    <Alert show={this.state.onAlert}>ERROR</Alert>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.crearColeccion()}>Acepto</Button>
                    <Button variant="danger" onClick={() => this.onModal(false)}>Cancelar</Button>
                </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default Collections;