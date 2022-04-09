/*
*  Name_file :View Collection.js
*  Description: Contiene los datos de una colección segun un ID dado.
*    
*/

import React, { Component } from 'react';
import TeacherService from '../../../services/teacher/teacherService.js';

/**Estilos bibliotecas externas*/
import  Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

/**Estilos css*/
import 'react-tabs/style/react-tabs.css';
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';


class ViewCollection extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            nameCollection: "",
            nameGroup: "",
            idGroup: -1,
            allChallenges: [],
            selectedChallenge: false,
            idChallengeSelect: -1,
            dataChallenges: [],

        };
    }

    componentDidMount()
    {
        // Obtenemos una colección con sus desafíos
        TeacherService.getCollection(this.props.match.params.idCollection)
          .then(response => {
              if (response.length > 0)
              {
                this.setState({ nameCollection: response[0].nombreColeccion, nameGroup: response[0].nombreGrupo, idGroup: response[0].idGrupo, dataChallenges: response });

                // Obtenemos todos los desafíos de un grupo
                TeacherService.getChallenges(response[0].idGrupo)
                    .then(response => {
                        this.setState({ allChallenges: response});
                    })

              }
          })

    }

    addChallengeToCollection = (idChallenge) =>
    {
        TeacherService.addChallengeToCollection(this.props.match.params.idCollection, idChallenge)
        .catch(error => {
            console.log(error.message);
        })
    }

    handleChangeChallengeSelect = async e => {
        await this.setState({
                [e.target.name]: e.target.value
        });
        if (e.target.value != -1)
            this.setState({ selectedChallenge: true });
        else
            this.setState({ selectedChallenge: false });
    }

    /*Dibuja la pagina  */
    render() {
        return (
        <div className="container">
            <Card className="card-long">
            <Card.Body>
                <div className={"row-edit"}>
                    <div className={"section-title"}>
                        <h2>Colección "{this.state.nameCollection}"</h2>
                    </div>
                    <br/>
                    <Alert variant={"info"}>
                        <img src="/info.png" alt=""/>
                        Puede usar este espacio para ver los desafíos asociados a la colección, y añadir nuevos desafíos si así lo desea.
                    </Alert>
                </div>

                <div className={"row-edit"}>
                    <Card className={"card-long"}>
                    <Card.Body >
                        <ul className={"container-column-list wrap"}>
                            <li className={"flex-item-data"}>
                                <h5>Grupo: {this.state.nameGroup}</h5>
                            </li>
                            <li className={"items-row"}>
                                <h5>Desafíos:</h5>

                                {this.state.dataChallenges.map((challenge) => (
                                    // <li className={"items-row"}>
                                    <>
                                        <ul className={"flex-items-row-evenly"}>
                                            <li className={"flex-item-list"}>
                                                {challenge.titulo}
                                            </li>
                                            <li className={"flex-item-list"}>
                                                {challenge.colaborativo}
                                            </li>
                                        </ul>
                                    </>
                                ))}

                            </li>
                            <div className={"row-edit"}>
                                <ul className={"container-column-list wrap"}>
                                    <li className={"flex-item-profile"}>
                                        <label className={"form-label"} htmlFor="idChallengeSelect">Añadir un desafío</label>
                                    </li>
                                    <li className={"flex-item-profile"}>
                                        <select name="idChallengeSelect" id="idChallengeSelect" onChange={this.handleChangeChallengeSelect}>
                                            <option selected value= "-1" >Elija un desafío</option>
                                            {this.state.allChallenges.map(challenge => {
                                                return (
                                                    <option value={challenge.id}>{challenge.titulo}</option>
                                                )
                                            })}
                                        </select>
                                    </li>
                                    <li className={"flex-item-profile"}>
                                        {this.state.selectedChallenge == false ? (
                                            <Button size={"sm"} text='Anyadir desafio' disabled>
                                                Añadir
                                            </Button>
                                        ) : (
                                            <Button size={"sm"} text='Anyadir desafio' onClick={() => this.addChallengeToCollection(this.state.idChallengeSelect)}>
                                                Añadir
                                            </Button>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </ul>
                    </Card.Body>
                    </Card>
                </div>

            </Card.Body>
            </Card>
        </div>
        );
    }


}

export default ViewCollection;