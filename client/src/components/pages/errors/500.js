import React, { Component } from 'react';
import Card from "react-bootstrap/Card";

const InternalError = () =>{
    return(
        <div className="container">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Card className="card-long">
             <Card.Body>
                 <h2>500</h2>
                 <h3>Se ha dado un error interno del servidor. ¡Lo sentimos!</h3>
             </Card.Body>
        </Card>
      </div>
    )
}

export default InternalError;