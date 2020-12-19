/*
*  Name_file :HomeTeacher.js
*  Description: Página home del profesor, contiene la vista del profesor
*    
*/
import React, { Component } from 'react';
import UserService from "../../../services/user/UserService"

class TeacherBoard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            data: "",
        }; 
    }


    componentDidMount() {
        UserService.getTeacherBoard().then(
            response => {
                this.setState(
                    {
                       data: response.data
                    } );
            });
    }

    /*Dibuja la pagina */
    render() {
        return (
           <div>
                hello I am teacher.
           </div> 
        );
    }

}

export default TeacherBoard;