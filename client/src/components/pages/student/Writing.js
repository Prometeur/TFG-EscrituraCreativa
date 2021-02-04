/*
*  Name_file :Writing.js
*  Description: Pagina del Escrito, contiene la vista del escrito para un desafio seleccionado por el estudiante
*    
*/
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Image } from 'cloudinary-react';

const baseUrl = "http://localhost:3001/student/postWriting";
const baseUrl2 = "http://localhost:3001/student/getChallenge";
const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

class Writing extends Component {

    state = {
        data: [],
        form: {
            nombre: '',
            escrito: '',
        }
    }

    /*Se hacen peticiones al servidor para que me devuelva el desafio seleccionado por el estudiante*/
    peticionGet = () => {
        axios.get(baseUrl2, { params: { idChallenge: cookies.get('challengeSelect') } }).then(response => {
            console.log(response.data);//muestra consola navegador
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }


    /*Se envia al servidor el escrito del estudiante*/
    sendWriting = () => {
        window.location.href = './groupStudent';
        axios.post(baseUrl, { idChallenge: cookies.get('challengeSelect'), idEscritor: cookies.get('id'), escrito: this.state.form.escrito })
            .then(response => {

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
        this.peticionGet();
        if (!cookies.get('correo')) {
            window.location.href = "./";
        }
    }

    /*Dibuja la pagina */
    render() {

        // let media=<div><p><strong>hola como estas?</strong></p> <p><em>bien</em></p></div>;
        return (
            <>
                <div className="writing-container">
                    <nav>
                        <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                    </nav>

                    <div className= "writing-content">
                        <div className="challenge-card">
                            {this.state.data.map(challenge => {
                                return (
                                    <div>
                                        <h3>{challenge.titulo} </h3>
                                       
                                        <div className="content" dangerouslySetInnerHTML={{ __html: challenge.descripcion }}>
                                        </div>

                                        <Image
                                            style={{ width: 50 }}
                                            cloudName="dqkthcbf8"
                                            publicId={challenge.imagen}

                                        />
                                     
                                    </div>
                                )
                            })}
                        </div>

                        <div>
                            <textarea name="escrito" rows="4" cols="50" onChange={this.handleChange}></textarea>
                            <br />
                            <br />
                            <button text='enviar' onClick={() => this.sendWriting()}> enviar  </button>
                            <button onClick={() => window.location.href = '/student/group'}>Cancelar</button>

                        </div>

                    </div>

                </div>



            </>
        );
    }
}


export default Writing;