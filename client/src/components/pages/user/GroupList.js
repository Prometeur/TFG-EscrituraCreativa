/*
*  Name_file :GroupList.js
*  Description: Pagina del grupo seleccionado por profesor, contiene la vista de los desafios  
*  que tiene el grupo seleccionado por el profesor  
*/
import React, { Component } from 'react';
import { Link} from "react-router-dom";
import Cookies from 'universal-cookie';
import adminService from '../../../services/admin/adminService';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';



const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class GroupList extends Component {

    state = {
        data: [],
        filteredData: [],
        searchKey: '',
        searchType: 'nombre'

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

        let cartel =<div> </div>;
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
        if(this.state.filteredData.length === 0)
        {
            cartel = <nav>
                        <h2>No hay resultados para la búsqueda realizada.</h2>
                    </nav>;
            tabla = <div></div>;
        }

        return (

            <div className="container">
             <Card className="card-edit">
                    <Card.Body>
                    
            <h1>Grupos:</h1>
            
            
            <div>
                <label>Buscar grupo: </label>
                <br />
                <input type="text" name="searchKey" onChange={this.handleChangeSearch} />
            </div>


                 <div>

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