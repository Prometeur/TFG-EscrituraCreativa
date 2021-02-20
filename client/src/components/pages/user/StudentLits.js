/*
*  Name_file :SearchStudentRes.js
*  Description: Contiene una lista de resultado de la búsqueda de los estudiantes.
*    
*/
import React, { Component } from 'react';
import TeacherService from '../../../services/teacher/teacherService.js';

class SearchStudentRes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            filteredData:[],
            searchStudent: '',
            searchType: 'nombre'
    
        };
    }
 

    /*Se hacen peticiones al servidor para que me devuelva todos los estudiantes buscados*/
    peticionPost() {
       TeacherService.searchStudent(this.state.searchStudent, this.state.searchType).then(response =>{
            this.setState({data:response});
            this.setState({filterData:response});
            console.log(this.state.data);
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
    

    componentDidMount() {
        
        this.peticionPost();
            
    }

    changeViewStudentProfile = (idApplicant) => 
    {
        
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
                        <td><button text='Ver Perfil' onClick={() => this.changeViewStudentProfile(student.id)}>Ver perfil</button></td>
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
                <h1>Estudiantes:</h1>

                <div>
                <h2> Resultados de buscar estudiantes con  similar a:</h2>
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

export default SearchStudentRes;