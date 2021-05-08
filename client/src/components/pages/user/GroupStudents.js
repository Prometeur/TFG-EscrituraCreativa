/*
*  Name_file :GroupStudents.js
*  Description: Contiene una lista de estudiantes de un grupo. Vive dentro de Group.js
*    
*/
import React, { Component } from 'react';
import { Link} from "react-router-dom";
import TeacherService from '../../../services/teacher/teacherService.js';
import AdminService from '../../../services/admin/adminService.js';
import AuthUser from '../../../services/authenticity/auth-service.js';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class GroupStudents extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            filteredData: [],
            currentUserId: '',
            currentUserRole: '',
            searchStudent: '',
            searchType: 'nombre'
        };
    }

    //Filtra los datos de los estudiantes buscados para solo buscar en la base de datos una vez
    filterData = () =>{
        let auxArray = [];
        //this.state.filteredData = [];
        for(let i = 0; i < this.state.data.length; i++){
            if(this.state.searchType == "email")
            {
                if(new RegExp( this.state.searchStudent, 'i'  ).test(this.state.data[i].correo))
                {
                    auxArray.push(this.state.data[i]);
                }
            }
            else
            {
                if((new RegExp(this.state.searchStudent, 'i' ).test(this.state.data[i].nombre)) || (new RegExp( this.state.searchStudent, 'i' ).test(this.state.data[i].apellidos)) )
                {
                    auxArray.push(this.state.data[i]);
                }
            }
        }
        this.setState({ filteredData: auxArray });
    }

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChangeSearch = async e => {
        await this.setState({
                [e.target.name]: e.target.value
        });
        this.filterData();
    }

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChangeSearchType = async e => {
        await this.setState({
                [e.target.name]: e.target.value
        });
        this.filterData();
    }
    

    componentDidMount() {

        const dataUser = AuthUser.getCurrentUser();
        this.setState({
            currentUserId: dataUser.id
        });
        this.setState({
            currentUserRole: dataUser.rol
        });

        AdminService.getStudentsOfGroup(this.props.idGroup).then(response =>{
            this.setState({data:response});
            this.setState({filteredData:response});
            this.filterData();
        })

    }


    /*Dibuja la pagina  */
    render() {
        let cartel =<> </>;
        let tabla = <ul className={"flex-items-row-start wrap"}>
            {this.state.filteredData.map((student) => 
                (
                   <li className={"items-row"}>
                       <div className={"form-items-row"}>
                            <img src={(student.foto.data.length != 0) ? ("data:image/png;base64," +
                                        btoa(String.fromCharCode.apply(null, student.foto.data))) : "/chicaliteratura.png"}
                                 alt=""
                                 style={{width: '40%',  borderRadius: '80%'}} >
                            </img>
                       </div>

                        <div className={"form-items-row"}>
                            {student.nombre} {student.apellidos}
                        </div>
                       <div className={"form-items-row"}>
                            {student.correo}
                       </div>
                       <div className={"form-items-row"}>
                            <Link key={student.id} to={`/admin/users/viewProfile/${student.id}`}>
                                <Button variant={"outline-secondary"} text='Ver Perfil'> Ver perfil </Button>
                            </Link>
                       </div>
                   </li>
                )
            )}
        </ul>

    if(this.state.currentUserRole === "T")
    {
        tabla = <ul className={"flex-items-row-start wrap"}>

                    {this.state.filteredData.map((student) =>
                        (
                            <li className={"items-row"}>
                                    <div className={"form-items-row"}>
                                        <img src={(student.foto.data.length != 0) ? ("data:image/png;base64," +
                                        btoa(String.fromCharCode.apply(null, student.foto.data))) : "/chicaliteratura.png" }
                                             alt=""
                                             style={{width: '40%',  borderRadius: '80%',margin:"0 0 0 1rem"}}
                                        >
                                        </img>
                                    </div>
                                    <div className={"form-items-row"}>
                                        {student.nombre} {student.apellidos}
                                    </div>
                                    <div className={"form-items-row"}>
                                        {student.correo}
                                    </div>
                                    <div className={"form-items-row"}>
                                        <Link key={student.id} to={`/teacher/students/viewProfile/${student.id}`}>
                                            <Button variant={"outline-secondary"} text='Ver Perfil'> Ver perfil </Button>
                                        </Link>
                                    </div>
                            </li>
                        )
                    )}

            </ul>
    }
    if(this.state.filteredData.length === 0)
    {
        cartel = <div className={"section-title"}>
                    <h2>No hay resultados para la búsqueda realizada.</h2>
                </div>;
        tabla = <></>;
    }


        return (

            <div className="container">
                <Card className="card-long">
                    <Card.Body>
                    <div className={"group-teams"}>
                            <label  className={"form-label"}>Buscar estudiante</label>
                            <input type="text" name="searchStudent" onChange={this.handleChangeSearch} />
                            <label className={"form-label"}>Escoja cómo buscar</label>
                            <select name="searchType" id="searchType" onChange={this.handleChangeSearchType}>
                                <option value="nombre">Nombre</option>
                                <option value="email">Email</option>
                            </select>
                    </div>
                        {cartel}
                        {tabla}
                    </Card.Body>
                </Card>
            </div>
        );
    }


}

export default GroupStudents;