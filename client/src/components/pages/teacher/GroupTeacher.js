/*
*  Name_file :GroupTeacher.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component, useState } from 'react';
import TeacherService from '../../../services/teacher/teacherService.js';
import AuthUser from '../../../services/authenticity/auth-service.js';

//Componentes de Estilos
import SplitButtom from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import FormControl from 'react-bootstrap/FormControl';
import Challenges from './Challenges.js';
import Writings from './Writings.js';
import Teams from './GroupTeams';
import Students from '../user/GroupStudents';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Icon from '@material-ui/core/Icon';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import AdminService from '../../../services/admin/adminService.js';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Accordion from 'react-bootstrap/Accordion';




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


class GroupTeacher extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataGroup: [],//contiene todos los grupos del estudiante
      currentUser: { id: "" },
      groupSelect: "",
      nameGroupSelect: "",
      itemSelect: "",
      showChallenges: false,
      showWritings: false,
      showTeams: false,
      showStudents: false,
      newName:""
    };
  }

  componentDidMount() {

    const dataUser = AuthUser.getCurrentUser();
    this.setState({ currentUser: dataUser });

    /**Obtiene todos los grupos del profesor */
    TeacherService.getGroups(dataUser.id).then(response => {
      this.setState({ dataGroup: response });
      if(this.state.dataGroup.length > 0)
      {
        this.setState({ groupSelect: this.state.dataGroup[0].id, nameGroupSelect: this.state.dataGroup[0].nombre });
      }
    })
  }

  itemSelection = event => {
    if (event.target.value === "1") {
      this.setState({
        showChallenges: true,
        showWritings: false,
        showTeams: false,
        showStudents: false

      });
    }
    else if (event.target.value === "2") {
      this.setState({
        showChallenges: false,
        showWritings: true,
        showTeams: false,
        showStudents: false
      });
    }
    else if (event.target.value === "3") {
      this.setState({
        showChallenges: false,
        showWritings: false,
        showTeams: true,
        showStudents: false
      });
    }
    else if (event.target.value === "4") {
      this.setState({
        showChallenges: false,
        showWritings: false,
        showTeams: false,
        showStudents: true
      });
    }

  };

  // handleSelect(groupId) {
  //   this.setState({ groupSelect: groupId });
  // }

  handleSelect(group) {
    this.setState({ groupSelect: group.id, nameGroupSelect: group.nombre });
  }

  /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
  handleChangeRename = async e => {
    await this.setState({
            [e.target.name]: e.target.value
    });
  }

  /*Se hacen peticiones al servidor renombrar grupo*/
  rename = () => {
      AdminService.renameGroup(this.state.groupSelect, this.state.newName ).then(response => {
        const dataUser = AuthUser.getCurrentUser();
          this.setState({ nameGroupSelect: this.state.newName });
        
      }).catch(error => {
          console.log(error.message);
      })
  }

  /*Dibuja la pagina  */
  render() {

    const { dataGroup, groupSelect, showChallenges, showWritings, showTeams, showStudents } = this.state;

    // SISTEMA DE TABS

      let tabs = <div className="container-box"> 
                      <Tabs>
                          <TabList>
                            <Tab>DESAFIOS</Tab>
                            <Tab>ESCRITOS</Tab>
                            <Tab>EQUIPOS</Tab>
                            <Tab>ESTUDIANTES</Tab>
                          </TabList>
                          <TabPanel>
                          <div className="row">
                            <Challenges key={groupSelect} groupSelect={groupSelect} />
                          </div>
                          </TabPanel>
                          <TabPanel>
                          <div className="row">
                            <Writings key={groupSelect} groupSelect={groupSelect} />
                          </div>
                          </TabPanel>
                          <TabPanel>
                          <div className="row">
                            <Teams key={groupSelect} groupSelect={groupSelect} />
                          </div>
                          </TabPanel>
                          <TabPanel>
                          <div className="row">
                            <Students key={groupSelect} idGroup={groupSelect} />
                          </div>
                          </TabPanel>
                      </Tabs>
                </div>;

    // SISTEMA DE TABS

    //VENTANA EMERGENTE DE CAMBIAR NOMBRE
    //NOTA: EL PANEL BLANCO QUE SALE ES PORQUE EN ALGUN ESTILO, SE OBLIGA A LAS .card A TENER UNA ALTURA FIJA. SIS E QUITA ESE ESTILO, SE ESCONDE BIEN
      let botonRenombrar = <div><button text='Cambiar' onClick={() => this.rename()}>Cambiar</button></div>;
      if(this.state.newName ===""){
        botonRenombrar = <div><button disabled text='Cambiar' onClick={() => this.rename()}>Cambiar</button></div>;
      }

      let renamePanel = 
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Renombrar grupo
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
                <div>
                  <label>Cambiar nombre: </label>
                  <br />
                  <input type="text" name="newName" onChange={this.handleChangeRename} />
                  <br />
                </div>
                {botonRenombrar}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      
      
      
      ;
    //VENTANA EMERGENTE DE CAMBIAR NOMBRE

    return (
      <div className="container">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Card className="card-long">
          <Card.Body>
            <div className="row">
              {/* <div className="column column-left"> */}
              <Dropdown className="drop-down">
                <DropdownToggle as={CustomToggle} id="dropdown-custom-components">Selecciona grupo</DropdownToggle>
                <DropdownMenu as={CustomMenu}>
                  {dataGroup.map((row) => (
                    // <DropdownItem eventKey={row.id}
                    //   onClick={() => this.handleSelect(row.id)}>{row.nombre}</DropdownItem>
                    <DropdownItem eventKey={row.idGrupo} onClick={() => this.handleSelect(row)}>{row.nombre}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {/* </div> */}
            </div>

            {/*<td><textarea name="mensaje" rows="1" cols="10" value={this.state.nameGroupSelect} readOnly={true} style={{ resize: "none" }} ></textarea></td>*/}
            <h3>{this.state.nameGroupSelect}</h3>

            {renamePanel}

            {/*<select onChange={this.itemSelection} disabled={!this.state.groupSelect ? true : null} >
              <option value="" selected disabled hidden > Seleccionar </option>
              <option value="1" > Desafios </option>
              <option value="2" > Escritos </option>
              <option value="3" > Equipos </option>
              <option value="4" > Estudiantes </option>
              </select>*/}

            {/* <div className="column column-rigth">
               
                <Link to={`/teacher/createChallenge/${groupSelect}`}>
                  <Button variant="primary">Crear desafio</Button>
                </Link>
              </div> */}

            {/* <div className="row">
              <Challenges key={groupSelect} groupSelect={groupSelect} />
            </div> */}

            

            {showChallenges ? (
              <div className="row">
                <Challenges key={groupSelect} groupSelect={groupSelect} />
              </div>
            ) : (
              <div></div>
            )}

            {showWritings ? (
              <div className="row">
                <Writings key={groupSelect} groupSelect={groupSelect} />
              </div>
            ) : (
              <div></div>
            )}
            {showTeams ? (
              <div className="row">
                <Teams key={groupSelect} groupSelect={groupSelect} />
              </div>
            ) : (
              <div></div>
            )}
            {showStudents ? (
              <div className="row">
                <Students key={groupSelect} idGroup={groupSelect} />
              </div>
            ) : (
              <div></div>
            )}
            {tabs}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default GroupTeacher;