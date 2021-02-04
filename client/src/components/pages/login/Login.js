/*
*  Name_file :Login.js
*  Description: Pagina de inicio de sesion, contiene la vista del Login
*    
*/
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl = "http://localhost:3001/login/getUser";
const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class Login extends Component {
    state = {
        form: {
            username: '',
            password: ''
        }
    }

    /*Metodo de ciclo de vida, se ejecuta despues del primer render si vuelvo a la pagina de login, 
    comprueba si el usuario ya inicio sesion anteriomente, si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        if (cookies.get('correo')) {
            switch (cookies.get('rol')) {
                case 'A':
                    window.location.href = "./homeAdmin";
                    break;
                case 'T':
                    window.location.href = "./homeTeacher";
                    break;
                case 'S':
                    window.location.href = "./student/home";
                    break;
                default:
                    console.log('rol inexistente')
            }
        }
    }


    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        //console.log(this.state.form);//visualizar consola navegador lo que escribimos en el input
    }

    /*Se hacen peticiones al servidor con un nombre y password, si existe el usuario me devuelve el objeto usuario*/
    iniciarSesion = async () => {
        await Axios.get(baseUrl, { params: { nombre: this.state.form.username, password: this.state.form.password } })//peticion http al servidor para iniciar sesion
            .then(response => {
                //console.log(response.data);//muestra el objeto devuelto por el servidor en caso que exista en la consola(navegador)
                return response.data;  //respuesta del servidor, me devuelve el objeto en caso que exista
            })
            .then(response => {
                if (response.length > 0) {//si ha encontrado a un usuario, >0
                    var respuesta = response[0];//donde se guarda el objeto
                    if (respuesta.nombre === this.state.form.username && respuesta.password === this.state.form.password) {
                        cookies.set('id', respuesta.id, { path: "/" });//para que sea accesible en cualquier pagina ponemos /
                        cookies.set('correo', respuesta.correo, { path: "/" });
                        cookies.set('nombre', respuesta.nombre, { path: "/" });
                        cookies.set('apellidos', respuesta.apellidos, { path: "/" });
                        cookies.set('foto', respuesta.foto, { path: "/" });
                        cookies.set('activo', respuesta.activo, { path: "/" });
                        cookies.set('rol', respuesta.rol, { path: "/" });
                        alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellidos}`);
                        switch (respuesta.rol) {
                            case 'A':
                                window.location.href = "./homeAdmin";
                                break;
                            case 'T':
                                window.location.href = "/teacher/home";
                                break;
                            case 'S':
                                window.location.href = "./student/home";
                                break;
                            default:
                                console.log('rol inexistente')
                        }
                    }
                    else {
                        alert('password incorrecto');
                    }
                } else {
                    alert('El usuario o el password no son correctos');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    
    /*Dibuja la pagina del Login */
    render() {
        return (
            <div className='container'>
                <h1>Login</h1>
                <label>Usuario: </label>
                <br />
                <input type="text" name="username" onChange={this.handleChange} />
                <br />
                <label>Password: </label>
                <br />
                <input type="text" name="password" onChange={this.handleChange} />
                <br />
                <button text='Log In' onClick={() => this.iniciarSesion()}>Log in  </button>

            </div>
        );
    }
}

export default Login;