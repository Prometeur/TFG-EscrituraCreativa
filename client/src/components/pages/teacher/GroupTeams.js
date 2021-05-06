/*
*  Name_file :GroupTeams.js
*  Description: Contiene una lista de equipos de un grupo. Vive dentro de Group.js
*    
*/
import React, { Component } from 'react';
import { Link} from "react-router-dom";
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import '../../../styles/Challenge.css';
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
        let cartel =<> </>;
        let tabla = <ul className={"flex-items-row-start wrap"}>
            {this.state.filteredData.map((team) => 
                (
                    <li className={"items-row"}>
                        <br/>
                        <div className={"form-items-row"}>
                            <h5>{team.nombre}</h5>
                        </div>
                        <div className={"form-items-row"}>
                            <Link key={team.id} to={`/teacher/viewTeam/${team.id}`}>
                                <Button  variant={"outline-secondary"} text='Ver Equipo'>Ver equipo</Button>
                            </Link>
                        </div>
                        <hr></hr>
                    </li>

                )
            )}
    </ul>;
        if(this.state.filteredData.length === 0)
        {
            cartel = <div className={"group-teams"}>
                        <h2>No hay resultados para la búsqueda realizada.</h2>
                    </div>;
            tabla = <></>;
        }


        return (
                <Card className="card-long">
                    <Card.Body>
                        <div className={"group-teams"}>
                            <label className={"form-label"}>Buscar equipo</label>
                            <input type="text" name="searchKey" onChange={this.handleChangeSearch} />
                            <div className={"form-select"}><img src={"../search.png"}></img></div>
                                {cartel}
                                {tabla}
                        </div>
                    </Card.Body>
                </Card>
        );
    }


}

export default GroupTeams;