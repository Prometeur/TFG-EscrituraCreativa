/*
*  Name_file :Home.js
*  Description: Pagina inicial sin login, contiene la vista de un usuario no registrado
*    
*/


import React, { Component } from 'react';

class Home extends Component {

    iniciarSesion = () => 
    {
        window.location.href = './login';
    }
    
    /*Dibuja la pagina */
    render() 
    {
        return (
            <>
                <h3> Soy la Home sin Login</h3>
                <div >
                    <button onClick={() => this.iniciarSesion()}>Iniciar Sesión</button>

                </div>

            </>
        );
    }
}

export default Home;