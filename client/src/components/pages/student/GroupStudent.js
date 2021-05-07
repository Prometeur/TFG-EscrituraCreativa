import React, { Component, useState } from "react";
import StudentService from '../../../services/student/student-service.js';
import AuthUser from '../../../services/authenticity/auth-service.js';

//Paginas
import WritingTabs from './WritingTabs.js';
import TeamTabs from './TeamTabs.js';
import ChallengeTabs from './ChallengeTabs.js';

//Estilos
import '../../../styles/styleGeneral.css';

//Componentes de estilos
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Icon from '@material-ui/core/Icon';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import Button from "../teacher/GroupTeacher";




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
    { <Icon><ExpandMoreRoundedIcon></ExpandMoreRoundedIcon></Icon>}
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
          placeholder="Type to filter..."
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


class GroupStudent extends Component {

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
    };
  }

  componentDidMount() {

    const dataUser = AuthUser.getCurrentUser();
    this.setState({ currentUser: dataUser.id });

    /**Obtiene todos los grupos del estudiante */
    StudentService.getGroups(dataUser.id)
      .then(response => {
        if (response.length > 0) {
          this.setState({ dataGroup: response, groupSelect: response[0].idGrupo, nameGroupSelect: response[0].nombre, showChallenges: true });
        }

      })
  }

  componentDidUpdate(pP, pS, sS) {

    // if (pS.dataTeamStudentGroup !== this.state.dataTeamStudentGroup) {
    //     debugger;
    //     console.log("hacer algo");
    // }

    var u = 1
    u = u + 1
    console.log("hola------>", u++);
    // if (pP !== this.props) {
    //     debugger;
    //     console.log("hacer algo");
    // }

  }
  
  itemSelection = event => {
    if (event.target.value === "1") {
      this.setState({
        showChallenges: true,
        showWritings: false,
        showTeams: false
      });
    }
    else if (event.target.value === "2") {
      this.setState({
        showChallenges: false,
        showWritings: true,
        showTeams: false
      });
    }
    else if (event.target.value === "3") {
      this.setState({
        showChallenges: false,
        showWritings: false,
        showTeams: true
      });
    }
  };

  // handleSelect(groupId) {
  //   debugger;
  //   this.setState({ groupSelect: groupId });
  // }


  handleSelect(group) {
    this.setState({ groupSelect: group.idGrupo, nameGroupSelect: group.nombre });
  }

  disabledButton = () => {
    if (this.state.dataGroup.length > 0) {
      return false;
    }
    return true;
  }

  render() {
    const { dataGroup, groupSelect, showChallenges, showWritings, showTeams } = this.state;
    return (
      <div className="container">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Card className="card-long">
          <Card.Body>
            <Dropdown className="drop-down" >
              <DropdownToggle as={CustomToggle} id="dropdown-custom-components">Selecciona grupo</DropdownToggle>
              <DropdownMenu as={CustomMenu}>
                {dataGroup.map((row) => (
                  // <DropdownItem eventKey={row.idGrupo} onClick={() => this.handleSelect(row.idGrupo)}>{row.nombre}</DropdownItem>
                  <DropdownItem eventKey={row.idGrupo} onClick={() => this.handleSelect(row)}>{row.nombre}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <div className="items-column">
              <h3>{this.state.nameGroupSelect}</h3>
            </div>

            {/* onChange={this.qualificationSelection} */}
            {/* value={this.state.form.qualification} */}

            <select onChange={this.itemSelection} disabled={!this.state.groupSelect ? true : null} >
              {/* <select onChange={this.itemSelection} disabled={this.disabledButton()} > */}
              {/* <option value="" selected disabled hidden > Seleccionar </option> */}
              <option value="1" > Crear Escrito </option>
              <option value="2" > Escritos </option>
              <option value="3" > Equipos </option>
            </select>

            {showChallenges ? (
              <div className="row">
                <ChallengeTabs key={groupSelect} groupSelect={groupSelect} />
              </div>
            ) : (
              <div></div>
            )}

            {showWritings ? (
              <div className="row">
                <WritingTabs key={groupSelect} groupSelect={groupSelect} />
              </div>
            ) : (
              <div></div>
            )}

            {showTeams ? (
              <div className="row">
                <TeamTabs key={groupSelect} groupSelect={groupSelect} />
              </div>
            ) : (
              <div></div>
            )}

          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default GroupStudent;