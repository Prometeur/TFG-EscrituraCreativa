/*
*  Name_file :GroupTeams.js
*  Description: Contiene una lista de equipos de un grupo. Vive dentro de Group.js
*    
*/
import React, { Component } from 'react';
import { Link} from "react-router-dom";
import TeacherService from '../../../services/teacher/teacherService.js';
import AdminService from '../../../services/admin/adminService.js';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import teacherService from '../../../services/teacher/teacherService.js';

class GroupTeams extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            filteredData: [],
            searchKey: '',
    
        };
    }

    //Filtra los datos de los estudiantes buscados para solo buscar en la base de datos una vez
    filterData = () =>{
        let auxArray = [];
        //this.state.filteredData = [];
        for(let i = 0; i < this.state.data.length; i++){
            
                if(new RegExp( this.state.searchKey, 'i'  ).test(this.state.data[i].nombre))
                {
                    auxArray.push(this.state.data[i]);
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

    

    componentDidMount() {

        teacherService.getTeamsOfGroup(this.props.groupSelect).then(response =>{
            this.setState({data:response});
            this.setState({filteredData:response});
            this.filterData();
        })

    }


    /*Dibuja la pagina  */
    render() {
        let cartel =<div> </div>;
        let tabla = <ListGroup variant="flush">

            {this.state.filteredData.map((team) => 
                (
                    <React.Fragment>
                    <ListGroup.Item>
                        {team.nombre}
                        <Link key={team.id} to={`/teacher/viewTeam/${team.id}`}><button text='Ver Equipo'> Ver equipo </button></Link>
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
                    <h1>Equipos:</h1>

                    <div>
                    <h2> Resultados de buscar equipos con nombre similar a:</h2>
                            <label>Buscar equipo: </label>
                            <br />
                            <input type="text" name="searchKey" onChange={this.handleChangeSearch} />
                            <br />
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

export default GroupTeams;