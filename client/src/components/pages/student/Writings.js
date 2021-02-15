import React, { Component } from 'react';
import StudentService from '../../../services/student/student-service.js';


class Writings extends Component {
   
   constructor(props){
       super(props);

       this.state = {
            data: [],
      }

   }


    /*Si vuelvo a la pagina de login, comprueba si el usuario ya inicio sesion anteriomente
    si es el caso lo redirige a la home segun su rol*/
    componentDidMount() {

        this.peticionGet();

    }

   
    /*Se hacen peticiones al servidor para que me devuelva la tabla de escritos del estudiante,
     me muestra todos los escritos del grupo seleccioando por el estudiante*/
    peticionGet() {
        
        StudentService.getWritings(this.props.idUser, this.props.groupSelect)
        .then( response =>
        {
            this.setState({data:response});
        })
    
    }

    /*Dibuja la pagina  */
    render() {

        let {data} = this.state;
        return (
            <>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Desafío</th>
                                <th>Escritor</th>
                                <th>Escrito</th>
                                <th>Puntuación</th>
                                <th>Fecha Creación</th>
                                <th>Activo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((writing) => (
                                    <tr>
                                        <td>{writing.idDesafio}</td>
                                        <td>{writing.idEscritor}</td>
                                        <td>{writing.nombre}</td>
                                        <td>{writing.puntuacion}</td>
                                        <td>{writing.fecha}</td>
                                        <td>{writing.activo}</td>
                                        <td>
                                            <button>Ver</button>
                                            <button>Editar</button>
                                            <button>Eliminar</button>
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>

                    <button>Cancelar</button>

                </div>
            </>
        );
    }

}

export default Writings;