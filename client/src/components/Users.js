import React, { Component } from "react";
import UserDataService from "../services/user.services";

export default class Users extends Component {


    constructor(props) {
        super(props);
        //console.log(props)
    
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.onChangeCorreo = this.onChangeCorreo.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.insertUser = this.insertUser.bind(this);
        this.getUSers = this.getUSers.bind(this);

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
        /*fetch('/users')
          .then(res => res.json())
          .then( usuarios => self.setState({usuarios:usuarios}));*/
        self.getUSers();
    }

    onChangeName(e) {
        const nombre = e.target.value;

        this.setState(function(prevState) {
          return {
            user:{
              ...prevState.user,
                nombre: nombre
            }
          };
        });
      }

    onChangeCorreo(e) {
        const correo = e.target.value;
    
        this.setState(function(prevState) {
          return {
             user :{
                 ...prevState.user,
                 correo : correo
             }
          };
        });
      }
    

    getUSers() {
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

    insertUser(){
        UserDataService.insert(JSON.stringify(this.state.user))
         .then( response => {
            this.setState(function(prevState) {
              return {
                 usuarios : [
                     ...prevState.usuarios,
                     this.state.user,
                ]
              };
            });
         })
         .catch(e => {
             console.log(e);
         })

    }

    updateUser() {
        var data ={
            name: this.state.user.nombre,
            correo: this.state.user.correo
        };

        UserDataService.update(data)
            .then(response => {
              console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteUser() {

        UserDataService.delete(this.state.correo)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/users')
            })
            .catch(e => {
                console.log(e);
            });

    }

   
    render() {
        return(

            <div className="App">
                <h1>CRUD APP</h1>
        
                <div className="form">
                    <label> Nombre:</label>
                    <input 
                        type="text" 
                        name = "name"
                        value = {this.state.nombre}
                        onChange= {this.onChangeName}
                    />
                    <label>Correo:</label>
                    <input
                        type="text" 
                        name = "correo"
                        value ={this.state.correo} 
                        onChange={this.onChangeCorreo}
                    />
                
                     <button onClick={()=> this.insertUser()}>Submit</button>
                                  
                    {this.state.usuarios.map( usuarios => 
            
                        <div className="card">
                            <h1>{usuarios.nombre} </h1>
                            <p> {usuarios.correo}</p>
                            <button onClick={() => {this.deleteUser(usuarios.nombre)}}>Delete</button>
                            
                            <input type="text" id="updateInput" onChange={(e)=>{
                                this.setState.user.correo(e.target.value)
                            }}/>
                            
                            <button onClick={()=>this.updateUser()}> Update </button>
                        </div>
                     )}
            </div>
          </div>
        );

    }
    

}