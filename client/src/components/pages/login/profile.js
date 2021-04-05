import React, { Component } from "react";
import { Redirect, Link }from "react-router-dom";
import AuthService from "../../../services/authenticity/auth-service";
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import ListGroup from "../user/StudentLits";


export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            role:'',
            redirect: null,
            userReady: false,
            currentUser: [],
        };
    }


    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser)
            this.setState({ redirect: "/home" });

        this.setState({ currentUser: currentUser, userReady: true });
        if(currentUser.rol==='S'){
            this.setState({role:"Estudiante"});
        }
        else if (currentUser.rol==='T'){
            this.setState({role:"Profesor"});
        }
        else{
            this.setState({role:"Administrador"});
        }
        console.log(currentUser);
    }

    render() {


        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { currentUser,role} = this.state;

        console.log(this.state);

        let foto = <Figure>
                        <Figure.Image
                            bsPrefix="figure"
                            alt="171x180"
                            src="fotoperfil.jpg"
                        />
                        <h5>
                            {currentUser.username}
                        </h5>
                        <h6>
                            {role}
                        </h6>
                </Figure>;

        if(this.state.currentUser.foto != undefined)
        {
            if(this.state.currentUser.foto.data.length != 0)
            {
            let fotoSource = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, this.state.currentUser.foto.data));
            foto = <Figure>
                        <Figure.Image
                            bsPrefix="figure"
                            alt="171x180"
                            src={fotoSource}
                        />
                        <h5>
                            {currentUser.username}
                        </h5>
                        <h6>
                            {role}
                        </h6>
                </Figure>;
            }
        }

        return (
            <>
                <div className="perfil-left">
                    {foto}
                    <ul className="flex-container wrap">
                        <li className="item-button-icon">
                            <img src="gear.png" alt=""/>
                        </li>
                        <li className="item-button-icon">
                            <Link to={"/editProfile"}>
                                <Button size="sm" bsPrefix="btn" variant="outline-secondary">Editar</Button>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="container">
                    <Card className="card-profile">
                        <Card.Body>
                            <div className="row-edit">
                                <div className="label-icon">
                                    <img src="user.png" />
                                </div>
                                <div className="label-icon">
                                    <h5>Información personal</h5>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <ul className="flex-container wrap">
                                    <li className="flex-item">
                                        <p className="p-general">
                                            Nombre: {currentUser.username} {currentUser.surname}
                                        </p>
                                    </li>
                                    <li className="flex-item">
                                       <p className="p-general">Tipo de rol: {role}</p>
                                    </li>
                                    <li className="flex-item">
                                       <p className="p-general">Correo: {currentUser.email}</p>
                                    </li>
                                    { currentUser.activo ? (
                                        <li className="flex-item">
                                            <p className="p-general">Estado <img className="status" src="circuloVerde.png" /></p>
                                        </li>
                                        ):(
                                            <li className="flex-item">
                                                <p className="p-general">Estado <img className="status" src="circuloRojo.png" /></p>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </>
        );
    }
}
