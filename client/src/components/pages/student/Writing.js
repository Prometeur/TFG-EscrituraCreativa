/*
*  Name_file :Writing.js
*  Description: Pagina del Escrito, contiene la vista del escrito para un desafio seleccionado por el estudiante
*    
*/

import React, { Component } from 'react';
import StudentService from '../../../services/student/student-service.js';


class Writing extends Component {


    constructor(props){
         super(props);

         this.state = {
            data: [],
            form: {
                id: '',
                nombre: '',
                escrito: '',
            }
        }
    }
  
    /*Se hacen peticiones al servidor para que me devuelva el desafio seleccionado por el estudiante*/
    peticionGet = () => {
    
        StudentService.getWritings().then(response => {
            console.log(response.data);//muestra consola navegador
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }


    /*Se envia al servidor el escrito del estudiante*/
    sendWriting = () => {
        window.location.href = './groupStudent';
        
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


    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
    si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {
        
        this.peticionGet();
      
    }

    /*Dibuja la pagina */
    render() {
        return (
            <>
                <h2> Crear Writing</h2>
                <div>
                    <div>
                        {this.state.data.map(challenge => {
                            return (
                                <div>
                                    <h3>{challenge.titulo} </h3>
                                    <p> {challenge.descripcion}</p>
                                    {console.log(this.data)}
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <textarea name="escrito" rows="4" cols="50" onChange={this.handleChange}></textarea>
                        <br />
                        <br />
                        <button text='enviar' onClick={() => this.sendWriting()}> enviar  </button>
                    </div>

                </div>
            </>
        );
    }
}


export default Writing;