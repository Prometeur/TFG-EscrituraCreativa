/*
*  Name_file :ProfileAGroups.js
*  Description: Muestra los grupos del profesor escogido 
*/
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';



const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class ProfileAGroups extends Component {

    state = {
        data: [],
        filteredData: [],
        searchKey: '',
        searchType: 'nombre'

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

    /*Se hacen peticiones al servidor para que me devuelva todos los grupos del profesor*/
    peticionGet = () => {
        axios.get("http://localhost:3001/admin/getGroupsOfTeacher", { params: { idEstudiante: cookies.get('idRequestedUser') } }).then(response => {
            this.setState({ data: response.data });
            this.filterData();
        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
   si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        this.peticionGet();
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
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

    //cambia a la ventana de grupos
    changeView = (idGroup) => 
    {
        cookies.set('groupSelect', idGroup, { path: "/" });
        window.location.href = './groupA';
    }

    /*Dibuja la pagina  */
    render() {

        return (
            <>
            <div>
                <label>Buscar grupo: </label>
                <br />
                <input type="text" name="searchKey" onChange={this.handleChangeSearch} />
            </div>
                <div>

                <table>
                    <thead>
                        <tr>
                            <th>idGrupo</th>
                            <th>idProfesor</th>
                            <th>nombre</th>
                            <th>activo</th>

                        </tr>
                    </thead>

                    <tbody>
                        {this.state.filteredData.map(grupo => {
                            return (
                                <tr>
                                    <td>{grupo.id}</td>
                                    <td>{grupo.idprofesor}</td>
                                    <td>{grupo.nombre}</td>
                                    <td>{grupo.activo}</td>
                                    <td> <button onClick={() => this.changeView(grupo.id)}>ir grupo</button></td>
                                </tr>

                            )
                        })}

                    </tbody>

                </table>

            </div>
            </>
        );
    }

}

export default ProfileAGroups;