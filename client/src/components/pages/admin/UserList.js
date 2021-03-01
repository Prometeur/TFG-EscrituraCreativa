/*
*  Name_file :UserList.js
*  Description: Contiene una lista de resultado de la búsqueda de los usuarios.
*    
*/
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

//const baseUrl = "http://localhost:3001/teacher/getGroups";
const baseUrl = "http://localhost:3001/admin/searchStudent";

const cookies = new Cookies();

class UserList extends Component {

    state = {
        data: [],
        filteredData:[],
        searchName: '',
        searchType: 'nombre',
        searchRole:"none"

    }

    /*Se hacen peticiones al servidor para que me devuelva todos los estudiantes buscados*/
    peticionPost = () => {
        axios.post(baseUrl, { clave: this.state.searchName, tipo: this.state.searchType  }).then(response => {
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

    /*Elimina los datos de sesion almacenada por las cookies*/
    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('correo', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('apellidos', { path: "/" });
        cookies.remove('foto', { path: "/" });
        cookies.remove('activo', { path: "/" });
        cookies.remove('rol', { path: "/" });
        window.location.href = './';
    }

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
   componentDidMount() {
    this.peticionPost();
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
    }

    changeViewUserProfile = (idUser) => 
    {
        cookies.set('idRequestedUser', idUser, { path: "/", sameSite: 'lax' });
        window.location.href = './ProfileA';
    }

    goHome = () => 
     {
         window.location.href = './homeAdmin';
     }

    /*Dibuja la pagina  */
    render() {
        let cartel =<div> </div>;
        let tabla = <table>
        <thead>
            <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>email</th>

            </tr>
        </thead>

        <tbody>
            {this.state.filteredData.map(user => {
                return (
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.nombre}</td>
                        <td>{user.apellidos}</td>
                        <td>{user.correo}</td>
                        <td><button text='Ver Perfil' onClick={() => this.changeViewUserProfile(user.id)}>Ver perfil</button></td>
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
                <h1>Usuarios:</h1>
                <nav>
                    <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                </nav>
                <nav>
                    <button onClick={() => this.goHome()}>Volver a Home</button>
                </nav>
                <div>
                <h2> Resultados de buscar usuarios con {cookies.get('searchType')} similar a: {cookies.get('searchStudent')}</h2>
                <h1></h1>
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
            </>
        );
    }


}

export default UserList;