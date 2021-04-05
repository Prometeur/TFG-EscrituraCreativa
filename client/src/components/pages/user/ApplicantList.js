/*
*  Name_file :SearchStudentRes.js
*  Description: Contiene una lista de resultado de la búsqueda de los estudiantes.
*    
*/
import React, { Component } from 'react';
import { Link} from "react-router-dom";
import AuthUser from '../../../services/authenticity/auth-service.js';
import TeacherService from '../../../services/teacher/teacherService.js';
import AdminService from '../../../services/admin/adminService.js';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class SearchStudentRes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            filteredData: [],
            searchName: '',
            currentUserId: '',
            currentUserRole: '',
            searchType: 'nombre',
            searchRole:"none"
    
        };
    }


    //Filtra los datos de los estudiantes buscados para solo buscar en la base de datos una vez
    filterData = () =>{
        let auxArray = [];
        this.state.filteredData = [];
        for(let i = 0; i < this.state.data.length; i++){
            if(this.state.searchType == "email")
            {
                if(new RegExp( this.state.searchName, 'i'  ).test(this.state.data[i].correo))
                {
                    auxArray.push(this.state.data[i]);
                }
            }
            else
            {
                if((new RegExp(this.state.searchName, 'i' ).test(this.state.data[i].nombre)) || (new RegExp( this.state.searchName, 'i' ).test(this.state.data[i].apellidos)) )
                {
                    auxArray.push(this.state.data[i]);
                }
            }
        }
        let finalArray = [];
        if(this.state.searchRole != "none")
        {
            for(let i = 0; i < auxArray.length; i++){
                if(auxArray[i].rol === this.state.searchRole){
                    finalArray.push(auxArray[i]);
                }
            }
        }
        else{
            finalArray = auxArray;
        }

        this.setState({ filteredData: finalArray });
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

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChangeSearchRole = async e => {
        await this.setState({
                [e.target.name]: e.target.value
        });
        this.filterData();
    }

    changeViewStudentProfile = (idStudent) => 
    {
        window.location.href = '/teacher/students/viewProfile/'+ idStudent;
    }
    

    componentDidMount() {

        const dataUser = AuthUser.getCurrentUser();
        this.setState({
            currentUserRole: dataUser.rol
        });

        if(dataUser.rol == "T"){
            this.setState({searchRole:"S"});
        }


        TeacherService.searchApplicant(this.state.searchName, this.state.searchType).then(response =>{
            this.setState({data:response});
            this.setState({filteredData:response});
            this.filterData();
        })

    }


    /*Dibuja la pagina  */
    render() {
        let cartel =<div> </div>;
        
        let tabla = <div> </div>;

    if(this.currentUserRole ="A"){
        tabla = <ListGroup variant="flush">

            {this.state.filteredData.map((student) => 
                (
                    <React.Fragment>
                    <ListGroup.Item>
                        {student.id} 
                        <img src={"data:image/png;base64," + btoa(String.fromCharCode.apply(null, student.foto.data))} alt="" style={{width: '5%',  borderRadius: '80%'}} ></img>
                        {student.nombre} {student.apellidos} 
                        {student.correo}
                        <Link key={student.id} to={`/teacher/students/viewProfile/${student.id}`}><button text='Ver Perfil'> Ver perfil </button></Link>
                    </ListGroup.Item>
                    </React.Fragment>
                    
                )
            )}
            
    </ListGroup>;
    }

    if(this.currentUserRole ="A"){
        tabla = <ListGroup variant="flush">

            {this.state.filteredData.map((student) => 
                (
                    <React.Fragment>
                    <ListGroup.Item>
                        {student.id} 
                        <img src={"data:image/png;base64," + btoa(String.fromCharCode.apply(null, student.foto.data))} alt="" style={{width: '5%',  borderRadius: '80%'}} ></img>
                        {student.nombre} {student.apellidos} 
                        {student.correo}
                        <Link key={student.id} to={`/admin/users/viewProfile/${student.id}`}><button text='Ver Perfil'> Ver perfil </button></Link>
                    </ListGroup.Item>
                    </React.Fragment>
                    
                )
            )}
            
        </ListGroup>;
    }


        if(this.state.filteredData.length === 0)
        {
            cartel = <nav>
                        <h2>No hay resultados para la búsqueda realizada.</h2>
                    </nav>;
            tabla = <div></div>;
        }
        

        let searchtools = 
            <div>
                <label>Buscar solicitantes: </label>
                <br />
                <input type="text" name="searchName" onChange={this.handleChangeSearch} />
                <br />
                <label for="searchType">Escoja cómo buscar:</label>
                <select name="searchType" id="searchType" onChange={this.handleChangeSearchType}>
                    <option value="nombre">Nombre</option>
                    <option value="email">Email</option>
                </select>
                <h2> Resultados de buscar solicitantes con {this.state.searchType} similar a {this.state.searchName}:</h2>
            </div>;

            if(this.state.currentUserRole == "A")
            {
                searchtools = 
                    <div>
                    <h2> Resultados de buscar usuarios con {this.state.searchName} similar a {this.state.searchType}:</h2>
                            <label>Buscar usuario: </label>
                            <br />
                            <input type="text" name="searchName" onChange={this.handleChangeSearch} />
                            <br />
                            <label for="searchType">Escoja cómo buscar:</label>
                            <select name="searchType" id="searchType" onChange={this.handleChangeSearchType}>
                                <option value="nombre">Nombre</option>
                                <option value="email">Email</option>
                            </select>
                            <label for="searchRole">Buscar por rol:</label>
                            <select name="searchRole" id="searchRole" onChange={this.handleChangeSearchRole}>
                                <option value="none">Buscar por rol...</option>
                                <option value="S">Estudiantes</option>
                                <option value="T">Profesores</option>
                                <option value="A">Administradores</option>
                            </select> 
                    </div>
            }


        return (
            <>
            <div className="container">
                <Card className="card-edit">
                    <Card.Body>
                    <h1>Solicitantes:</h1>

                        {searchtools}

                    <div>

                        {cartel}


                        {tabla}


                    </div>
                    </Card.Body>
                </Card>
            </div>
          </>
        );
    }


}

export default SearchStudentRes;