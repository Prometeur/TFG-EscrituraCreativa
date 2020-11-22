
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
//const baseUrl = "http://localhost:3001/teacher/postChallenge";
const baseUrl = "http://localhost:3001/teacher/createChallenge";

const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class Challenge extends Component {

    state = {
        data: [],
        form: {
            titulo: '',
            descripcion: ''
        }
    }

    /*Se envia al servidor el desafio del profesor*/
    sendChallenge = () => {
        window.location.href = './groupTeacher';
        axios.post(baseUrl, { title: this.state.form.titulo,description: this.state.form.descripcion,idGroup: cookies.get('groupSelect')}).then(response => {

        }).catch(error => {
            console.log(error.message);
        })
    }

    /*Lo que escribamos en el input lo guarda en el state async para que lo veamos en tiempo real */
    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);//visualizar consola navegador lo que escribimos en el input
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
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
    }

    /*Dibuja la pagina */
    render() {
        return (
            <>
                <h2> Crear Desafio</h2>
                <nav>
                    <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                </nav>
                <div>
                    <div>
                    <label>Titulo: </label>
                    <br />
                    <input type="text" name="titulo" onChange={this.handleChange} />
                    <br />
                    <label>Descripcion: </label>
                    <br />
                    <textarea name="descripcion" rows="4" cols="50" onChange={this.handleChange}   ></textarea>
                    <br />
                    <button text='enviar' onClick={() => this.sendChallenge()}> enviar  </button>
                    </div>

                </div>
            </>
        );
    }

}

export default Challenge;