import React, { Component } from "react";
import { Redirect, Link }from "react-router-dom";
import AuthService from "../../../services/authenticity/auth-service";
import '../../../styles/styleGeneral.css';
import '../../../styles/styleCard.css';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';


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

        if (!currentUser )
            this.setState({ redirect: "/home" });

        this.setState({ currentUser: currentUser, userReady: true });
        if(currentUser.rol==='S'){
            this.setState({role:"Estudiante"});
        }
        else if (currentUser.rol==='T'){
            this.setState({role:"Profesor/a"});
        }
        else{
            this.setState({role:"Administrador/a"});
        }
        console.log(currentUser);
    }

    render() {


        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { currentUser,role} = this.state;

        let foto = <Figure>
                        <Figure.Image
                            bsPrefix="figure"
                            alt="171x180"
                            src="/chicaliteratura_sizebig.png"
                        />
                </Figure>;

        console.log(this.state.currentUser.foto);
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
                </Figure>;
            }
        }

        return (
            <>
            <div className="perfil-left">

                <ul className="container-column-list">
                    <li className="item-column-list wrap">
                        {foto}
                    </li>
                    <li className="item-column-list wrap">
                        <h6>
                            {currentUser.username}
                        </h6>
                    </li>
                    <li className="item-column-list wrap">
                        <h6>{role}</h6>
                    </li>
                    <li className="item-column-list">
                        <img src="setting.png" alt=""/>
                        <Link to={"/editProfile"}>
                            <Button size="sm"  variant="outline-light">Editar</Button>
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
                                            Nombre completo: {currentUser.username} {currentUser.surname}
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
