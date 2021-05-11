/*
*  Name_file :SearchStudentRes.js
*  Description: Contiene una lista de resultado de la búsqueda de los estudiantes.
*    
*/

import React, { Component } from 'react';
import { Link} from "react-router-dom";
import AuthUser from '../../../services/authenticity/auth-service.js';
import TeacherService from '../../../services/teacher/teacherService.js';

/** Estilos CSS*/
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';

/**Estilos*/
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from "react-bootstrap/Alert";

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
            this.setState({
                currentUserRole: dataUser.rol
            });
            this.filterData();
        })

    }


    /*Dibuja la pagina  */
    render() {
        let cartel =<> </>;
        let tabla = <> </>;

    if(this.state.currentUserRole ==="T"){
        tabla = <ListGroup variant="flush">

            {this.state.filteredData.map((student) => 
                (
                    <React.Fragment>
                    <ListGroup.Item>
                        {student.id} 
                        <img src={(student.foto.data.length != 0) ? ("data:image/png;base64," +
                        btoa(String.fromCharCode.apply(null, student.foto.data))) : "/chicaliteratura.png" } alt="" style={{width: '5%',  borderRadius: '80%'}} ></img>
                        {student.nombre} {student.apellidos} 
                        {student.correo}
                        <Link key={student.id} to={`/teacher/students/viewProfile/${student.id}`}><button text='Ver Perfil'> Ver perfil </button></Link>
                    </ListGroup.Item>
                    </React.Fragment>
                    
                )
            )}
            
      </ListGroup>;
    }

    if(this.state.currentUserRole ==="A"){

        tabla = <ListGroup variant="flush">

            {this.state.filteredData.map((student) => 
                (
                    <React.Fragment>
                    <ListGroup.Item>
                        {student.id} 
                        <img src={(student.foto.data.length != 0) ? ("data:image/png;base64," +
                        btoa(String.fromCharCode.apply(null, student.foto.data))) : "/chicaliteratura.png" } alt="" style={{width: '5%',  borderRadius: '80%'}} ></img>
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
        cartel = <h4>No hay resultados para la búsqueda realizada.</h4>

        tabla = <></>;
    }


    let searchtools =
        <ul className={"container-column-list"}>
            <li className={"items-row"}>
                <label  className={"form-label"}>Buscar estudiante</label>
            </li>
            <li className={"items-row"}>
                <input type="text" name="searchName" onChange={this.handleChangeSearch} />
            </li>
            <li className={"items-row"}>
                <img src="../../search.png" alt=""/>
            </li>
            <li className={"items-row"}>
                <label className={"form-label"}>Escoja cómo buscar</label>
            </li>
            <li className={"items-row"}>
                <select name="searchType" id="searchType" onChange={this.handleChangeSearchType}>
                    <option value="nombre">Nombre</option>
                    <option value="email">Email</option>
                </select>

            </li>
        </ul>;


        if(this.state.currentUserRole == "A")
        {
            searchtools =
            <ul className={"container-column-list"}>
                    <li className={"items-row"}>
                         <label  className={"form-label"}>Buscar estudiante</label>
                    </li>
                    <li className={"items-row"}>
                         <input type="text" name="searchName" onChange={this.handleChangeSearch} />
                    </li>
                     <li className={"items-row"}>
                    <img src="../../search.png" alt=""/>
                    </li>
                    <li className={"items-row"}>
                        <label className={"form-label"}>Escoja cómo buscar</label>
                    </li>
                    <li className={"items-row"}>
                         <select name="searchType" id="searchType" onChange={this.handleChangeSearchType}>
                                <option value="nombre">Nombre</option>
                                <option value="email">Email</option>
                         </select>
                    </li>
                    <li className={"items-row"}>
                         <label  className={"form-label"}>Buscar por rol</label>
                    </li>
                    <li className={"items-row"}>
                       <select name="searchRole" id="searchRole" onChange={this.handleChangeSearchRole}>
                            <option value="none">Buscar por rol...</option>
                            <option value="S">Estudiantes</option>
                            <option value="T">Profesores</option>
                            <option value="A">Administradores</option>
                        </select>
                    </li>
             </ul>
        }

        return (
            <div className="container">
                <Card className="card-long">
                    <Card.Body>
                        <div className={"row-edit"}>
                            <div className={"section-title"}>
                                <h2>Lista de solicitantes</h2>
                            </div>
                            <br/>
                            <Alert variant={"info"}>
                                <img src="/info.png" alt=""/>
                                Desde este espacio puede ver las solicitudes para acceder a la plataforma Creactiva.
                            </Alert>
                        </div>
                        <div className={"row-edit"}>
                            {searchtools}
                            <br/>
                            <div className={"form-select"}>
                                <h6> Resultados de buscar solicitantes con {this.state.searchType} similar a {this.state.searchName}:</h6>
                            </div>
                        </div>
                        <div className={"row-edit"}>
                            <br/>
                            {cartel}
                            {tabla}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

export default SearchStudentRes;