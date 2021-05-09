import React, { Component } from 'react';
import Card from "react-bootstrap/Card";

const NoMatch = () =>{
    return(
        <div className="container">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Card className="card-long">
             <Card.Body>
                 <h2>404</h2>
                 <h3>Vaya, parece que no hemos podido encontrar la página que buscabas...</h3>
             </Card.Body>
        </Card>
      </div>
    )
}

export default NoMatch;