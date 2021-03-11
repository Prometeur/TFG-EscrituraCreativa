import React,{Component, useState} from "react";
import StudentService from '../../../services/student/student-service.js';
import AuthUser from '../../../services/authenticity/auth-service.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import FormControl from 'react-bootstrap/FormControl';
import Challenges from './Challenges.js';
<<<<<<< HEAD
import Writings from './Writings.js';
import '../../../styles/styleGeneral.css';
=======
>>>>>>> luis

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
      &#x25bc;
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
             dataGroup: [],
             currentUser: {id: ""},
             groupSelect:"",
        };
    }
  
    componentDidMount() {
<<<<<<< HEAD

        const dataUser = AuthUser.getCurrentUser();
        this.setState({currentUser:dataUser.id});
 
        StudentService.allGroups(dataUser.id).then( response => {
=======
        const dataUser = AuthUser.getCurrentUser();
        this.setState({currentUser:dataUser.id});

        /**Obtiene todos los grupos del estudiante */
        StudentService.getGroups(dataUser.id).then( response => {
>>>>>>> luis
             this.setState({dataGroup:response});
         })
     }

     handleSelect(groupId){
      this.setState({groupSelect:groupId});
    }

<<<<<<< HEAD

     render() {
    
        const {dataGroup, currentUser,groupSelect}= this.state;
         return (
            <div className="container">
              <div className="section-container">
=======
     render() {
        const {dataGroup,groupSelect}= this.state;
         return (
            <div>
>>>>>>> luis
               <Dropdown>
                     <DropdownToggle as={CustomToggle} id="dropdown-custom-components">
                         Selecciona grupo
                     </DropdownToggle>
                     <DropdownMenu as={CustomMenu}>
                         {dataGroup.map((row)=>(
<<<<<<< HEAD
                             <DropdownItem eventKey={row.idGrupo} onClick= {() => this.handleSelect(row.idGrupo)}>{row.idGrupo}</DropdownItem>
                         ))}  
                     </DropdownMenu>
              </Dropdown>
              <Challenges key={groupSelect} groupSelect={groupSelect} />
              <Writings key={groupSelect}  idUser={currentUser} groupSelect={groupSelect} />
              {/*<Challenges key={groupSelect} groupSelect={groupSelect} />*/}
              <Writings key={groupSelect}  idUser={currentUser} groupSelect={groupSelect} />
              </div>
=======
                           
                             <DropdownItem eventKey={row.idGrupo} onClick= {() => this.handleSelect(row.idGrupo)}>{row.nombre}</DropdownItem>
                         ))}  
                     </DropdownMenu>
              </Dropdown>

              <Challenges key={groupSelect} groupSelect={groupSelect} />
              {/* <Writings key={groupSelect}  idUser={currentUser} groupSelect={groupSelect} />      */}
>>>>>>> luis
            </div>
         );
     }


}

export default GroupStudent;