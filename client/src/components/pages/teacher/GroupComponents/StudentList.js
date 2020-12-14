/*
*  Name_file :StudentList.js
*  Description: Contiene una lista de estudiantes que pertenecen a un grupo.
*    
*/
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

const baseUrl = "http://localhost:3001/user/searchStudentOfGroup";

class StudentList extends Component {

    state = {
        data: [],
        filteredData:[],
        searchStudent: '',
        searchType: 'nombre'

    }

    /*Se hacen peticiones al servidor para que me devuelva todos los estudiantes buscados*/
    peticionPost = () => {
        axios.post(baseUrl, { grupo: cookies.get('groupSelect')  }).then(response => {
            this.setState({ data: response.data });
            this.setState({ filteredData: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //Filtra los datos de los estudiantes buscados para solo buscar en la base de datos una vez
    filterData = () =>{
        let auxArray = [];
        this.state.filteredData = [];
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

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
   componentDidMount() {
    this.peticionPost();
    }

    /*Dibuja la pagina  */
    render() {
        let cartel =<div> </div>;
        let tabla = <table>
        <thead>
            <tr>
                <th>idEstudiante</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>email</th>

            </tr>
        </thead>

        <tbody>
            {this.state.filteredData.map(student => {
                return (
                    <tr>
                        <td>{student.id}</td>
                        <td>{student.nombre}</td>
                        <td>{student.apellidos}</td>
                        <td>{student.correo}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>;
        if(this.state.filteredData.length === 0)
        {
            cartel = <nav>
                        <h2>No hay resultados para la búsqueda realizada.</h2>
                    </nav>;
            tabla = <div></div>;
        }


        return (
            <>
                <h1>Estudiantes del grupo:</h1>

                <div>
                <h2> Resultados de buscar estudiantes con {cookies.get('searchType')} similar a: {cookies.get('searchStudent')}</h2>
                <h1></h1>
                        <label>Buscar estudiante: </label>
                        <br />
                        <input type="text" name="searchStudent" onChange={this.handleChangeSearch} />
                        <br />
                        <label for="searchType">Escoja cómo buscar:</label>
                        <select name="searchType" id="searchType" onChange={this.handleChangeSearchType}>
                            <option value="nombre">Nombre</option>
                            <option value="email">Email</option>
                        </select> 
                </div>
                <div>
                
                    {cartel}
                

                    {tabla}


                </div>
            </>
        );
    }


}

export default StudentList;