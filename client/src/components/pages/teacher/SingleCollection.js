import React, { Component } from 'react';
import TeacherService from '../../../services/teacher/teacherService.js';


/**Estilos bibliotecas externas*/
import  Card from 'react-bootstrap/Card';
import Table from "react-bootstrap/Table";

/**Estilos css*/
import 'react-tabs/style/react-tabs.css';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';


class SingleCollection extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            challenge: '',
        }
    }

    /*Se hacen peticiones al servidor para que me devuelva los datos del estudiante*/
    componentDidMount() {
        TeacherService.getCollection(this.props.match.params.idCollection).then(response => {
            this.setState({data:response});
      }).catch(error => {
          console.log(error.message);
      })
    }

    /*Dibuja la pagina  */
    render() {
        
        let formatedDate;
        let { data, challenge } = this.state;
        return (
            <div class="container">
                <Card className="card-long">
                    <Card.Body>
                        {
                            <>
                            <div className={"row-edit"}>
                                <label className={"form-label"} htmlFor="">Colección seleccionada</label>
                            </div>
                            <hr />
                            <ul className={"flex-row"}>
                                <li className={"flex-item-form"}>
                                    <label className='form-label'>Se muestran todos los desafíos pertenecientes a la colección del profesor</label>
                                </li>
                            </ul>
                            <div className="row-edit">
                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th> Desafío</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        (
                                            data.map((collection) => (
                                                < tr key={collection.idCollection}>
                                                    <td>{collection.nombreDesafio}</td>
                                                </tr>
                                            ))
                                        )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            </>
                        }

                    </Card.Body>
                </Card>
            </div>
        );
    }

}

export default SingleCollection;