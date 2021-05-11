/*
*  Name_file :UserList.js
*  Description: Contiene una lista de los usuarios.
*    
*/
import React, { Component } from 'react';
import { Link} from "react-router-dom";
import TeacherService from '../../../services/teacher/teacherService';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import adminService from '../../../services/admin/adminService';

class SearchStudentRes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            filteredData:[],
            searchName: '',
            searchType: 'nombre',
            searchRole:"none"
    
        };
    }


 /*Se hacen peticiones al servidor para que me devuelva todos los usuarios buscados*/
    peticionPost = () => {
        adminService.getUsers(this.state.searchName, this.state.searchType).then(response =>{
            this.setState({data:response});
            this.setState({filteredData:response});
            this.filterData();
        })
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

    changeViewUserProfile = (idUser) => 
    {
        window.location.href = '/admin/users/viewProfile/'+ idUser;
    }
    

    componentDidMount() {
        this.peticionPost();
    }


    /*Dibuja la pagina  */
    render() {
        let cartel =<div> </div>;
        let tabla = <ListGroup variant="flush">

            {this.state.filteredData.map((user) => 
                (
                    <React.Fragment>
                    <ListGroup.Item>
                        {user.id} 
                        <img src={(user.foto.data.length != 0) ? ("data:image/png;base64," +
                        btoa(String.fromCharCode.apply(null, user.foto.data))) : "/chicaliteratura.png" } alt="" style={{width: '5%',  borderRadius: '80%'}} ></img>
                        {user.nombre} {user.apellidos} 
                        {user.correo}
                        <Link key={user.id} to={`/admin/users/viewProfile/${user.id}`}><button text='Ver Perfil'> Ver perfil </button></Link>
                    </ListGroup.Item>
                    </React.Fragment>
                    
                )
            )}
    </ListGroup>;
        if(this.state.filteredData.length === 0)
        {
            cartel = <nav>
                        <h2>No hay resultados para la búsqueda realizada.</h2>
                    </nav>;
            tabla = <div></div>;
        }


        return (
            <>
            <div className="container">
                <Card className="card-edit">
                    <Card.Body>
                    <h1>Usuarios:</h1>

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