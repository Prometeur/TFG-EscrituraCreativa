import React, { Component } from "react";
import UserDataService from "../services/servicioUsuario";

export default class Users extends Component {


    constructor(props) {
        super(props);
    
        this.getGrupo = this.getGrupo.bind(this);

        this.state ={
            user:{
                nombre:"",
                correo:""
            },
           usuarios:[]
        };

    }

    
    componentDidMount() {
        let self = this;
        self.getGrupo();
    }

    getGrupo() {
        console.log(this.state.usuarios);
          UserDataService.getAll()
            .then(response => {
              this.setState({
                usuarios: response.data
              });
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }

        render() {
            return(
    
                <div className="App">
                    <h1>Mostrando usuarios:</h1>
            
                    <div className="form">
                                      
                        {this.state.usuarios.map( usuarios => 
                
                            <div className="card">
                                <h1>{usuarios.nombre} </h1>
                                <p> {usuarios.correo}</p>
                            </div>
                         )}
                </div>
              </div>
            );
    
        }
        
    
    }