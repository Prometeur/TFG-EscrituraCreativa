/*
*  Name_file :GroupList.js
*  Description: Pagina que lista todos los grupos  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import { Link} from "react-router-dom";
import adminService from '../../../services/admin/adminService';
import teacherService from '../../../services/teacher/teacherService';
import authHeader from '../../../services/authenticity/auth-header.js';
import AuthUser from '../../../services/authenticity/auth-service.js';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import '../../../styles/Challenge.css';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


class GroupList extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: [],
            filteredData: [],
            searchKey: '',
            searchType: 'nombre',

        };
    }


    /*Se hacen peticiones al servidor para que me devuelva todos los grupos del profesor*/
    peticionGet = () => {
        adminService.getAllGroups().then(response => {
            this.setState({ data: response });
            this.filterData();
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {      
        const dataUser = AuthUser.getCurrentUser();
        this.setState({
            currentUserId: dataUser.id
        });
        this.setState({
            currentUserRole: dataUser.rol
        });
        this.peticionGet();
    }

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChangeSearch = async e => {
        await this.setState({
                [e.target.name]: e.target.value
        });
        this.filterData();
    }

    //Filtra los datos de los escritos buscados para solo buscar en la base de datos una vez
    filterData = () =>{
        let auxArray = [];
        this.state.filteredData = [];
        for(let i = 0; i < this.state.data.length; i++){
                if((new RegExp(this.state.searchKey, 'i' ).test(this.state.data[i].nombre)) )
                {
                    auxArray.push(this.state.data[i]);
                }
        }
        this.setState({ filteredData: auxArray });
    }

    
    /*Dibuja la pagina  */
    render() {

        let cartel =<></>;
        let tabla = <ListGroup variant="flush">

            {this.state.filteredData.map((group) => 
                (
                    <React.Fragment>
                    <ListGroup.Item>
                        {group.nombre}
                        <Link key={group.id} to={`/admin/viewGroup/${group.id}`}><button text='Ver Grupo'> Ver grupo </button></Link>
                    </ListGroup.Item>
                    </React.Fragment>
                )
            )}
        </ListGroup>;
        if(this.state.currentUserRole ==="T")
        {
            tabla = <ListGroup variant="flush">

                        {this.state.filteredData.map((group) => 
                            (
                                <React.Fragment>
                                <ListGroup.Item>
                                    {group.nombre}
                                    <Link key={group.id} to={`/teacher/viewGroup/${group.id}`}><button text='Ver Grupo'> Ver grupo </button></Link>
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

        return (

            <div className="container">
                <Card className="card-long">
                    <Card.Body>
                        <div className={"row-edit"}>
                            <div className={"section-title"}>
                                <h2>Gestionar grupos</h2>
                            </div>
                        </div>
                        <div className={"row-edit"}>
                            <ul className={"container-column-list"}>
                                <li className={"items-row"}>
                                    <label className={"form-label"}>Buscar grupo </label>
                                </li>
                                <li className={"items-row"}>
                                    <input type="text" name="searchKey" onChange={this.handleChangeSearch} />
                                </li>
                                <li className={"items-row"}>
                                    <img src="../../search.png" alt=""/>
                                </li>
                            </ul>
                        </div>
                        <div className={"row-edit"}>
                                {cartel}
                                {tabla}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

export default GroupList;