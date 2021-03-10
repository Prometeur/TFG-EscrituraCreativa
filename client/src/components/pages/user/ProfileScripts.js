/*
*  Name_file :ProfileScripts.js
*  Description: Componente que contiene la lista de escritos del estudiante
*/
import React, { Component } from 'react';
import TeacherService from "../../../services/teacher/teacherService.js";

class GroupTeacher extends Component {

     constructor(props) {
        super(props);

        this.state = {
            data: [],
            filteredData:[],
            searchKey: '',
            searchType: 'nombre'
    
        };

     }
    

    /*Se hacen peticiones al servidor para que me devuelva la tabla desafios, me muestra todos los desafios del grupo seleccioando 
    por el profesor*/
    peticionGet = () => {
        TeacherService.getScriptsByStudent(this.props.idStudent).then(response => {
            console.log(response);//muestra consola navegador
            this.setState({ data: response });
            console.log(response);
            this.setState({ filteredData: response });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //Filtra los datos de los escritos buscados para solo buscar en la base de datos una vez
    filterData = () =>{
        let auxArray = [];
        this.state.filteredData = [];
        for(let i = 0; i < this.state.data.length; i++){
            if(this.state.searchType == "titulo")
            {
                if(new RegExp( this.state.searchKey, 'i'  ).test(this.state.data[i].titulo))
                {
                    auxArray.push(this.state.data[i]);
                }
            }
            else
            {
                if((new RegExp(this.state.searchKey, 'i' ).test(this.state.data[i].nombre)) )
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
        this.peticionGet();
    }

    /*Dibuja la pagina  */
    render() {
        let cartel =<div> </div>;
        let tabla = <table>
        <thead>
            <tr>
                <th>idEscritor</th>
                <th>IdDesafio</th>
                <th>Nombre del escrito</th>
                <th>Título del desafío</th>

            </tr>
        </thead>

        <tbody>
            {this.state.filteredData.map(script => {
                return (
                    <tr>
                        <td>{script.idEscritor}</td>
                        <td>{script.idDesafio}</td>
                        <td>{script.nombre}</td>
                        <td>{script.titulo}</td>
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
                <h1>Escritos del estudiante:</h1>

                <div>
                <h2> Resultados de buscar escritos con  similar a:</h2>
                <h1></h1>
                        <label>Buscar estudiante: </label>
                        <br />
                        <input type="text" name="searchKey" onChange={this.handleChangeSearch} />
                        <br />
                        <label for="searchType">Escoja cómo buscar:</label>
                        <select name="searchType" id="searchType" onChange={this.handleChangeSearchType}>
                            <option value="nombre">Nombre</option>
                            <option value="titulo">Título</option>
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

export default GroupTeacher;